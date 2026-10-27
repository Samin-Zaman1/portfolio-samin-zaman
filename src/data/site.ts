// Prefix for files in public/ when the site is served from a sub-path (GitHub Pages).
// next/link adds it automatically; plain <a> URLs need this.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const site = {
  name: "Samin Zaman",
  role: "Software QA Engineer",
  intro:
    "Nearly three years testing SaaS products: Playwright suites in TypeScript, API testing in Postman against OpenAPI specs, and release sign-off.",
  location: "Dhaka, Bangladesh",
  email: "saminzaman7@gmail.com",
  github: "https://github.com/Samin-Zaman1",
  resumePdf: "/resume/Samin_Zaman_Resume.pdf",
  // shown under the hero intro
  core: ["Postman", "Playwright", "TypeScript", "REST APIs", "Swagger/OpenAPI", "GitHub Actions", "Jira"],
};

// Figures from the CV and the project repos
export const highlights = [
  { value: "~3 yrs", label: "testing SaaS products" },
  { value: "25+", label: "sprints of API testing in Postman" },
  { value: "3", label: "SaaS products signed off for release" },
  { value: "~300", label: "automated tests in Pharmacy POS" },
];

// `heading` is the page's <h1>; tests/navigation.spec.ts checks it after each click
export const navLinks = [
  { href: "/", label: "Home", heading: site.name },
  { href: "/projects", label: "Projects", heading: "Projects" },
  { href: "/framework", label: "Framework", heading: "My Testing Framework" },
  { href: "/resume", label: "Resume", heading: "Resume" },
];

export const experience = [
  {
    role: "Quality Assurance Engineer",
    company: "Sense n Respond LLC",
    where: "Remote, USA",
    period: "Jun 2023 – Mar 2026",
    points: [
      "Built two Playwright suites from scratch in TypeScript with page objects and ran them in GitHub Actions.",
      "Signed off releases for three SaaS products: acceptance criteria, pre-release regression and UAT.",
      "Did all of the team's API testing in Postman across 25+ sprints: collections, environments, scripted assertions and chained requests, checked against OpenAPI specs, plus load testing.",
      "Tested a bug-reporting browser extension: screen recordings, console and network capture, and Time Travel replay.",
      "Logged defects in Jira with reproduction steps and evidence; kept test docs and checklists for 15+ modules.",
    ],
  },
];

// What I used day to day for API testing at Sense n Respond
export const postman = [
  "Collections organised by service, with environments and variables for dev, staging and production.",
  "Pre-request scripts that build test data and fetch auth tokens.",
  "Test scripts with pm.test and pm.expect on status, headers, body and response time.",
  "Chained requests: IDs and tokens saved to variables and reused by the next call.",
  "Responses validated against JSON schemas and the Swagger/OpenAPI spec.",
  "Data-driven runs in the Collection Runner from CSV and JSON files.",
  "Auth with bearer tokens, API keys and OAuth 2.0.",
  "Negative and boundary cases: missing fields, wrong types, bad or expired auth, 4xx and 5xx handling.",
];

export const activities = [
  {
    role: "Event & Content Writing Coordinator",
    org: "IEEE NSU Student Branch & WIE Affinity Group",
    period: "2018 – 2022",
  },
];

export const education = {
  degree: "BSc, Computer Science and Engineering",
  school: "North South University",
  period: "2018 – 2023",
};

export const tools = [
  "Playwright", "TypeScript", "Postman", "Swagger/OpenAPI", "Vitest",
  "Git/GitHub", "GitHub Actions", "Jira", "SQL", "Chrome DevTools",
];
