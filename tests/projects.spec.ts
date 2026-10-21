import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";
import { qaDocs } from "../src/data/qa";

test.describe("projects", () => {
  test("every project is listed; documented ones link to their page, all link to their repo", async ({ page }) => {
    await page.goto("/projects");
    for (const p of projects) {
      const heading = page.getByRole("heading", { level: 3, name: p.title });
      await expect(heading).toBeVisible();
      if (qaDocs.some((d) => d.slug === p.slug)) {
        await expect(heading.getByRole("link")).toHaveAttribute("href", new RegExp(`/projects/${p.slug}$`));
      }
      if (p.repoUrl) {
        await expect(page.getByRole("link", { name: `Repo for ${p.title}`, exact: true })).toHaveAttribute("href", p.repoUrl);
      }
    }
  });

  test("home shows only featured projects", async ({ page }) => {
    await page.goto("/");
    const work = page.getByRole("region", { name: "Selected work" });
    await expect(work.getByRole("heading", { level: 3 })).toHaveText(
      projects.filter((p) => p.featured).map((p) => p.title),
    );
  });

  for (const doc of qaDocs) {
    test(`${doc.slug} page renders every section and test case`, async ({ page }) => {
      await page.goto(`/projects/${doc.slug}`);
      for (const section of ["Requirement analysis", "Test plan", "Test scenarios", "Test cases"]) {
        await expect(page.getByRole("heading", { level: 2, name: new RegExp(section) })).toBeVisible();
      }
      for (const tc of doc.cases) {
        await expect(page.getByRole("article", { name: tc.title })).toContainText(tc.expected);
      }
    });
  }
});

test.describe("project data", () => {
  test("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const p of projects) {
    test(`${p.slug} is complete`, () => {
      expect(p.title.trim()).not.toBe("");
      expect(p.summary.trim()).not.toBe("");
      expect(p.tools.length).toBeGreaterThan(0);
      if (p.repoUrl) expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/Samin-Zaman1\//);
    });
  }
});

// Requirement → scenario → test case: nothing dangling, nothing uncovered
test.describe("QA traceability", () => {
  for (const doc of qaDocs) {
    test(doc.slug, () => {
      expect(projects.find((p) => p.slug === doc.slug)?.repoUrl, "has a repo").toBeTruthy();

      const reqIds = doc.requirements.map((r) => r.id);
      const scenarioIds = doc.scenarios.map((s) => s.id);
      const covered = new Set(doc.scenarios.flatMap((s) => s.covers));

      for (const s of doc.scenarios) {
        for (const r of s.covers) expect(reqIds, `${s.id} covers unknown ${r}`).toContain(r);
      }
      for (const r of reqIds) expect(covered.has(r), `${r} has no scenario`).toBe(true);
      for (const tc of doc.cases) expect(scenarioIds, `${tc.id} has unknown scenario`).toContain(tc.scenario);
      for (const s of scenarioIds) {
        expect(doc.cases.some((tc) => tc.scenario === s), `${s} has no test case`).toBe(true);
      }

      const caseIds = doc.cases.map((tc) => tc.id);
      expect(new Set(caseIds).size, "unique case ids").toBe(caseIds.length);
    });
  }
});

test("unknown URL returns 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL("/");
});
