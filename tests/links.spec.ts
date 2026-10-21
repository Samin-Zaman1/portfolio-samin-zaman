import { expect, test } from "@playwright/test";
import { pages } from "./pages";

// Collects every link on every page and requests it once.
// Internal links must return 200 from the static export; external links
// (GitHub repos, test reports) must not be broken.
test("every link on the site resolves", async ({ page, request, baseURL, browserName }) => {
  // Link status doesn't depend on the browser; check once
  test.skip(browserName !== "chromium" || test.info().project.name !== "chromium");
  test.slow();
  const hrefs = new Set<string>();

  for (const { path } of pages) {
    await page.goto(path);
    const found = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href),
    );
    found.forEach((h) => hrefs.add(h.split("#")[0]));
  }

  const broken: string[] = [];
  for (const href of hrefs) {
    if (href.startsWith("mailto:")) continue;
    const response = await request.get(href, { maxRedirects: 5, failOnStatusCode: false });
    if (response.status() >= 400) broken.push(`${response.status()} ${href.replace(baseURL!, "")}`);
  }

  expect(broken).toEqual([]);
});
