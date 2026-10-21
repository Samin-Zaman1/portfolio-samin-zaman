import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, linkStyle } from "@/components/ui";
import { projects } from "@/data/projects";
import { getQaDoc, qaDocs, type TestCase } from "@/data/qa";

// Static export: only projects with QA documentation get a page
export const dynamicParams = false;

export function generateStaticParams() {
  return qaDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: `${project.title}: test documentation`, description: project.summary } : {};
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </>
  );
}

function Case({ tc, repoUrl }: { tc: TestCase; repoUrl: string }) {
  return (
    <article aria-labelledby={`${tc.id}-title`} className="py-5">
      <p className="font-mono text-xs text-muted">
        {tc.id} · {tc.scenario} · {tc.type}
        {tc.open && <span className="ml-2 rounded bg-[#fdecea] px-1.5 py-0.5 text-[#a1251b]">open defect</span>}
      </p>
      <h3 id={`${tc.id}-title`} className="mt-1 font-semibold">
        {tc.title}
      </h3>
      <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm leading-6 sm:grid-cols-[8.5rem_1fr]">
        <Row label="Precondition">{tc.precondition}</Row>
        {tc.data && <Row label="Test data">{tc.data}</Row>}
        <Row label="Steps">
          <ol className="list-decimal pl-5">
            {tc.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </Row>
        <Row label="Expected">{tc.expected}</Row>
        <Row label="Automated in">
          <a href={`${repoUrl}/blob/main/${tc.file}`} target="_blank" rel="noreferrer" className={`${linkStyle} font-mono text-xs`}>
            {tc.file}
          </a>
        </Row>
      </dl>
    </article>
  );
}

export default async function ProjectQaPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const doc = getQaDoc(slug);
  const project = projects.find((p) => p.slug === slug);
  if (!doc || !project?.repoUrl) notFound();
  const { plan } = doc;

  return (
    <Container>
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← Projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-3 leading-7 text-muted">{project.summary}</p>
      <p className="mt-4 flex gap-5 text-sm font-medium">
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className={linkStyle}>Repository</a>
        {project.reportUrl && (
          <a href={project.reportUrl} target="_blank" rel="noreferrer" className={linkStyle}>Test report</a>
        )}
      </p>

      <Section id="req-heading" title="1 · Requirement analysis">
        <ul className="space-y-2 text-sm leading-6">
          {doc.requirements.map((r) => (
            <li key={r.id} className="grid grid-cols-[2.5rem_1fr]">
              <span className="font-mono text-xs leading-6 text-muted">{r.id}</span>
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="plan-heading" title="2 · Test plan">
        <dl className="grid gap-x-4 gap-y-2 text-sm leading-6 sm:grid-cols-[8.5rem_1fr]">
          <Row label="In scope">{plan.scope.join(", ")}</Row>
          <Row label="Out of scope">{plan.outOfScope.join(", ")}</Row>
          <Row label="Test levels">{plan.levels}</Row>
          <Row label="Environment">{plan.environment}</Row>
          <Row label="Entry criteria">{plan.entry}</Row>
          <Row label="Exit criteria">{plan.exit}</Row>
        </dl>
      </Section>

      <Section id="scenarios-heading" title="3 · Test scenarios">
        <ul className="space-y-2 text-sm leading-6">
          {doc.scenarios.map((s) => (
            <li key={s.id} className="grid grid-cols-[3.5rem_1fr_auto] gap-2">
              <span className="font-mono text-xs leading-6 text-muted">{s.id}</span>
              <span>{s.title}</span>
              <span className="font-mono text-xs leading-6 text-muted">{s.covers.join(", ")}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cases-heading" title="4 · Test cases">
        <div className="divide-y divide-border border-y border-border">
          {doc.cases.map((tc) => (
            <Case key={tc.id} tc={tc} repoUrl={project.repoUrl!} />
          ))}
        </div>
      </Section>

      {doc.defects && (
        <Section id="defects-heading" title="5 · Defects">
          <ul className="space-y-2 text-sm leading-6">
            {doc.defects.map((d) => (
              <li key={d.text} className="grid grid-cols-[3.5rem_1fr] gap-2">
                <span className={`font-mono text-xs leading-6 ${d.status === "Open" ? "text-[#a1251b]" : "text-accent"}`}>
                  {d.status}
                </span>
                <span>{d.text}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </Container>
  );
}
