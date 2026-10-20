import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

test.describe("TC-02 project pages", () => {
  test("list shows every project", async ({ page }) => {
    await page.goto("/projects");
    for (const project of projects) {
      await expect(page.getByRole("link", { name: project.title })).toBeVisible();
    }
  });

  for (const project of projects) {
    test(`renders ${project.slug}`, async ({ page }) => {
      await page.goto(`/projects/${project.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
      for (const section of ["Scope", "Approach", "Tools", "Outcomes"]) {
        await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
      }
      for (const tool of project.tools) {
        await expect(page.getByText(tool, { exact: true })).toBeVisible();
      }
    });
  }

  test("card opens its project page", async ({ page }) => {
    const [first] = projects;
    await page.goto("/projects");
    await page.getByRole("link", { name: first.title }).click();
    await expect(page).toHaveURL(`/projects/${first.slug}`);
  });
});

test("TC-03 unknown project returns 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL("/");
});
