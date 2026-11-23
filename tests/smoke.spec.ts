import { test, expect } from "@playwright/test";

// Placeholder until the full suite is rewritten for the single page
test("home page loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Trying to adapt");
  expect(errors).toEqual([]);
});

test("resume PDF is served", async ({ request }) => {
  const res = await request.get("/resume/Samin_Zaman_Resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});
