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

test("contact links point where they should", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("#links");
  await expect(links.getByRole("link", { name: "Email me" })).toHaveAttribute("href", "mailto:saminzaman7@gmail.com");
  await expect(links.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Samin-Zaman1");
  await expect(links.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "resume/Samin_Zaman_Resume.pdf");
});

test("contact links are filled in", async ({ page }) => {
  // Known gap: no LinkedIn URL yet, so one TODO placeholder remains
  test.fail();
  await page.goto("/");
  await expect(page.locator("#links .todo")).toHaveCount(0, { timeout: 2_000 });
});

test("every project links to its repo", async ({ page }) => {
  await page.goto("/");
  const projects = page.locator("#projects .proj");
  await expect(projects).toHaveCount(5);
  for (const p of await projects.all()) {
    await expect(p.getByRole("link", { name: "Repo", exact: true })).toHaveAttribute("href", /^https:\/\/github\.com\/Samin-Zaman1\//);
  }
});
