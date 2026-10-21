import type { Metadata } from "next";
import { Band, Chip, Container, Section, linkStyle } from "@/components/ui";

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
  "Page Object Model; locators by role and label before test IDs.",
  "Shared setup in fixtures, not beforeEach blocks.",
  "Expected results calculated from the data under test, not hard-coded.",
  "No fixed waits; rely on auto-waiting assertions.",
  "Open defects tracked as expected-failure tests.",
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
    <>
    <Band>
      <h1 className="text-4xl font-extrabold tracking-tight">My Testing Framework</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        How I structure a test suite. The full version is in the{" "}
        <a href={repo} target="_blank" rel="noreferrer" className={`${linkStyle} text-foreground`}>
          reference repo
        </a>
        .
      </p>
    </Band>
    <Container>
      <Section id="layers-heading" title="Layers">
        <ol className="divide-y divide-border border-y border-border">
          {layers.map(([layer, tool], i) => (
            <li key={layer} className="flex items-center gap-4 py-3">
              <span className="font-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-semibold">{layer}</span>
              <Chip>{tool}</Chip>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="rules-heading" title="Rules">
        <ol className="list-decimal space-y-2 pl-5 leading-7 marker:font-semibold marker:text-accent">
          {rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </Section>

      <Section id="example-heading" title="Example">
        <pre tabIndex={0} aria-label="Example test" className="overflow-x-auto rounded-lg bg-foreground p-5 font-mono text-[0.8rem] leading-6 text-mint-strong">
          <code>{snippet}</code>
        </pre>
        <p className="mt-3 text-sm text-muted">
          The test asserts the correct total and is marked <code className="font-mono">test.fail()</code>. CI stays green
          while the defect is open and fails once it&apos;s fixed, so the test gets promoted to a regular regression check.
        </p>
      </Section>
    </Container>
    </>
  );
}
