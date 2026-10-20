// "My Testing Framework": the approach I apply across projects.
// Counts come from bangla-medical-hall; code is copied from saucedemo-qa-suite.

export const frameworkIntro =
  "The same structure shows up in every suite I build: layered tests that each prove one thing, page objects and fixtures that keep tests readable, assertions that check logic rather than snapshots, and a pipeline that won't ship until everything is green.";

export type Layer = {
  name: string;
  tool: string;
  proves: string;
  count?: string;
  width: string; // pyramid bar width
  tint: string;
};

// Bottom of the pyramid last, so it renders top-down
export const layers: Layer[] = [
  { name: "Smoke (production)", tool: "Playwright", proves: "The live site works after every deploy; failure triggers automatic rollback", count: "5", width: "w-[38%]", tint: "bg-peach" },
  { name: "End to end", tool: "Playwright + axe-core", proves: "Real browser → real app → real database: user journeys, role boundaries, accessibility", count: "44", width: "w-[54%]", tint: "bg-lilac" },
  { name: "API", tool: "Playwright request · Postman", proves: "Endpoints match the OpenAPI contract: status codes, payloads, auth, error bodies", width: "w-[66%]", tint: "bg-sky" },
  { name: "Database", tool: "PGlite", proves: "Every migration applies; stock, sales and credit functions behave, including rollbacks and row level security", count: "62", width: "w-[78%]", tint: "bg-lime" },
  { name: "Component", tool: "Testing Library", proves: "UI behaviour in isolation: cart maths, limits, double-submit protection", count: "17", width: "w-[88%]", tint: "bg-mint-deep" },
  { name: "Unit", tool: "Vitest", proves: "Pure logic fast: permission matrix, validation, error → HTTP status mapping", count: "171", width: "w-full", tint: "bg-mint" },
];

export const structure = [
  { path: "pages/", note: "One class per screen (LoginPage, InventoryPage, CartPage, CheckoutPage) plus UsersApi for the REST client. A UI change is fixed in one place." },
  { path: "fixtures/", note: "Extends Playwright's test with ready-made page objects, so specs ask for what they need instead of building it." },
  { path: "data/", note: "Test accounts and helpers such as money.ts, which converts prices to whole cents." },
  { path: "tests/", note: "Specs grouped by feature: login, cart, checkout, sorting, users API, and known bugs." },
  { path: "playwright.config.ts", note: "Retries and traces only in CI, screenshots on failure, HTML + GitHub reporters." },
  { path: ".github/workflows/", note: "Typecheck → run suite → upload report → publish to GitHub Pages from main." },
];

export const principles = [
  { title: "Page Object Model", body: "Screens are classes; tests read like user steps. Products are found by visible name, not generated IDs." },
  { title: "Fixtures over setup code", body: "Shared setup lives in fixtures. A spec asks for loginPage and gets one already on the page." },
  { title: "Derive, don't snapshot", body: "Expected sort orders and totals are computed from what's on screen, so a catalogue change won't break tests but a wrong calculation will." },
  { title: "Accessible locators first", body: "getByRole and getByPlaceholder before test IDs. Stable selectors that double as an accessibility check." },
  { title: "No sleeps", body: "Auto-waiting only. Even the deliberately slow account completes a purchase without a single timeout." },
  { title: "Known bugs are tests", body: "Each open defect is an expected-failure test asserting correct behaviour. When it's fixed, the run goes red so the test gets promoted." },
  { title: "Data-driven coverage", body: "Loops over required fields, users or pages, so new cases are one line and nothing is silently skipped." },
  { title: "Safe in public CI", body: "Secrets come from the environment; API tests skip on fork PRs; traces are off where they'd record headers." },
];

export type Snippet = { title: string; file: string; why: string; code: string };

export const snippets: Snippet[] = [
  {
    title: "Page object: find things the way users do",
    file: "pages/InventoryPage.ts",
    why: "A product card is located by its visible name, then its button by role. Tests say addToCart('Sauce Labs Backpack'), not click('#add-to-cart-sauce-labs-backpack').",
    code: `export class InventoryPage {
  constructor(private readonly page: Page) {
    this.sortSelect = page.getByRole('combobox', { name: 'Sort products' });
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  /** The product card for one item, so its buttons can be found by visible text. */
  item(name: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async addToCart(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }
}`,
  },
  {
    title: "Fixtures: setup once, ask for it anywhere",
    file: "fixtures/index.ts",
    why: "Specs receive page objects as arguments. The API fixture skips cleanly when the secret isn't available instead of failing the run.",
    code: `export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  usersApi: async ({ request }, use, testInfo) => {
    // Secrets aren't available to fork PRs, so skip API tests instead of failing the run.
    testInfo.skip(!process.env.REQRES_API_KEY, 'REQRES_API_KEY is not set');
    await use(new UsersApi(request));
  },
});`,
  },
  {
    title: "Derived assertions: check the arithmetic",
    file: "tests/checkout.spec.ts",
    why: "The expected totals are recomputed from listed prices in whole cents, so the test verifies the maths without inheriting floating-point errors.",
    code: `test('overview totals add up: item total, 8% tax and grand total', async ({ cartPage, checkoutPage }) => {
  await cartPage.checkout();
  await checkoutPage.submitInfo(customer);

  const prices = (await checkoutPage.itemPrices.allTextContents()).map(toCents);
  const subtotal = prices.reduce((sum, p) => sum + p, 0);
  const tax = Math.round(subtotal * TAX_RATE);

  await expect(checkoutPage.subtotal).toHaveText(\`Item total: \${formatCents(subtotal)}\`);
  await expect(checkoutPage.tax).toHaveText(\`Tax: \${formatCents(tax)}\`);
  await expect(checkoutPage.total).toHaveText(\`Total: \${formatCents(subtotal + tax)}\`);
});`,
  },
  {
    title: "Known bug as an expected-failure test",
    file: "tests/known-bugs.spec.ts",
    why: "Asserts the correct behaviour and is marked test.fail(). The run stays green while the bug exists and turns red the day it's fixed. The annotation shows in the HTML report.",
    code: `test.fail(
  'checkout item total is shown to two decimal places',
  bug('With every product except the backpack in the cart, the overview shows ' +
      '"Item total: $99.94999999999999": a floating-point sum displayed without rounding.'),
  async ({ inventoryPage, cartPage, checkoutPage }) => {
    for (const name of ALL_PRODUCTS.filter((n) => n !== 'Sauce Labs Backpack')) {
      await inventoryPage.addToCart(name);
    }
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.submitInfo(customer);

    await expect(checkoutPage.subtotal).toHaveText(/^Item total: \\$\\d+\\.\\d{2}$/);
  },
);`,
  },
];

export const pipeline = [
  { step: "Push / PR", detail: "Every change" },
  { step: "Lint & typecheck", detail: "ESLint, tsc" },
  { step: "Unit · component · DB", detail: "Vitest, PGlite" },
  { step: "Build", detail: "Production build" },
  { step: "E2E + a11y", detail: "Playwright, axe" },
  { step: "Report", detail: "HTML report published" },
  { step: "Deploy", detail: "Only if green" },
  { step: "Smoke", detail: "Live site checked" },
  { step: "Rollback", detail: "Automatic on failure" },
];

export const pipelineExtras = [
  "CodeQL security scanning on every pull request",
  "Nightly cross-browser run on Chromium, Firefox and WebKit",
  "Failures annotated inline on the pull request",
  "Retries and traces only in CI, so flaky tests are visible, not hidden",
];

export const defectFlow = [
  { step: "Find", detail: "Exploratory session or a failing check" },
  { step: "Reproduce", detail: "Minimal steps, exact environment and data" },
  { step: "Report", detail: "Jira ticket: steps, expected vs actual, evidence" },
  { step: "Lock in", detail: "Expected-failure test asserting the correct behaviour" },
  { step: "Verify fix", detail: "Unexpected pass turns the run red" },
  { step: "Promote", detail: "test.fail() removed; it's now a regression test" },
];
