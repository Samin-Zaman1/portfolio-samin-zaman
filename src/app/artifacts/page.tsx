import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container, PageHeader, PassMark } from "@/components/ui";
import { sampleBug, testCases, testPlan } from "@/data/artifacts";

export const metadata: Metadata = { title: "Test Artifacts" };

function Card({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 leading-7 text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <PassMark />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wider text-accent-strong">{children}</h3>;
}

const priorityStyle = {
  High: "bg-danger-soft text-danger",
  Medium: "bg-peach text-foreground",
  Low: "border border-border text-muted",
};

export default function ArtifactsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Documentation"
        title="Test Artifacts"
        description="The test plan and test cases for this website, plus a real bug report from one of my suites. Each test case below is automated in the repo."
      />

      <Card id="plan-heading" title="Test plan">
        <p className="leading-7">{testPlan.objective}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <Label>In scope</Label>
            <List items={testPlan.inScope} />
          </div>
          <div>
            <Label>Out of scope</Label>
            <ul className="mt-2 space-y-1.5 leading-7 text-muted">
              {testPlan.outOfScope.map((item) => (
                <li key={item}>– {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Environments</Label>
            <List items={testPlan.environments} />
          </div>
          <div>
            <Label>Entry / exit criteria</Label>
            <List items={[...testPlan.entryCriteria, ...testPlan.exitCriteria]} />
          </div>
        </div>
        <div className="mt-6">
          <Label>Risks</Label>
          <div tabIndex={0} aria-label="Risks table" role="region" className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="text-muted">
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-4 font-medium">Risk</th>
                  <th scope="col" className="py-2 font-medium">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {testPlan.risks.map((r) => (
                  <tr key={r.risk} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 align-top">{r.risk}</td>
                    <td className="py-2 align-top text-muted">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card id="cases-heading" title="Test cases">
        <div tabIndex={0} aria-label="Test cases table" role="region" className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="text-muted">
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-4 font-medium">ID</th>
                <th scope="col" className="py-2 pr-4 font-medium">Test case</th>
                <th scope="col" className="py-2 pr-4 font-medium">Expected result</th>
                <th scope="col" className="py-2 pr-4 font-medium">Priority</th>
                <th scope="col" className="py-2 font-medium">Automated in</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((tc) => (
                <tr key={tc.id} className="border-b border-border align-top last:border-0">
                  <td className="py-3 pr-4 font-mono">{tc.id}</td>
                  <td className="py-3 pr-4">
                    <p className="font-medium">{tc.title}</p>
                    <ol className="mt-1 list-decimal pl-4 text-muted">
                      {tc.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </td>
                  <td className="py-3 pr-4 text-muted">{tc.expected}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[tc.priority]}`}>
                      {tc.priority}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-xs text-muted">{tc.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card id="bug-heading" title="Bug report">
        <p className="font-mono text-xs text-muted">
          {sampleBug.id} · found by my{" "}
          <Link href="/projects/saucedemo-qa-suite" className="font-medium text-accent-strong underline underline-offset-4">
            SauceDemo QA suite
          </Link>
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">{sampleBug.title}</h3>
        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[10rem_1fr]">
          <dt className="text-muted">Severity / priority</dt>
          <dd>{sampleBug.severity} / {sampleBug.priority}</dd>
          <dt className="text-muted">Environment</dt>
          <dd>{sampleBug.environment}</dd>
          <dt className="text-muted">Preconditions</dt>
          <dd>{sampleBug.preconditions}</dd>
          <dt className="text-muted">Steps to reproduce</dt>
          <dd>
            <ol className="list-decimal space-y-1 pl-4">
              {sampleBug.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </dd>
          <dt className="text-muted">Expected</dt>
          <dd>{sampleBug.expected}</dd>
          <dt className="text-muted">Actual</dt>
          <dd className="text-danger">{sampleBug.actual}</dd>
          <dt className="text-muted">Notes</dt>
          <dd>{sampleBug.notes}</dd>
        </dl>
      </Card>
    </Container>
  );
}
