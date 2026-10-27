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

// One line each, about the testing. The repos carry the detail.
export const projects: Project[] = [
  {
    slug: "saucedemo-qa-suite",
    title: "SauceDemo QA Suite",
    kind: "Personal",
    summary: "38 UI and API tests with page objects and fixtures. 11 defects logged as expected-failure tests.",
    tools: ["Playwright", "TypeScript"],
    repoUrl: gh("saucedemo-qa-suite"),
    reportUrl: "https://samin-zaman1.github.io/saucedemo-qa-suite/",
    featured: true,
  },
  {
    slug: "bangla-medical-hall",
    title: "Pharmacy POS",
    kind: "Personal",
    summary: "~300 tests across unit, component, database and E2E layers. Smoke tests after deploy, rollback on failure.",
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
    summary: "LMS used as a test target. API unit tests in CI; strategy and defects in TESTING.md.",
    tools: ["Jest", "NestJS", "GitHub Actions"],
    repoUrl: gh("learners-hub"),
    featured: true,
  },
  {
    slug: "sqa-job-alert",
    title: "SQA Job Alert",
    kind: "Personal",
    summary: "Built for my own job search: alerts me to new SQA jobs on Bdjobs, LinkedIn, Jobgether and remote boards. Unit tests cover the title filter (~115 real titles), duplicate matching, the experience cap and salary ranking across currencies.",
    tools: ["Python", "unittest"],
    repoUrl: gh("sqa-job-alert"),
    featured: true,
  },
  {
    slug: "portfolio-samin-zaman",
    title: "This site",
    kind: "Personal",
    summary: "Navigation, link and WCAG 2.1 AA checks in four browsers before each deploy.",
    tools: ["Playwright", "axe-core"],
    repoUrl: gh("portfolio-samin-zaman"),
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
