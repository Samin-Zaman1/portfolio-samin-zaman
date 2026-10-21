import { expect, test, type APIRequestContext } from "@playwright/test";
import { pages } from "./pages";

// GitHub rate-limits github.com page views; file links are checked on
// raw.githubusercontent.com, which returns 404 just the same if the file is gone.
const toCheckable = (href: string) =>
  href.replace(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/blob\//, "https://raw.githubusercontent.com/$1/");

async function status(request: APIRequestContext, url: string) {
  for (let attempt = 1; ; attempt++) {
    const response = await request.get(url, { maxRedirects: 5, failOnStatusCode: false });
    if (response.status() !== 429 || attempt === 3) return response.status();
    await new Promise((r) => setTimeout(r, 2_000 * attempt));
  }
}

// Collects every link on every page and requests each one once.
test("every link on the site resolves", async ({ page, request, baseURL }) => {
  // Link status doesn't depend on the browser; check once
  test.skip(test.info().project.name !== "chromium");
  test.setTimeout(180_000);
  const hrefs = new Set<string>();

  for (const { path } of pages) {
    await page.goto(path);
    const found = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href),
    );
    found.forEach((h) => hrefs.add(toCheckable(h.split("#")[0])));
  }

  const broken: string[] = [];
  for (const href of hrefs) {
    if (href.startsWith("mailto:")) continue;
    const code = await status(request, href);
    if (code >= 400) broken.push(`${code} ${href.replace(baseURL!, "")}`);
  }

  expect(broken).toEqual([]);
});
