export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

// TODO: keep only what you actually use, and add what is missing
export const skillGroups: SkillGroup[] = [
  {
    title: "Testing practice",
    description: "How I decide what to test and how deeply.",
    items: [
      "Test planning",
      "Risk-based testing",
      "Functional & regression",
      "Smoke & sanity",
      "Exploratory testing",
      "Cross-browser",
      "UAT support",
    ],
  },
  {
    title: "Test design",
    description: "Techniques for turning requirements into test cases.",
    items: [
      "Boundary value analysis",
      "Equivalence partitioning",
      "Decision tables",
      "State transitions",
      "BDD / Gherkin",
    ],
  },
  {
    title: "Automation",
    description: "UI and end-to-end automation frameworks.",
    items: ["Playwright", "Selenium WebDriver", "Cypress", "Page Object Model"],
  },
  {
    title: "API & performance",
    description: "Testing below the UI.",
    items: ["Postman", "REST APIs", "JSON schema validation", "JMeter", "k6"],
  },
  {
    title: "Tooling & CI",
    description: "Where tests live and how they run.",
    items: ["Jira", "TestRail", "Git", "GitHub Actions", "axe-core"],
  },
  {
    title: "Languages",
    description: "What I write tests in.",
    items: ["TypeScript", "JavaScript", "Java", "Python", "SQL"],
  },
];
