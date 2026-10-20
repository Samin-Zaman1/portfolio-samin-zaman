export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

// From the resume and GitHub profile
export const skillGroups: SkillGroup[] = [
  {
    title: "Test automation",
    description: "Suites that catch regressions before users do.",
    items: ["Playwright", "Page Object Model", "Custom fixtures", "Regression suites", "Test framework design", "CI integration"],
  },
  {
    title: "API & performance",
    description: "Testing below the UI.",
    items: ["REST API testing", "Postman", "Swagger/OpenAPI", "Load testing", "Data validation"],
  },
  {
    title: "Manual & functional",
    description: "Turning requirements into the right checks.",
    items: ["Test case design", "Exploratory testing", "Regression testing", "UAT", "Release sign-off"],
  },
  {
    title: "Unit & data layers",
    description: "Testing closer to the code.",
    items: ["Vitest", "Testing Library", "PGlite", "SQL", "Zod"],
  },
  {
    title: "Process",
    description: "How quality fits into delivery.",
    items: ["Test planning", "Test documentation", "Defect lifecycle", "Agile/Scrum", "AI-assisted testing"],
  },
  {
    title: "Tools",
    description: "Everyday toolbox.",
    items: ["TypeScript", "JavaScript", "Git/GitHub", "GitHub Actions", "Chrome DevTools", "Jira", "axe-core"],
  },
];
