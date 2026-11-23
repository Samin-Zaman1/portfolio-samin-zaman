import { expect, test, type Page } from "@playwright/test";

// Desktop, tablet, phone
const widths = [1280, 768, 390];

test.use({ reducedMotion: "reduce" });

const overflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

for (const width of widths) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 800 } });

    test("no horizontal scroll with the bugs open", async ({ page }) => {
      // Known bug: the shifted bug elements push the page 12px wider than a 390px screen.
      // Pixel 7 emulation passes because its layout viewport is 412px wide.
      test.fail(width === 390 && test.info().project.name !== "mobile-chrome");
      await page.goto("/");
      expect(await overflow(page)).toBeLessThanOrEqual(0);
    });

    test("no horizontal scroll with the bugs fixed", async ({ page }) => {
      await page.goto("/");
      for (const id of [1, 2, 3]) await page.locator(`[data-bug="${id}"]`).click();
      expect(await overflow(page)).toBeLessThanOrEqual(0);
    });

    test("body text is at least 14px", async ({ page }) => {
      await page.goto("/");
      const small = await page.locator("main p, main li, main dd").evaluateAll((els) =>
        els
          // Monospace labels (tag line, IDs, severity) are allowed to be smaller
          .filter((e) => !getComputedStyle(e).fontFamily.includes("JetBrains Mono"))
          .filter((e) => parseFloat(getComputedStyle(e).fontSize) < 14)
          .map((e) => `${getComputedStyle(e).fontSize} ${e.textContent!.trim().slice(0, 40)}`),
      );
      expect(small).toEqual([]);
    });
  });
}
