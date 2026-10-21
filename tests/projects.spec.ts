import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

test.describe("projects", () => {
  test("every project is listed, linking to its repo where it has one", async ({ page }) => {
    await page.goto("/projects");
    for (const p of projects) {
      const heading = page.getByRole("heading", { level: 3, name: p.title });
      await expect(heading).toBeVisible();
      if (p.repoUrl) {
        await expect(heading.getByRole("link")).toHaveAttribute("href", p.repoUrl);
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

test("unknown URL returns 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL("/");
});
