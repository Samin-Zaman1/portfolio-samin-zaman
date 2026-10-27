import type { Metadata } from "next";
import { Band, Container, Section, linkStyle } from "@/components/ui";

export const metadata: Metadata = { title: "My Testing Framework" };

const repo = "https://github.com/Samin-Zaman1/saucedemo-qa-suite";

const layers = [
  ["Unit", "Business rules on their own, such as prices, fines and validation."],
  ["Component", "Single screens and forms, without the rest of the app."],
  ["Database", "Queries and constraints against a real database, not mocks."],
  ["API", "Every endpoint: status, body, schema, auth and error cases."],
  ["End to end", "The main user journeys in a real browser, plus an accessibility scan."],
  ["Smoke", "A quick check of the live site after each deploy; a failure rolls it back."],
];

const usage = [
  "Each page has one page object, so a UI change is fixed in one place.",
  "Shared setup lives in fixtures, so each test reads as just the steps that matter.",
  "Elements are found the way a user finds them: by role and label.",
  "Expected results come from the test data, not hard-coded numbers.",
  "No fixed waits. Tests wait for the app to be ready.",
  "A bug I find stays in the suite as a test expected to fail, until it's fixed.",
];

const where = [
  ["At work", "UI suites in Playwright that I built from scratch, and all API testing in Postman, run before each release."],
  ["Personal projects", "SauceDemo, Pharmacy POS, Learners Hub and Mini Library, each with its test plan and cases on the Projects page."],
  ["In CI", "The suites run in GitHub Actions on each push, so a failing test stops the change."],
];

const steps = [
  ["Understand", "Read the requirements and acceptance criteria, and ask about anything unclear before testing starts."],
  ["Plan", "Decide what's in and out of scope, which layers to test at, and when testing is done."],
  ["Design", "Turn requirements into scenarios and test cases, with positive, negative and edge cases."],
  ["Test", "Run the cases, manually first where it's new, then automate the ones worth repeating."],
  ["Report", "Log each defect with steps, evidence and expected vs actual result, and retest the fix."],
  ["Sign off", "Run regression before release and sign off only when the exit criteria are met."],
];

function Rows({ items }: { items: string[][] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map(([term, text]) => (
        <div key={term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="font-semibold">{term}</dt>
          <dd className="leading-7 text-muted">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function FrameworkPage() {
  return (
    <>
    <Band>
      <h1 className="text-4xl font-extrabold tracking-tight">My Testing Framework</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        How I set up testing for a product, where I use it, and the process I follow. The{" "}
        <a href={repo} target="_blank" rel="noreferrer" className={`${linkStyle} text-foreground`}>
          reference repo
        </a>{" "}
        has it in code.
      </p>
    </Band>
    <Container>
      <Section id="layers-heading" title="What it looks like">
        <p className="mb-5 max-w-2xl leading-7">
          Tests are split into layers. Most checks sit in the fast lower layers; the browser is only used for what a user
          actually does.
        </p>
        <Rows items={layers} />
      </Section>

      <Section id="usage-heading" title="How I use it">
        <ul className="list-disc space-y-2 pl-5 leading-7 marker:text-accent">
          {usage.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </Section>

      <Section id="where-heading" title="Where I use it">
        <Rows items={where} />
      </Section>

      <Section id="process-heading" title="Testing process">
        <ol className="space-y-4">
          {steps.map(([step, text], i) => (
            <li key={step} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="font-mono text-sm leading-7 text-muted">{i + 1}.</span>
              <p className="leading-7">
                <span className="font-semibold">{step}.</span> <span className="text-muted">{text}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </Container>
    </>
  );
}
