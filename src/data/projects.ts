export type Project = {
  slug: string;
  title: string;
  kind: "Personal" | "Professional";
  summary: string;
  tools: string[];
  repoUrl?: string;
  reportUrl?: string;
  featured?: boolean;
};

const gh = (repo: string) => `https://github.com/Samin-Zaman1/${repo}`;

// Lead with what the testing found; the repos carry the detail.
export const projects: Project[] = [
  {
    slug: "saucedemo-qa-suite",
    title: "SauceDemo QA Suite",
    kind: "Personal",
    summary: "Found 11 defects, including an unrounded total ($99.94999999999999), a checkout that can never finish and prices that change on every sort. Each is kept as an expected-failure test, so CI flags the fix. 38 UI and API tests.",
    tools: ["Playwright", "TypeScript"],
    repoUrl: gh("saucedemo-qa-suite"),
    reportUrl: "https://samin-zaman1.github.io/saucedemo-qa-suite/",
    featured: true,
  },
  {
    slug: "bangla-medical-hall",
    title: "Pharmacy POS",
    kind: "Personal",
    summary: "Testing my own pharmacy app turned up a table the public key could read, password hashes included, and a reports page staff could open by typing the URL. Both fixed. ~300 tests from unit to E2E, with smoke tests and rollback after each deploy.",
    tools: ["Playwright", "Vitest", "PGlite"],
    repoUrl: gh("bangla-medical-hall"),
    featured: true,
  },
  {
    slug: "mini-library",
    title: "Mini Library",
    kind: "Personal",
    summary: "Practice target for layered testing. Unit tests in CI; database and E2E layers in progress.",
    tools: ["Vitest", "GitHub Actions"],
    repoUrl: gh("mini-library"),
  },
  {
    slug: "learners-hub",
    title: "Learners Hub",
    kind: "Personal",
    summary: "An LMS I use as a test target. Found that an expired token returns 403 instead of 401, so the web client never sends the user back to log in. API unit tests in CI; strategy and open defects in TESTING.md.",
    tools: ["Jest", "NestJS", "GitHub Actions"],
    repoUrl: gh("learners-hub"),
    featured: true,
  },
  {
    slug: "sqa-job-alert",
    title: "SQA Job Alert",
    kind: "Personal",
    summary: "Built for my own job search. Most \"QA\" jobs in Bangladesh are garment or pharma quality control, and most remote jobs aren't open to Bangladesh. It checks 10+ sources twice a day and keeps only what I can apply to; ~115 real job titles in unit tests keep the filter honest.",
    tools: ["Python", "unittest"],
    repoUrl: gh("sqa-job-alert"),
    featured: true,
  },
  {
    slug: "all-things-api",
    title: "All Things API",
    kind: "Professional",
    summary: "API management platform. All API testing in Postman: scripted collections checked against OpenAPI specs, load testing, release sign-off.",
    tools: ["Postman", "Swagger/OpenAPI", "Jira"],
  },
  {
    slug: "sniffer",
    title: "Sniffer",
    kind: "Professional",
    summary: "Bug-reporting extension. Verified recordings, console and network capture, Jira sync and Time Travel.",
    tools: ["Playwright", "Chrome DevTools", "Jira"],
  },
];
