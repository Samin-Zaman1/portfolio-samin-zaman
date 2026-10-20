import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, PassMark, Tag } from "@/components/ui";
import { getProject, projects } from "@/data/projects";

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

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="mt-3 space-y-2 leading-7 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <PassMark />
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
    <Container>
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← All projects
      </Link>
      <div className="mt-6">
        <PageHeader
          eyebrow={project.category}
          title={project.title}
          description={project.context}
        />
      </div>

      {(project.repoUrl || project.liveUrl) && (
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-foreground px-4 py-2 text-background hover:opacity-85">
              View repository
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 hover:border-foreground">
              Live site
            </a>
          )}
        </div>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Section title="Scope" items={project.scope} />
        <Section title="Approach" items={project.approach} />
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-lg font-semibold tracking-tight">
            Tools
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
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
  );
}
