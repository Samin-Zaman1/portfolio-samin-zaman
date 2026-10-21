// Prefix for files in public/ when the site is served from a sub-path (GitHub Pages).
// next/link adds it automatically; plain <a> URLs need this.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const site = {
  name: "Samin Zaman",
  role: "Software QA Engineer",
  intro:
    "Nearly three years testing SaaS products: Playwright suites in TypeScript, API testing against OpenAPI specs, and release sign-off.",
  location: "Dhaka, Bangladesh",
  email: "saminzaman7@gmail.com",
  github: "https://github.com/Samin-Zaman1",
  resumePdf: "/resume/Samin_Zaman_Resume.pdf",
};

// `heading` is the page's <h1>; tests/navigation.spec.ts checks it after each click
export const navLinks = [
  { href: "/projects", label: "Projects", heading: "Projects" },
  { href: "/framework", label: "Framework", heading: "My Testing Framework" },
  { href: "/resume", label: "Resume", heading: "Resume" },
];

export const experience = [
  {
    role: "Quality Assurance Engineer",
    company: "Sense n Respond LLC",
    where: "Remote, USA",
    period: "2023 – 2026",
    points: [
      "Built two Playwright suites from scratch and ran them in GitHub Actions.",
      "Signed off releases for three SaaS products.",
      "Tested REST APIs against OpenAPI specs across 25+ sprints.",
    ],
  },
];

export const education = {
  degree: "BSc, Computer Science and Engineering",
  school: "North South University",
  period: "2018 – 2023",
};

export const tools = [
  "Playwright", "TypeScript", "Postman", "Swagger/OpenAPI", "Vitest",
  "GitHub Actions", "Jira", "SQL", "Chrome DevTools",
];
