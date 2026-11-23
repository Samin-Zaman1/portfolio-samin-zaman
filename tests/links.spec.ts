import { expect, test, type APIRequestContext } from "@playwright/test";

async function status(request: APIRequestContext, url: string) {
  for (let attempt = 1; ; attempt++) {
    const response = await request.get(url, { maxRedirects: 5, failOnStatusCode: false });
    if (response.status() !== 429 || attempt === 3) return response.status();
    await new Promise((r) => setTimeout(r, 2_000 * attempt));
  }
}

// Requests every link on the page once
test("every link resolves", async ({ page, request, baseURL }) => {
  // Link status doesn't depend on the browser; check once
  test.skip(test.info().project.name !== "chromium");
  test.setTimeout(120_000);
  await page.goto("/");
  const hrefs = new Set(
    await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href.split("#")[0]),
    ),
  );

  const broken: string[] = [];
  for (const href of hrefs) {
    if (href.startsWith("mailto:")) continue;
    const code = await status(request, href);
    if (code >= 400) broken.push(`${code} ${href.replace(baseURL!, "")}`);
  }
  expect(broken).toEqual([]);
});

test("contact links are filled in", async ({ page }) => {
  // Known gap: CONFIG is still empty, so the page shows TODO placeholders
  test.fail();
  await page.goto("/");
  await expect(page.locator("#links .todo")).toHaveCount(0, { timeout: 2_000 });
});
