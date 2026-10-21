import type { Metadata } from "next";
import { Container, Section, linkStyle } from "@/components/ui";

export const metadata: Metadata = { title: "My Testing Framework" };

const repo = "https://github.com/Samin-Zaman1/saucedemo-qa-suite";

const layers = [
  ["Unit", "Vitest"],
  ["Component", "Testing Library"],
  ["Database", "PGlite"],
  ["API", "Playwright request"],
  ["End to end", "Playwright + axe"],
  ["Smoke", "after deploy, with rollback"],
];

const rules = [
  "Page objects find elements the way a user would.",
  "Fixtures instead of setup code.",
  "Expected values are computed, not hard-coded.",
  "No sleeps.",
  "A known bug stays a failing test until it's fixed.",
];

const snippet = `test.fail(
  'checkout item total is shown to two decimal places',
  bug('Item total shows $99.94999999999999'),
  async ({ inventoryPage, cartPage, checkoutPage }) => {
    // ...add items, check out
    await expect(checkoutPage.subtotal)
      .toHaveText(/^Item total: \\$\\d+\\.\\d{2}$/);
  },
);`;

export default function FrameworkPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">My Testing Framework</h1>
      <p className="mt-3 max-w-xl leading-7 text-muted">
        The structure I start every suite with. The full version is in the{" "}
        <a href={repo} target="_blank" rel="noreferrer" className={`${linkStyle} text-foreground`}>
          reference repo
        </a>
        .
      </p>

      <Section id="layers-heading" title="Layers">
        <ul className="divide-y divide-border border-y border-border text-sm">
          {layers.map(([layer, tool]) => (
            <li key={layer} className="flex justify-between gap-4 py-2.5">
              <span className="font-medium">{layer}</span>
              <span className="text-muted">{tool}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="rules-heading" title="Rules">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 marker:text-muted">
          {rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </Section>

      <Section id="example-heading" title="Example">
        <pre tabIndex={0} aria-label="Example test" className="overflow-x-auto rounded-lg bg-mint p-4 font-mono text-[0.8rem] leading-6">
          <code>{snippet}</code>
        </pre>
        <p className="mt-3 text-sm text-muted">
          Passes while the bug exists. Fails the day it&apos;s fixed, so someone notices.
        </p>
      </Section>
    </Container>
  );
}
