import { expect, test } from "@playwright/test";
import { navLinks } from "../src/data/site";
import { pages } from "./pages";

test.describe("TC-01 primary navigation", () => {
  for (const link of navLinks) {
    test(`reaches ${link.label}`, async ({ page }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Main" });
      await nav.getByRole("link", { name: link.label, exact: true }).click();

      await expect(page).toHaveURL(link.href);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(link.label);
      await expect(nav.getByRole("link", { name: link.label, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  }

  test("site name links back home", async ({ page }) => {
    await page.goto("/skills");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Samin Zaman" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("TC-05 no console errors", () => {
  for (const { path } of pages) {
    test(`on ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }
});
