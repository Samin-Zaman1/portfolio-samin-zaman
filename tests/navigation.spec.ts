import { expect, test } from "@playwright/test";
import { navLinks } from "../src/data/site";
import { pages } from "./pages";

test.describe("primary navigation", () => {
  for (const link of navLinks) {
    test(`reaches ${link.label}`, async ({ page }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Main" });
      await nav.getByRole("link", { name: link.label, exact: true }).click();

      await expect(page).toHaveURL(link.href);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(link.heading);
      await expect(nav.getByRole("link", { name: link.label, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  }

  test("Home is the only link marked current on the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" }).locator("[aria-current=page]")).toHaveText(["Home"]);
  });
});

test("resume PDF is downloadable", async ({ page, request }) => {
  await page.goto("/resume");
  const href = await page.getByRole("link", { name: "Download PDF" }).getAttribute("href");
  expect(href).toBeTruthy();
  const response = await request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test.describe("no console errors", () => {
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
