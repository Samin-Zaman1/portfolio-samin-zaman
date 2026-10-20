// Real QA artifacts for this site. The test cases map one-to-one to the
// Playwright specs in tests/, so the documentation and the automation agree.

export const testPlan = {
  objective:
    "Make sure every page of the portfolio loads, links work, content renders from data, and the site meets WCAG 2.1 AA.",
  inScope: [
    "All top-level pages and every generated project page",
    "Navigation on desktop and mobile viewports",
    "Accessibility (automated axe-core checks)",
    "Integrity of the project data the pages are built from",
  ],
  outOfScope: [
    "Hosting and DNS configuration",
    "Load testing (static site served from a CDN)",
    "Third-party sites linked from the portfolio",
  ],
  environments: ["Chromium", "Firefox", "WebKit", "Mobile Chrome (Pixel 7)"],
  risks: [
    { risk: "A new project entry is missing fields and its page breaks", mitigation: "Data integrity spec runs before UI specs" },
    { risk: "A nav link points to a page that was renamed", mitigation: "Navigation spec clicks every link and checks the heading" },
    { risk: "Styling changes reduce colour contrast", mitigation: "axe-core runs on every page in every browser" },
  ],
  entryCriteria: ["Static export builds", "Lint and type checks pass"],
  exitCriteria: ["All automated tests pass in all browsers", "No accessibility violations", "Only then: deploy to GitHub Pages"],
};

export type TestCase = {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  priority: "High" | "Medium" | "Low";
  spec: string;
};

export const testCases: TestCase[] = [
  {
    id: "TC-01",
    title: "Primary navigation reaches every page",
    steps: ["Open the home page", "Click each link in the main navigation"],
    expected: "Each page opens with its own heading and the link is marked as current",
    priority: "High",
    spec: "tests/navigation.spec.ts",
  },
  {
    id: "TC-02",
    title: "Every project page renders its case study",
    steps: ["Open /projects/<slug> for each project in the data file"],
    expected: "Title, Scope, Approach, Tools and Outcomes sections are visible",
    priority: "High",
    spec: "tests/projects.spec.ts",
  },
  {
    id: "TC-03",
    title: "Unknown URL shows a 404 page",
    steps: ["Open /projects/does-not-exist"],
    expected: "HTTP 404 and a page with a link back home",
    priority: "Medium",
    spec: "tests/projects.spec.ts",
  },
  {
    id: "TC-04",
    title: "Pages pass automated accessibility checks",
    steps: ["Open each page", "Run axe-core with WCAG 2.1 AA rules"],
    expected: "No violations reported",
    priority: "High",
    spec: "tests/accessibility.spec.ts",
  },
  {
    id: "TC-05",
    title: "Pages load without console errors",
    steps: ["Open each page while listening to the browser console"],
    expected: "No messages of type error",
    priority: "Medium",
    spec: "tests/navigation.spec.ts",
  },
  {
    id: "TC-06",
    title: "Resume PDF is downloadable",
    steps: ["Open /resume", "Request the file behind Download PDF"],
    expected: "HTTP 200 with content type application/pdf",
    priority: "High",
    spec: "tests/navigation.spec.ts",
  },
  {
    id: "TC-07",
    title: "Project data is complete and unique",
    steps: ["Read every entry in src/data/projects.ts"],
    expected: "Slugs are unique and URL-safe; required text fields are non-empty",
    priority: "High",
    spec: "tests/data.spec.ts",
  },
];

// A real defect from the SauceDemo QA suite (tests/known-bugs.spec.ts there)
export const sampleBug = {
  id: "SD-01",
  title: "Checkout overview shows an unrounded item total on the standard purchase path",
  severity: "Major",
  priority: "High",
  environment: "saucedemo.com · standard_user · Chromium (Playwright)",
  preconditions: "Logged in as standard_user with an empty cart",
  steps: [
    "Add every product except Sauce Labs Backpack to the cart",
    "Open the cart and click Checkout",
    "Enter a first name, last name and postal code, then click Continue",
    "Read the Item total on the overview page",
  ],
  expected: "Item total: $99.95",
  actual: "Item total: $99.94999999999999, a floating-point sum displayed without rounding",
  notes:
    "Happens on the main happy path, not a deliberately broken account. Covered by an expected-failure test (test.fail()) that asserts the correct total in whole cents; if the bug is fixed, the run goes red so the test gets promoted.",
};
