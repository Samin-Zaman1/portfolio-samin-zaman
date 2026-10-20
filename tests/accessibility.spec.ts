import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

test.describe("TC-04 accessibility (WCAG 2.1 AA)", () => {
  for (const { path } of [...pages, { path: "/projects/does-not-exist" }]) {
    test(`on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      // Readable failure output: rule id, impact and offending selectors
      const violations = results.violations.map((v) => ({
        rule: v.id,
        impact: v.impact,
        targets: v.nodes.map((n) => n.target.join(" ")),
      }));
      expect(violations).toEqual([]);
    });
  }
});
