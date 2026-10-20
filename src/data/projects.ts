export type CaseStudy = {
  slug: string;
  title: string;
  category: "Web" | "API" | "Mobile" | "Performance" | "Automation";
  summary: string;
  context: string;
  scope: string[];
  approach: string[];
  tools: string[];
  outcomes: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

// Add one entry per project. The first entry is real: it describes the test
// suite that ships with this site. The second is a template to copy.
export const projects: CaseStudy[] = [
  {
    slug: "portfolio-e2e-suite",
    title: "End-to-end suite for this portfolio",
    category: "Automation",
    summary:
      "Playwright tests that check every page of this site for broken navigation, missing content and accessibility violations on each push.",
    context:
      "A portfolio about quality should be able to prove its own. This site ships with an automated suite that runs in GitHub Actions, so a regression is caught before it is deployed.",
    scope: [
      "Navigation between every top-level page, on desktop and mobile viewports",
      "Every project page generated from data renders its required sections",
      "Unknown URLs return a proper 404 page",
      "WCAG 2.1 AA checks with axe-core on every page",
      "No console errors during page load",
      "Data integrity: unique slugs and required fields on every project",
    ],
    approach: [
      "Derived test cases from a short risk-based test plan (see Test Artifacts)",
      "Data-driven specs: pages are tested by iterating the same data the site renders, so new projects are covered automatically",
      "Role- and label-based locators instead of CSS selectors, which keeps tests stable and doubles as an accessibility check",
      "Runs against a production build in CI across Chromium, Firefox, WebKit and a mobile viewport",
    ],
    tools: ["Playwright", "TypeScript", "axe-core", "GitHub Actions"],
    outcomes: [
      "Runs on every push and pull request",
      "HTML report uploaded as a CI artifact for each run",
    ],
    repoUrl: "", // TODO: link this repo once it is on GitHub
    featured: true,
  },
  {
    // TODO: replace this template with one of your real projects
    slug: "sample-checkout-regression",
    title: "Checkout regression suite (template)",
    category: "Web",
    summary:
      "Template entry: replace with a real project. Describe the product, what you tested and what changed because of it.",
    context:
      "Who was the product for, what was at risk, and why did it need testing? One or two sentences.",
    scope: [
      "Feature or area you covered",
      "Platforms, browsers or devices",
      "Out of scope, if it matters",
    ],
    approach: [
      "How you designed test cases (boundary values, equivalence classes, exploratory charters...)",
      "What you automated and what stayed manual, and why",
    ],
    tools: ["Selenium", "Java", "TestNG", "Jira"],
    outcomes: [
      "Concrete result, e.g. number of defects found before release",
      "Process change, e.g. regression time cut from days to hours",
    ],
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
