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

// One line each. The repos carry the detail.
export const projects: Project[] = [
  {
    slug: "bangla-medical-hall",
    title: "Pharmacy POS",
    kind: "Personal",
    summary: "Point of sale for a real pharmacy. About 300 tests across four layers; a failed smoke test rolls the deploy back.",
    tools: ["Playwright", "Vitest", "PGlite", "Supabase"],
    repoUrl: gh("bangla-medical-hall"),
    featured: true,
  },
  {
    slug: "saucedemo-qa-suite",
    title: "SauceDemo QA Suite",
    kind: "Personal",
    summary: "38 UI and API tests. Eleven bugs kept as failing tests until they're fixed.",
    tools: ["Playwright", "TypeScript"],
    repoUrl: gh("saucedemo-qa-suite"),
    reportUrl: "https://samin-zaman1.github.io/saucedemo-qa-suite/",
    featured: true,
  },
  {
    slug: "recordguard",
    title: "RecordGuard",
    kind: "Personal",
    summary: "Validates API data record by record instead of failing the whole batch.",
    tools: ["TypeScript", "Vitest", "Zod"],
    repoUrl: gh("recordguard"),
    featured: true,
  },
  {
    slug: "sqa-job-alert",
    title: "SQA Job Alert",
    kind: "Personal",
    summary: "Watches job boards and filters software QA roles from factory quality control.",
    tools: ["Python", "SQLite"],
    repoUrl: gh("sqa-job-alert"),
  },
  {
    slug: "learners-hub",
    title: "Learners Hub",
    kind: "Personal",
    summary: "A learning management system, tested from the API up.",
    tools: ["NestJS", "Next.js", "PostgreSQL"],
    repoUrl: gh("learners-hub"),
  },
  {
    slug: "mini-library",
    title: "Mini Library",
    kind: "Personal",
    summary: "Small app for practising unit, database and end-to-end tests.",
    tools: ["Vitest", "PGlite", "Playwright"],
    repoUrl: gh("mini-library"),
  },
  {
    slug: "portfolio-samin-zaman",
    title: "This site",
    kind: "Personal",
    summary: "Playwright and axe run against every page before it deploys.",
    tools: ["Next.js", "Playwright", "axe-core"],
    repoUrl: gh("portfolio-samin-zaman"),
  },
  {
    slug: "all-things-api",
    title: "All Things API",
    kind: "Professional",
    summary: "AI-powered API management platform. API and release testing.",
    tools: ["Postman", "OpenAPI", "Jira"],
  },
  {
    slug: "sniffer",
    title: "Sniffer",
    kind: "Professional",
    summary: "AI bug-reporting tool and browser extension.",
    tools: ["Playwright", "Chrome DevTools", "Jira"],
  },
];
