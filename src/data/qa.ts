// QA documentation per project, taken from the real test suites in each repo.
// Every test case names the file that automates it.

export type TestCase = {
  id: string;
  scenario: string;
  title: string;
  type: "Positive" | "Negative" | "Boundary" | "Security" | "Defect";
  precondition: string;
  data?: string;
  steps: string[];
  expected: string;
  file: string;
  open?: boolean; // known defect, tracked as an expected-failure test
};

export type QaDoc = {
  slug: string;
  requirements: { id: string; text: string }[];
  plan: {
    scope: string[];
    outOfScope: string[];
    levels: string;
    environment: string;
    entry: string;
    exit: string;
  };
  scenarios: { id: string; title: string; covers: string[] }[];
  cases: TestCase[];
  defects?: { text: string; status: "Open" | "Fixed" }[];
};

export const qaDocs: QaDoc[] = [
  {
    slug: "saucedemo-qa-suite",
    requirements: [
      { id: "R1", text: "Valid users can log in; locked-out users and invalid credentials are rejected with an error." },
      { id: "R2", text: "The cart holds exactly the items added, and keeps them across navigation." },
      { id: "R3", text: "Checkout requires first name, last name and postal code; the overview shows item total, 8% tax and total." },
      { id: "R4", text: "Each sort option orders the catalogue without adding or dropping products." },
      { id: "R5", text: "Users API supports get, create and update; an unknown user returns 404 with an empty body." },
    ],
    plan: {
      scope: ["Login", "Cart", "Checkout", "Sorting", "Users API (reqres.in)"],
      outOfScope: ["Payment processing", "Visual layout", "Load testing"],
      levels: "E2E UI and API, automated with Playwright. Known defects kept as expected-failure tests.",
      environment: "saucedemo.com and reqres.in · Chromium · GitHub Actions",
      entry: "Site reachable; test accounts available; API key set for API tests.",
      exit: "All tests pass or fail as expected; HTML report published.",
    },
    scenarios: [
      { id: "TS-01", title: "Login with valid and invalid credentials", covers: ["R1"] },
      { id: "TS-02", title: "Add, remove and keep items in the cart", covers: ["R2"] },
      { id: "TS-03", title: "Checkout validation and totals", covers: ["R3"] },
      { id: "TS-04", title: "Sort the catalogue", covers: ["R4"] },
      { id: "TS-05", title: "Users API requests", covers: ["R5"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Negative",
        title: "Locked-out user cannot log in",
        precondition: "On the login page",
        data: "locked_out_user / secret_sauce",
        steps: ["Enter username and password", "Click Login"],
        expected: "Error message contains “locked out”",
        file: "tests/login.spec.ts",
      },
      {
        id: "TC-02", scenario: "TS-01", type: "Negative",
        title: "Whitespace-only username is rejected",
        precondition: "On the login page",
        data: "\"   \" / secret_sauce",
        steps: ["Enter three spaces as username and a valid password", "Click Login"],
        expected: "Error message contains “do not match any user”",
        file: "tests/login.spec.ts",
      },
      {
        id: "TC-03", scenario: "TS-02", type: "Positive",
        title: "Cart survives navigating back to products",
        precondition: "Logged in as standard_user, cart empty",
        data: "Sauce Labs Fleece Jacket",
        steps: ["Add the item", "Open the cart", "Click Continue Shopping"],
        expected: "Products page shown; cart badge is 1; item shows a Remove button",
        file: "tests/cart.spec.ts",
      },
      {
        id: "TC-04", scenario: "TS-03", type: "Positive",
        title: "Overview totals add up",
        precondition: "Logged in as standard_user; Backpack and Bike Light in cart",
        data: "Ada / Lovelace / 1207",
        steps: ["Click Checkout", "Enter customer details", "Click Continue"],
        expected: "Item total = sum of listed prices; Tax = 8% of item total, rounded to the cent; Total = item total + tax",
        file: "tests/checkout.spec.ts",
      },
      {
        id: "TC-05", scenario: "TS-03", type: "Negative",
        title: "Checkout blocked without a last name",
        precondition: "Logged in as standard_user; item in cart; on checkout step one",
        data: "Ada / (blank) / 1207",
        steps: ["Leave Last Name empty", "Click Continue"],
        expected: "“Error: Last Name is required”; stays on checkout step one",
        file: "tests/checkout.spec.ts",
      },
      {
        id: "TC-06", scenario: "TS-04", type: "Positive",
        title: "Sort by price, low to high",
        precondition: "Logged in as standard_user",
        steps: ["Note the product list", "Choose Price (low to high)"],
        expected: "Prices in ascending order; same six products as before sorting",
        file: "tests/sorting.spec.ts",
      },
      {
        id: "TC-07", scenario: "TS-05", type: "Negative",
        title: "Unknown user returns 404",
        precondition: "Valid API key",
        data: "GET /api/users/999",
        steps: ["Send the request"],
        expected: "Status 404; body is {}",
        file: "tests/users-api.spec.ts",
      },
      {
        id: "TC-08", scenario: "TS-03", type: "Defect", open: true,
        title: "Item total is shown to two decimal places",
        precondition: "Logged in as standard_user",
        data: "Every product except the Backpack",
        steps: ["Add the five products", "Check out with valid details", "Read Item total"],
        expected: "Item total: $99.95. Actual: $99.94999999999999",
        file: "tests/known-bugs.spec.ts",
      },
    ],
    defects: [
      { text: "standard_user: item total shown unrounded ($99.94999999999999)", status: "Open" },
      { text: "problem_user: typing a last name overwrites the first name; checkout can't pass", status: "Open" },
      { text: "error_user: Finish does nothing; the order is never placed", status: "Open" },
      { text: "visual_user: list prices change on every sort; the cart charges the real price", status: "Open" },
    ],
  },
  {
    slug: "bangla-medical-hall",
    requirements: [
      { id: "R1", text: "A sale takes stock from the earliest-expiring batch first." },
      { id: "R2", text: "A sale is all-or-nothing: if any line is short of stock, nothing is recorded." },
      { id: "R3", text: "A discount can't be negative or larger than the subtotal." },
      { id: "R4", text: "Only the owner can sell on credit, adjust stock or view reports, enforced on the server as well as the UI." },
      { id: "R5", text: "After each deploy the live site is reachable and protected APIs refuse anonymous requests." },
    ],
    plan: {
      scope: ["Point of sale", "Batch stock and expiry", "Discounts and credit", "Role permissions", "Post-deploy smoke"],
      outOfScope: ["Accuracy of AI invoice reading", "Hosting providers’ uptime", "Load testing"],
      levels: "Unit (Vitest) · Component (Testing Library) · Database (PGlite) · E2E (Playwright) · Smoke (production)",
      environment: "Node 24 · local Supabase in Docker · Chromium and Pixel 7 on PRs · Firefox and WebKit nightly",
      entry: "All migrations apply; the E2E suite refuses to run unless the database is localhost.",
      exit: "Every layer green on the PR; smoke tests green after deploy, otherwise automatic rollback.",
    },
    scenarios: [
      { id: "TS-01", title: "Cash sale at the till", covers: ["R1", "R3"] },
      { id: "TS-02", title: "Stock conflicts during a sale", covers: ["R1", "R2"] },
      { id: "TS-03", title: "Role boundaries", covers: ["R4"] },
      { id: "TS-04", title: "Post-deploy smoke", covers: ["R5"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Positive",
        title: "Multi-item cash sale with discount and change",
        precondition: "Signed in as staff; product A ৳2.50 (stock 40), product B ৳7.00 (stock 10)",
        data: "A × 4, B × 2, discount ৳2, cash ৳50",
        steps: ["Add A and set quantity 4", "Add B and increase to 2", "Enter discount and cash received", "Complete sale"],
        expected: "Button shows ৳22.00; “Return change: ৳28.00”; stock A 36, B 8; receipt lists 4 and 2",
        file: "tests/e2e/sales.spec.ts",
      },
      {
        id: "TC-02", scenario: "TS-02", type: "Negative",
        title: "Stock sold elsewhere after the page loaded",
        precondition: "Signed in as staff; product with stock 3",
        steps: ["Add the product, quantity 3", "Another till reduces stock to 1", "Complete sale"],
        expected: "“Insufficient stock for <product> (need 3, have 1)”; bill kept; stock still 1",
        file: "tests/e2e/sales.spec.ts",
      },
      {
        id: "TC-03", scenario: "TS-02", type: "Negative",
        title: "Whole bill rolls back when one line is short",
        precondition: "Database reset and seeded",
        data: "Plenty: 50 in stock, sell 10 · Scarce: 1 in stock, sell 2",
        steps: ["Call create_sale with both lines"],
        expected: "Error names Scarce; Plenty stock still 50; no sale or stock-movement rows",
        file: "tests/db/create-sale.test.ts",
      },
      {
        id: "TC-04", scenario: "TS-02", type: "Boundary",
        title: "Earliest expiry first, split across batches",
        precondition: "One product in three batches",
        data: "3 units exp 2026-12-01 · 10 units exp 2028-01-01 · 10 units no expiry · sell 5",
        steps: ["Call create_sale for 5 units"],
        expected: "Batches left: 0 / 8 / 10; two stock movements, 3 then 2",
        file: "tests/db/create-sale.test.ts",
      },
      {
        id: "TC-05", scenario: "TS-01", type: "Boundary",
        title: "Discount just above the subtotal is rejected",
        precondition: "Product priced ৳4.00 with stock 10",
        data: "Quantity 1, discount ৳4.01",
        steps: ["Call create_sale"],
        expected: "“Discount cannot exceed the subtotal”; stock still 10",
        file: "tests/db/create-sale.test.ts",
      },
      {
        id: "TC-06", scenario: "TS-03", type: "Security",
        title: "Staff can’t open Reports by URL",
        precondition: "Signed in as staff",
        steps: ["Go to /reports directly"],
        expected: "Redirected to /sales",
        file: "tests/e2e/permissions.spec.ts",
      },
      {
        id: "TC-07", scenario: "TS-04", type: "Security",
        title: "Protected APIs refuse anonymous requests",
        precondition: "Not signed in; run against the deployed site",
        data: "GET /api/products · GET /api/auth",
        steps: ["Send both requests"],
        expected: "Both return 401",
        file: "tests/e2e/smoke.spec.ts",
      },
    ],
    defects: [
      { text: "Wholesaler table had no row level security; the public key could read emails and password hashes", status: "Fixed" },
      { text: "Staff could open /reports by typing the URL", status: "Fixed" },
      { text: "Sales history used UTC days: sales between midnight and 6 am Dhaka time were missing", status: "Fixed" },
      { text: "Brand green (3.76:1) and amber (3.04:1) failed WCAG AA contrast", status: "Fixed" },
    ],
  },
  {
    slug: "recordguard",
    requirements: [
      { id: "R1", text: "One bad record never fails the batch; every input ends up in valid or invalid, with its index and reason." },
      { id: "R2", text: "Failed loads retry with exponential backoff and rethrow the last error unchanged." },
      { id: "R3", text: "shouldRetry can stop retries early, e.g. on a 404." },
      { id: "R4", text: "The published package works as installed: exports, types and real HTTP." },
    ],
    plan: {
      scope: ["guard and guardAsync", "retry", "loadAndGuard", "Published npm tarball"],
      outOfScope: ["Browser runtimes", "Very large inputs"],
      levels: "Unit with fake timers · interop with a real Zod schema · package test (pack, install, run) · type tests",
      environment: "Node 22 and 24 · GitHub Actions",
      entry: "Build succeeds.",
      exit: "Coverage at least 90% (currently 100%); package test green on both Node versions.",
    },
    scenarios: [
      { id: "TS-01", title: "Validate a batch of records", covers: ["R1"] },
      { id: "TS-02", title: "Retry timing and stop conditions", covers: ["R2", "R3"] },
      { id: "TS-03", title: "Use the installed package", covers: ["R4"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Negative",
        title: "Validator throws on one record",
        precondition: "Validator that throws on the value 2",
        data: "[1, 2, 3]",
        steps: ["Run guard on the array"],
        expected: "valid [1, 3]; invalid at index 1 with “Validator threw: boom”",
        file: "src/guard.test.ts",
      },
      {
        id: "TC-02", scenario: "TS-02", type: "Boundary",
        title: "Exponential backoff timing",
        precondition: "Function fails twice, then succeeds; fake timers",
        data: "attempts 3, delayMs 100, backoff 2",
        steps: ["Advance 99 ms, then 1 ms", "Advance 199 ms, then 1 ms"],
        expected: "Second call at exactly 100 ms, third at 300 ms; resolves “ok”",
        file: "src/retry.test.ts",
      },
      {
        id: "TC-03", scenario: "TS-02", type: "Negative",
        title: "No retry on 404",
        precondition: "Function always rejects with status 404",
        data: "attempts 5; shouldRetry returns false for 404",
        steps: ["Run retry"],
        expected: "Called once; rejects with the same error",
        file: "src/retry.test.ts",
      },
      {
        id: "TC-04", scenario: "TS-03", type: "Positive",
        title: "Installed package retries over real HTTP",
        precondition: "Tarball packed and installed into an empty project; local server returns 503 once",
        data: "Then 3 records, one with id “2”",
        steps: ["Run the consumer script against /users"],
        expected: "2 requests; valid ids 1 and 3; invalid at index 1, “Rejected by isUser”",
        file: "e2e/package.test.ts",
      },
      {
        id: "TC-05", scenario: "TS-03", type: "Negative",
        title: "API returns an object instead of an array",
        precondition: "Installed package; endpoint returns { data: [] }",
        steps: ["Run the consumer script against /wrapped"],
        expected: "TypeError: load() must resolve to an array of records, got object",
        file: "e2e/package.test.ts",
      },
    ],
  },
  {
    slug: "mini-library",
    requirements: [
      { id: "R1", text: "Fine = days overdue × rate (default 5 per day); 0 days costs nothing." },
      { id: "R2", text: "Negative or non-numeric days are rejected at runtime." },
      { id: "R3", text: "Librarian-only routes return 401 when signed out and 403 for the wrong role." },
    ],
    plan: {
      scope: ["Fine calculation", "Role middleware"],
      outOfScope: ["Borrow/return database functions (next)", "UI end to end (next)"],
      levels: "Unit (Vitest), database mocked",
      environment: "Node · GitHub Actions",
      entry: "Typecheck passes.",
      exit: "All unit tests pass.",
    },
    scenarios: [
      { id: "TS-01", title: "Calculate an overdue fine", covers: ["R1", "R2"] },
      { id: "TS-02", title: "Access a librarian-only route", covers: ["R3"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Boundary",
        title: "Zero days overdue",
        precondition: "Default rate",
        data: "days = 0",
        steps: ["Call calculateFine"],
        expected: "0",
        file: "tests/unit/fees.test.ts",
      },
      {
        id: "TC-02", scenario: "TS-01", type: "Boundary",
        title: "One day overdue",
        precondition: "Default rate",
        data: "days = 1",
        steps: ["Call calculateFine"],
        expected: "5",
        file: "tests/unit/fees.test.ts",
      },
      {
        id: "TC-03", scenario: "TS-01", type: "Negative",
        title: "Negative days",
        precondition: "Default rate",
        data: "days = -1",
        steps: ["Call calculateFine"],
        expected: "Throws “cannot be negative”",
        file: "tests/unit/fees.test.ts",
      },
      {
        id: "TC-04", scenario: "TS-01", type: "Negative",
        title: "String instead of a number",
        precondition: "Default rate",
        data: "days = \"5\"",
        steps: ["Call calculateFine"],
        expected: "Throws “finite number”",
        file: "tests/unit/fees.test.ts",
      },
      {
        id: "TC-05", scenario: "TS-02", type: "Security",
        title: "Member on a librarian route",
        precondition: "Signed in as a member",
        steps: ["Request a route guarded by requireRole(\"librarian\")"],
        expected: "403; handler not called",
        file: "tests/unit/auth.test.ts",
      },
    ],
  },
  {
    slug: "learners-hub",
    requirements: [
      { id: "R1", text: "A student can only view and update their own task submissions." },
      { id: "R2", text: "Progress must be between 0 and 100." },
      { id: "R3", text: "Marking a task COMPLETED sets progress to 100 and records the submission time." },
      { id: "R4", text: "Invitation codes use the format XXXX-XXXX, uppercase, without look-alike characters." },
    ],
    plan: {
      scope: ["StudentTaskService", "Invitation code generation and validation"],
      outOfScope: ["API integration (next)", "Database constraints (next)", "Browser E2E (next)"],
      levels: "Unit (Jest) with a hand-built Prisma fake",
      environment: "Node 20 · GitHub Actions",
      entry: "Every branch of the method listed as it.todo first.",
      exit: "Every branch has a test; coverage report attached to the CI run.",
    },
    scenarios: [
      { id: "TS-01", title: "Access another student’s submission", covers: ["R1"] },
      { id: "TS-02", title: "Update task progress", covers: ["R2", "R3"] },
      { id: "TS-03", title: "Validate an invitation code", covers: ["R4"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Security",
        title: "Submission belongs to another student",
        precondition: "Submission owned by student2",
        data: "Requested by student1",
        steps: ["Call getTaskSubmission"],
        expected: "ForbiddenException: “You do not have access to this submission”",
        file: "apps/api/src/student/student-task.service.spec.ts",
      },
      {
        id: "TC-02", scenario: "TS-02", type: "Boundary",
        title: "Progress above 100",
        precondition: "Submission owned by the student",
        data: "progress = 150",
        steps: ["Call updateSubmission"],
        expected: "BadRequestException",
        file: "apps/api/src/student/student-task.service.spec.ts",
      },
      {
        id: "TC-03", scenario: "TS-02", type: "Positive",
        title: "Completing a task",
        precondition: "Submission owned by the student",
        data: "status = COMPLETED",
        steps: ["Call updateSubmission"],
        expected: "progress 100; status COMPLETED; submittedAt set",
        file: "apps/api/src/student/student-task.service.spec.ts",
      },
      {
        id: "TC-04", scenario: "TS-03", type: "Negative",
        title: "Code with a look-alike character",
        precondition: "None",
        data: "ABCD-1FGH",
        steps: ["Call isValidInvitationCode"],
        expected: "false",
        file: "apps/api/src/utils/code-generator.spec.ts",
      },
    ],
    defects: [
      { text: "getTaskSubmission doesn't return progress, so students can't see their own progress", status: "Open" },
      { text: "Expired token returns 403 instead of 401, so the web client never sends the user back to login", status: "Open" },
    ],
  },
  {
    slug: "sqa-job-alert",
    requirements: [
      { id: "R1", text: "Unambiguous software-testing titles are always kept." },
      { id: "R2", text: "Quality-control roles from garments, pharma, labs and call centres are dropped." },
      { id: "R3", text: "Seniority levels set in skip_level are filtered out." },
      { id: "R4", text: "The same job from two sources, or reposted, is tracked once." },
    ],
    plan: {
      scope: ["Title filter", "Seniority filter", "Duplicate detection"],
      outOfScope: ["Live scraping of each job site", "Notification delivery"],
      levels: "Unit (unittest), data-driven with subTest over real titles",
      environment: "Python 3.10+ · local, run after each filter change",
      entry: "config.json loads.",
      exit: "All ~115 title cases and duplicate pairs pass.",
    },
    scenarios: [
      { id: "TS-01", title: "Classify a job title", covers: ["R1", "R2", "R3"] },
      { id: "TS-02", title: "Match duplicate postings", covers: ["R4"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Negative",
        title: "Garment QA role is dropped",
        precondition: "Default filters",
        data: "“QA Executive” at “Acme Garments Ltd”",
        steps: ["Run is_sqa"],
        expected: "Not kept",
        file: "test_filters.py",
      },
      {
        id: "TC-02", scenario: "TS-01", type: "Positive",
        title: "Strong title kept at a non-tech company",
        precondition: "Default filters",
        data: "“Software Engineer in Test” at “Acme Group”",
        steps: ["Run is_sqa"],
        expected: "Kept",
        file: "test_filters.py",
      },
      {
        id: "TC-03", scenario: "TS-01", type: "Negative",
        title: "Skipped seniority",
        precondition: "skip_level includes head/director",
        data: "“Head of QA” at “Acme Software Ltd”",
        steps: ["Run is_sqa"],
        expected: "Not kept",
        file: "test_filters.py",
      },
      {
        id: "TC-04", scenario: "TS-02", type: "Positive",
        title: "Abbreviation and company suffix ignored",
        precondition: "None",
        data: "“Sr. SQA Engineer” / “Acme Software Ltd” vs “Senior SQA Engineer” / “Acme Software Limited”",
        steps: ["Compute dup_key for both"],
        expected: "Same key",
        file: "test_filters.py",
      },
      {
        id: "TC-05", scenario: "TS-02", type: "Negative",
        title: "Different seniority is a different job",
        precondition: "None",
        data: "“QA Engineer” vs “Senior QA Engineer”, both at Novacard",
        steps: ["Compute dup_key for both"],
        expected: "Different keys",
        file: "test_filters.py",
      },
    ],
  },
  {
    slug: "portfolio-samin-zaman",
    requirements: [
      { id: "R1", text: "Every page loads with HTTP 200 and no console errors." },
      { id: "R2", text: "Every internal and external link resolves." },
      { id: "R3", text: "Every page meets WCAG 2.1 AA." },
      { id: "R4", text: "The resume PDF downloads." },
      { id: "R5", text: "Unknown URLs return 404 with a way back." },
    ],
    plan: {
      scope: ["All pages", "Navigation", "Links", "Accessibility", "Resume download"],
      outOfScope: ["Content of linked repos", "Hosting uptime"],
      levels: "E2E (Playwright) against the static export, axe-core for accessibility",
      environment: "Chromium, Firefox, WebKit, Pixel 7 · GitHub Actions",
      entry: "Lint, typecheck and static build pass.",
      exit: "All tests pass; only then deploy to GitHub Pages.",
    },
    scenarios: [
      { id: "TS-01", title: "Navigate the site", covers: ["R1", "R5"] },
      { id: "TS-02", title: "Follow every link", covers: ["R2", "R4"] },
      { id: "TS-03", title: "Accessibility scan", covers: ["R3"] },
    ],
    cases: [
      {
        id: "TC-01", scenario: "TS-01", type: "Positive",
        title: "Each nav link opens its page",
        precondition: "On the home page",
        steps: ["Click each link in the main navigation"],
        expected: "URL and h1 match; link marked aria-current",
        file: "tests/navigation.spec.ts",
      },
      {
        id: "TC-02", scenario: "TS-02", type: "Positive",
        title: "No broken links",
        precondition: "Static export served locally",
        steps: ["Collect every href on every page", "Request each one"],
        expected: "No status 400 or above",
        file: "tests/links.spec.ts",
      },
      {
        id: "TC-03", scenario: "TS-03", type: "Positive",
        title: "WCAG 2.1 AA on every page",
        precondition: "Page loaded",
        steps: ["Run axe-core with wcag2a, wcag2aa, wcag21a, wcag21aa"],
        expected: "No violations",
        file: "tests/accessibility.spec.ts",
      },
      {
        id: "TC-04", scenario: "TS-01", type: "Negative",
        title: "Unknown URL",
        precondition: "None",
        data: "/does-not-exist",
        steps: ["Open the URL", "Click Back to home"],
        expected: "Status 404; “Page not found”; home page opens",
        file: "tests/projects.spec.ts",
      },
    ],
  },
];

export const getQaDoc = (slug: string) => qaDocs.find((d) => d.slug === slug);
