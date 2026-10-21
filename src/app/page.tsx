import Link from "next/link";
import { Band, Button, Container, ProjectList, Section, linkStyle } from "@/components/ui";
import { projects } from "@/data/projects";
import { asset, education, experience, site } from "@/data/site";

export default function Home() {
  const job = experience[0];

  return (
    <>
      <Band>
        <p className="text-sm font-semibold text-accent-strong">{site.role}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{site.name}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{site.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={`mailto:${site.email}`}>Email me</Button>
          <Button href={asset(site.resumePdf)} variant="outline">Resume (PDF)</Button>
          <Button href={site.github} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>
        </div>
      </Band>

      <Container>
        <Section id="work-heading" title="Selected work">
          <ProjectList items={projects.filter((p) => p.featured)} />
          <p className="mt-5 text-sm font-medium">
            <Link href="/projects" className={linkStyle}>All projects and test docs</Link>
            <span className="mx-2 text-border">|</span>
            <Link href="/framework" className={linkStyle}>How I test</Link>
          </p>
        </Section>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <Section id="experience-heading" title="Experience" className="">
            <p className="font-bold">{job.role}</p>
            <p className="text-sm text-muted">
              {job.company} · {job.where}
            </p>
            <p className="mt-1 font-mono text-xs text-accent-strong">{job.period}</p>
          </Section>
          <Section id="education-heading" title="Education" className="">
            <p className="font-bold">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-accent-strong">{education.period}</p>
          </Section>
        </div>
      </Container>
    </>
  );
}
