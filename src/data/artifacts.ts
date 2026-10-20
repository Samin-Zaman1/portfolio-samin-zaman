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
  entryCriteria: ["Production build succeeds", "Lint and type checks pass"],
  exitCriteria: ["All automated tests pass in all browsers", "No serious or critical accessibility violations"],
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
    title: "Project data is complete and unique",
    steps: ["Read every entry in src/data/projects.ts"],
    expected: "Slugs are unique and URL-safe; required text fields are non-empty",
    priority: "High",
    spec: "tests/data.spec.ts",
  },
];

// A sample defect, written in the format I use. The product is fictional.
export const sampleBug = {
  id: "BUG-142",
  title: "Checkout accepts an expired card when the expiry month is the current month",
  severity: "Major",
  priority: "High",
  environment: "Staging, build 2.8.1 · Chrome 141 / Windows 11",
  preconditions: "Logged-in user with one item in the cart",
  steps: [
    "Go to Checkout and choose Card",
    "Enter test card 4111 1111 1111 1111",
    "Set expiry to the current month and last year (e.g. 10/25 in October 2026)",
    "Click Pay",
  ],
  expected: "The form shows “Card has expired” and the order is not created",
  actual: "Payment form submits, the gateway declines, and the user sees a generic “Something went wrong” error. An empty order is left in Pending state.",
  notes:
    "Expiry validation compares only the month. Boundary cases: last month of last year (rejected correctly), current month of last year (accepted, bug), current month of this year (accepted, correct).",
};
