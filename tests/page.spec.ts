import { expect, test } from "@playwright/test";

test("loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Trying to adapt");
  expect(errors).toEqual([]);
});

test("every in-page link points to a section that exists", async ({ page }) => {
  await page.goto("/");
  const targets = await page.locator('a[href^="#"]').evaluateAll((as) =>
    as.map((a) => a.getAttribute("href")!),
  );
  expect(targets.length).toBeGreaterThan(0);
  for (const id of targets) await expect(page.locator(id), id).toHaveCount(1);
});

test("resume PDF is served", async ({ request }) => {
  const res = await request.get("/resume/Samin_Zaman_Resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("bug tickets expand and collapse", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#tickets .trow");
  await expect(rows).toHaveCount(3);

  // First ticket starts open, the rest closed
  await expect(rows.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(rows.nth(1)).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#tb1")).toBeHidden();

  await rows.nth(1).click();
  await expect(rows.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#tb1")).toBeVisible();

  await rows.nth(1).click();
  await expect(page.locator("#tb1")).toBeHidden();
});
