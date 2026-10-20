import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonAnchor, Container, PageHeader, PassMark, Tag } from "@/components/ui";
import { getProject, projects } from "@/data/projects";

// Static export: only the slugs listed here exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function Section({ title, items, tone = "pass" }: { title: string; items: string[]; tone?: "pass" | "bug" }) {
  const id = `${title.toLowerCase().replace(/\W+/g, "-")}-heading`;
  return (
    <section aria-labelledby={id} className="rounded-2xl border border-border bg-surface p-6">
      <h2 id={id} className="text-lg font-bold tracking-tight">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            {tone === "bug" ? (
              <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-danger-soft text-[0.7rem] font-bold text-danger">
                ✕
              </span>
            ) : (
              <PassMark />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <div className="hero-glow">
        <Container>
          <Link href="/projects" className="text-sm font-medium text-muted hover:text-accent-strong">
            ← All projects
          </Link>
          <div className="mt-6">
            <PageHeader eyebrow={`${project.kind} · ${project.category}`} title={project.title} description={project.context} />
          </div>

          {(project.repoUrl || project.reportUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl && (
                <ButtonAnchor href={project.repoUrl} target="_blank" rel="noreferrer">
                  View repository ↗
                </ButtonAnchor>
              )}
              {project.reportUrl && (
                <ButtonAnchor href={project.reportUrl} target="_blank" rel="noreferrer" variant="secondary">
                  Live test report ↗
                </ButtonAnchor>
              )}
            </div>
          )}

          {project.stats && (
            <dl className="mt-10 flex flex-wrap gap-4">
              {project.stats.map((s) => (
                <div key={s.label} className="flex min-w-36 flex-col rounded-2xl border border-border bg-surface/90 px-5 py-4">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="order-first text-3xl font-extrabold tracking-tight text-accent-strong">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </div>

      <Container className="pt-0 sm:pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          <Section title="Scope" items={project.scope} />
          <Section title="Approach" items={project.approach} />
          {project.bugs && (
            <div className="md:col-span-2">
              <Section title="Bugs found" items={project.bugs} tone="bug" />
            </div>
          )}
          <section aria-labelledby="tools-heading" className="rounded-2xl border border-border bg-surface p-6">
            <h2 id="tools-heading" className="text-lg font-bold tracking-tight">
              Tools
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>
          </section>
          <Section title="Outcomes" items={project.outcomes} />
        </div>
      </Container>
    </>
  );
}
