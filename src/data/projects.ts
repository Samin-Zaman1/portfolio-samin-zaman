export type CaseStudy = {
  slug: string;
  title: string;
  kind: "Professional" | "Personal";
  category: string;
  summary: string;
  context: string;
  stats?: { value: string; label: string }[];
  scope: string[];
  approach: string[];
  bugs?: string[];
  tools: string[];
  outcomes: string[];
  repoUrl?: string;
  reportUrl?: string;
  featured?: boolean;
};

const gh = (repo: string) => `https://github.com/Samin-Zaman1/${repo}`;

export const projects: CaseStudy[] = [
  {
    slug: "bangla-medical-hall",
    title: "Pharmacy POS & Inventory System",
    kind: "Personal",
    category: "Full-stack · Quality engineering",
    summary:
      "POS and inventory for a real pharmacy in Bangladesh, built end to end with ~300 automated tests across four layers and a CI/CD pipeline that tests, deploys and rolls back on its own.",
    context:
      "Small pharmacies often run on paper: expiry dates tracked by memory, customer credit in a notebook. I built a system around how the shop actually works (billing, batch-level stock with expiry, customer credit, supplier purchasing with AI invoice reading) and tested it like production software.",
    stats: [
      { value: "~300", label: "automated tests" },
      { value: "4", label: "test layers" },
      { value: "3", label: "browsers nightly" },
    ],
    scope: [
      "Point of sale: billing, discounts, cash change, bKash/Nagad/credit payments",
      "Batch-level inventory with earliest-expiry-first stock consumption",
      "Customer credit (baki), purchasing, wholesaler portal",
      "Role-based access enforced on every API route",
      "AI invoice extraction with a human review step before stock changes",
    ],
    approach: [
      "Unit (Vitest, 171): permission matrix, sessions, proxy rules, API validation",
      "Component (Testing Library, 17): till behaviour, cart maths, double-submit protection",
      "Database (PGlite, 62): every migration applied; sales, stock and credit functions exercised for real, including rollbacks and row level security",
      "End to end (Playwright, 44 + 5 smoke): real browser to real app to real Supabase in Docker, with axe accessibility checks",
      "Open issues tracked as expected-failure tests so they can't silently regress",
    ],
    bugs: [
      "The wholesaler table had no row level security, so the public anon key could read account emails and password hashes. Fixed, with a test that every table is locked down.",
      "Wholesalers never saw their order confirmation: it rendered inside the cart, which emptied on success.",
      "32 form labels weren't linked to their inputs, breaking screen readers.",
    ],
    tools: ["Playwright", "Vitest", "Testing Library", "PGlite", "axe-core", "CodeQL", "GitHub Actions", "Next.js", "Supabase"],
    outcomes: [
      "Every pull request runs lint, typecheck, all test layers and the browser suite against a production build, plus CodeQL",
      "Merging to main migrates the database, deploys, smoke-tests the live site and rolls back automatically if smoke tests fail",
      "Nightly cross-browser run on Chromium, Firefox and WebKit",
    ],
    repoUrl: gh("bangla-medical-hall"),
    featured: true,
  },
  {
    slug: "saucedemo-qa-suite",
    title: "SauceDemo QA Suite",
    kind: "Personal",
    category: "UI & API automation",
    summary:
      "38 Playwright UI and API tests with the Page Object Model and custom fixtures. 11 defects found and documented as expected-failure tests, including a rounding error on the main checkout path.",
    context:
      "An end-to-end and API suite for saucedemo.com and the reqres.in Users API, built the way I'd build one for a product team: maintainable page objects, assertions that derive expectations, and a public report on every run.",
    stats: [
      { value: "38", label: "tests" },
      { value: "11", label: "bugs documented" },
      { value: "6", label: "spec files" },
    ],
    scope: [
      "Login: valid, locked-out, blank, wrong password, whitespace-only username",
      "Cart: add/remove from products and cart pages, persistence across navigation",
      "Checkout: full purchase; item total + 8% tax + grand total add up; required fields",
      "Sorting: all four options produce a correctly ordered, complete list",
      "Users API: get, 404 for a missing user, create, update",
    ],
    approach: [
      "Page Object Model: one class per screen, products found by visible name",
      "Assertions compute expected order and totals from what's on screen instead of snapshots",
      "Money compared in whole cents so tests don't inherit the floating-point bug they caught",
      "No sleeps: the deliberately slow account completes a purchase on auto-waiting alone",
      "Known bugs marked test.fail(): if a bug is fixed, the run goes red so the test gets promoted",
    ],
    bugs: [
      "standard_user: overview shows “Item total: $99.94999999999999”, a floating-point sum displayed without rounding, on the happy path",
      "problem_user: sorting has no effect; typing a last name overwrites the first name, so checkout can never pass",
      "error_user: “Finish” does nothing and the order is never placed; a blank last name passes validation",
      "visual_user: list prices change on every sort while the cart charges the real price",
    ],
    tools: ["Playwright", "TypeScript", "Page Object Model", "GitHub Actions", "GitHub Pages"],
    outcomes: [
      "CI typechecks and runs the suite on every push and pull request",
      "HTML test report published to GitHub Pages from main",
      "Failures appear as inline annotations on pull requests",
    ],
    repoUrl: gh("saucedemo-qa-suite"),
    reportUrl: "https://samin-zaman1.github.io/saucedemo-qa-suite/",
    featured: true,
  },
  {
    slug: "recordguard",
    title: "RecordGuard",
    kind: "Personal",
    category: "TypeScript library · Data validation",
    summary:
      "A library that loads API data with retries and validates every record at runtime, returning valid and rejected records with reasons instead of crashing. 100% test coverage.",
    context:
      "Data from APIs can't be trusted. Validating a whole array fails the batch on one bad record; filtering hides that upstream is broken. RecordGuard keeps the good records and reports every bad one with its position and reason.",
    stats: [
      { value: "100%", label: "test coverage" },
      { value: "2", label: "Node versions in CI" },
      { value: "0", label: "runtime dependencies" },
    ],
    scope: [
      "Type guards and any Standard Schema validator (Zod, Valibot, ArkType)",
      "Retries with backoff, shouldRetry and AbortSignal cancellation",
      "Typed results inferred from the validator",
    ],
    approach: [
      "Unit tests with fake timers for exact backoff timing, cancellation mid-wait and mid-attempt",
      "Interop tests: a real Zod schema works unmodified, including async refinements",
      "Package test: builds and packs the library, installs the tarball into an empty project and runs it against a failing-then-recovering HTTP server",
      "Type tests with expectTypeOf and @ts-expect-error",
    ],
    tools: ["TypeScript", "Vitest", "Zod", "GitHub Actions"],
    outcomes: [
      "100% coverage with a 90% minimum enforced in CI",
      "Package test on Node 22 and 24 checks what users install, not the source",
      "main only accepts pull requests that pass",
    ],
    repoUrl: gh("recordguard"),
    featured: true,
  },
  {
    slug: "sqa-job-alert",
    title: "SQA Job Alert",
    kind: "Personal",
    category: "Python tool · Automation",
    summary:
      "A tool I built for my own job search: watches Bdjobs, LinkedIn, ~60 company careers pages and remote boards, filters out non-software QA, scores fit against my CV and alerts me to new postings.",
    context:
      "In Bangladesh, “QA” usually means garment or pharma quality control, openings are scattered across many sites, and most remote roles aren't open to Bangladesh. Searching by hand was slow and noisy.",
    stats: [
      { value: "10+", label: "sources twice daily" },
      { value: "~60", label: "careers pages" },
      { value: "~115", label: "filter test cases" },
    ],
    scope: [
      "Bdjobs, LinkedIn jobs and hiring posts, Greenhouse/Lever/Ashby boards, remote job boards",
      "Filtering software-testing roles from quality-control roles",
      "Duplicate detection across sources and reposts",
      "Local web UI to track saved, applied and archived jobs",
    ],
    approach: [
      "Regex title filters backed by a unit-test suite of ~115 real job titles and look-alikes",
      "Fit score against my CV terms (Playwright, TypeScript, API testing rank higher)",
      "Respects robots.txt and LinkedIn rate limits",
    ],
    tools: ["Python", "SQLite", "Playwright", "HTML/JS"],
    outcomes: [
      "Alerts by desktop notification, Telegram or email",
      "Runs on a Windows scheduled task at 9 AM and 9 PM",
    ],
    repoUrl: gh("sqa-job-alert"),
  },
  {
    slug: "learners-hub",
    title: "Learners Hub",
    kind: "Personal",
    category: "Full-stack LMS · Test strategy",
    summary:
      "A learning management system for students, instructors and admins, tested layer by layer from unit tests up to end-to-end browser tests.",
    context:
      "A full-stack LMS (courses, tasks and grading, schedules, announcements, materials) that doubles as a QA project, with a written test strategy, coverage and defects log.",
    scope: [
      "NestJS API with Prisma and PostgreSQL, JWT auth",
      "Next.js web app with MUI and TanStack Query",
      "Student, instructor and admin roles",
    ],
    approach: [
      "Unit tests on the API first, run in CI on every push and pull request",
      "TESTING.md documents strategy, techniques used, defects found and next layers",
      "Next: API integration, database and Playwright end-to-end tests",
    ],
    tools: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "GitHub Actions"],
    outcomes: ["Unit tests run on every push and pull request", "Test strategy documented in the repo"],
    repoUrl: gh("learners-hub"),
  },
  {
    slug: "mini-library",
    title: "Mini Library",
    kind: "Personal",
    category: "Testing practice",
    summary:
      "A small library app (sign in, borrow and return books) used to practise testing at three levels: Vitest unit tests, Postgres migrations tested in-memory with PGlite, and Playwright E2E.",
    context:
      "An Express API backed by PGlite with business rules in Postgres functions, rebuilt test-first from the ground up.",
    scope: [
      "Fine calculation rules and input validation",
      "Borrow/return functions that lock rows so two people can't take the last copy",
      "Sign-in with an httpOnly session cookie",
    ],
    approach: [
      "Boundary values for fines: zero days, one day, large values, negative and non-number input",
      "Real Postgres in-process with PGlite; migrations applied and recorded once",
      "API documented in openapi.yaml",
    ],
    tools: ["Vitest", "PGlite", "Playwright", "Express", "GitHub Actions"],
    outcomes: ["Typecheck and tests run on every push and pull request", "Public HTML test report"],
    repoUrl: gh("mini-library"),
    reportUrl: "https://samin-zaman1.github.io/mini-library/",
  },
  {
    slug: "portfolio-e2e-suite",
    title: "This portfolio's test suite",
    kind: "Personal",
    category: "E2E · Accessibility",
    summary:
      "Playwright tests that check every page of this site for broken navigation, missing content and accessibility violations on each push.",
    context:
      "A portfolio about quality should prove its own. The site ships with a suite that runs in GitHub Actions before every deploy.",
    scope: [
      "Navigation on desktop and mobile viewports",
      "Every project page generated from data renders its sections",
      "Unknown URLs return a 404 page",
      "WCAG 2.1 AA checks with axe-core on every page",
      "No console errors; resume PDF is reachable",
    ],
    approach: [
      "Test cases derived from a risk-based test plan (see Test Artifacts)",
      "Data-driven specs: new projects are covered automatically",
      "Role- and label-based locators, which double as an accessibility check",
      "Runs against the static export in Chromium, Firefox, WebKit and a mobile viewport",
    ],
    tools: ["Playwright", "TypeScript", "axe-core", "GitHub Actions"],
    outcomes: ["Deploy to GitHub Pages only happens when every test passes", "HTML report uploaded for every run"],
    repoUrl: gh("portfolio-samin-zaman"),
  },
  {
    slug: "all-things-api",
    title: "All Things API",
    kind: "Professional",
    category: "AI-powered API management platform",
    summary:
      "Tested AI-powered API testing, automated documentation, code generation and rule validation across 25+ sprints at Sense n Respond.",
    context:
      "A SaaS platform for API testing and governance. I owned functional and release testing and wrote its end-user documentation.",
    stats: [{ value: "25+", label: "sprints" }],
    scope: [
      "AI-powered API testing and automated documentation",
      "Code generation and rule validation",
      "REST endpoints against Swagger/OpenAPI specifications",
    ],
    approach: [
      "Translated requirements into test cases and release checks",
      "Tested APIs in Postman with the OpenAPI spec as the source of expected behaviour",
      "Load testing to check behaviour under increased usage",
    ],
    tools: ["Postman", "Swagger/OpenAPI", "Jira"],
    outcomes: [
      "Defects resolved with Engineering before release",
      "End-user and product documentation written for the platform",
    ],
    featured: true,
  },
  {
    slug: "sniffer",
    title: "Sniffer",
    kind: "Professional",
    category: "AI-powered bug reporting SaaS",
    summary:
      "Tested the bug reporting platform and its browser extension: screen recordings, console logs, network activity, Jira integrations and Time Travel.",
    context:
      "A bug reporting product whose browser extension captures what happened before a bug. Time Travel rewinds the last 30 seconds of a session so issues can be reproduced.",
    scope: [
      "Browser extension capture: screen recordings, console logs, network activity",
      "Time Travel: rewinding the previous 30 seconds of a session",
      "Jira integrations and generated bug reports",
    ],
    approach: [
      "Verified captured recordings, logs and network data were preserved correctly in generated reports",
      "Inspected console and network activity in Chrome DevTools",
      "Playwright for automated regression checks",
    ],
    tools: ["Playwright", "Chrome DevTools", "Jira"],
    outcomes: ["Wrote end-user guides and product documentation for the platform"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
