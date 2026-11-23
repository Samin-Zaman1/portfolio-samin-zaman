import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function violations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  // Readable failure output: rule id, impact and offending selectors
  return results.violations.map((v) => ({
    rule: v.id,
    impact: v.impact,
    targets: v.nodes.map((n) => n.target.join(" ")),
  }));
}

test.use({ reducedMotion: "reduce" });

test("WCAG 2.1 AA with the bugs open", async ({ page }) => {
  await page.goto("/");
  expect(await violations(page)).toEqual([]);
});

test("WCAG 2.1 AA with the bugs fixed and a ticket expanded", async ({ page }) => {
  await page.goto("/");
  for (const id of [1, 2, 3]) await page.locator(`[data-bug="${id}"]`).click();
  await page.locator("#tickets .trow").nth(1).click();
  expect(await violations(page)).toEqual([]);
});
