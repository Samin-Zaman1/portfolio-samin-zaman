// Prefix for files in public/ when the site is served from a sub-path (GitHub Pages).
// next/link adds it automatically; plain <a>/<object> URLs need this.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const site = {
  name: "Samin Zaman",
  role: "Software QA Engineer",
  tagline: "Software Quality Assurance · Test Automation · API Testing",
  intro:
    "I make sure software works for the people using it. Nearly 3 years of manual testing, test automation, API testing, regression, UAT and CI/CD across SaaS products, with Playwright and TypeScript as my everyday tools.",
  location: "Dhaka, Bangladesh",
  email: "saminzaman7@gmail.com",
  github: "https://github.com/Samin-Zaman1",
  links: [{ label: "GitHub", href: "https://github.com/Samin-Zaman1" }],
  resumePdf: "/resume/Samin_Zaman_Resume.pdf",
};

// Each page's <h1> must match its label; tests/navigation.spec.ts relies on it
export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/artifacts", label: "Test Artifacts" },
  { href: "/resume", label: "Resume" },
];

export const stats = [
  { value: "~3 yrs", label: "QA experience in SaaS" },
  { value: "3", label: "SaaS products signed off for release" },
  { value: "25+", label: "sprints of REST API testing" },
  { value: "15+", label: "modules with QA docs & checklists" },
];

export const services = [
  {
    title: "Test automation",
    body: "Playwright suites in TypeScript built from scratch, with the Page Object Model, custom fixtures and GitHub Actions CI.",
  },
  {
    title: "API testing",
    body: "REST APIs tested in Postman and Playwright against Swagger/OpenAPI specs, plus load testing under increased usage.",
  },
  {
    title: "Manual & functional",
    body: "Test case design, exploratory and regression testing of new features every sprint, in close loops with Product and Engineering.",
  },
  {
    title: "Release sign-off",
    body: "Acceptance criteria, pre-release regression and UAT, and Jira defects with clear reproduction steps and evidence.",
  },
];

export const experience = [
  {
    role: "Quality Assurance Engineer",
    company: "Sense n Respond LLC",
    detail: "SaaS company · Remote, USA",
    period: "June 2023 – March 2026",
    points: [
      "Built 2 Playwright test suites from scratch in TypeScript using the Page Object Model, automating repetitive manual regression checks and integrating them into GitHub Actions CI/CD.",
      "Performed release sign-off for 3 SaaS products: defining acceptance criteria, validating builds against requirements, and running pre-release regression and UAT.",
      "Tested REST APIs in Postman across 25+ sprints using Swagger/OpenAPI specifications as the reference, and load tested platform behaviour under increased usage.",
      "Tested the browser extension of a bug management platform that captures screen recordings, console logs and network activity, including Time Travel, which rewinds the previous 30 seconds to reproduce issues.",
      "Logged and tracked defects in Jira with clear reproduction steps, expected behaviour and evidence; maintained test documentation and QA checklists across 15+ modules.",
      "Wrote end-user guides and product documentation for the API testing and governance platform and the bug tracking platform.",
    ],
  },
];

export const education = {
  degree: "BSc in Computer Science and Engineering",
  school: "North South University, Dhaka",
  period: "2018 – 2023",
};

export const activities = [
  {
    role: "Event & Content Writing Coordinator",
    org: "IEEE NSU Student Branch & IEEE NSU WIE Affinity Group",
    period: "2018 – 2022",
    points: [
      "Planned and managed events promoting technology and women in engineering across 10+ university programmes.",
      "Managed content writing and coordination across multiple communication channels.",
    ],
  },
];
