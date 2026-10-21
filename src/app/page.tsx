import Link from "next/link";
import { Container, ProjectList, Section, linkStyle } from "@/components/ui";
import { projects } from "@/data/projects";
import { asset, experience, site } from "@/data/site";

export default function Home() {
  const job = experience[0];

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{site.name}</h1>
      <p className="mt-1 text-accent">{site.role}</p>
      <p className="mt-6 max-w-xl leading-7 text-muted">{site.intro}</p>
      <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        <a href={`mailto:${site.email}`} className={linkStyle}>{site.email}</a>
        <a href={site.github} target="_blank" rel="noreferrer" className={linkStyle}>GitHub</a>
        <a href={asset(site.resumePdf)} className={linkStyle}>Resume (PDF)</a>
      </p>

      <Section id="work-heading" title="Selected work">
        <ProjectList items={projects.filter((p) => p.featured)} />
        <p className="mt-4 text-sm">
          <Link href="/projects" className={linkStyle}>All projects</Link>
          <span className="text-muted"> · </span>
          <Link href="/framework" className={linkStyle}>How I test</Link>
        </p>
      </Section>

      <Section id="experience-heading" title="Experience">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-semibold">
            {job.role}, {job.company}
          </p>
          <p className="text-sm text-muted">{job.period}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{job.where}</p>
      </Section>
    </Container>
  );
}
