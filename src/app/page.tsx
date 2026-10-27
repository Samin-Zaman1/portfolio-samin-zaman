import Link from "next/link";
import { Button, Container, ProjectList, Section, linkStyle, width } from "@/components/ui";
import { projects } from "@/data/projects";
import { about, asset, education, experience, site } from "@/data/site";

export default function Home() {
  const job = experience[0];

  return (
    <>
      <section aria-labelledby="hero-heading" className="border-b border-border">
        <div className={`${width} py-14 sm:py-20`}>
          <h1 id="hero-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 text-lg font-semibold text-accent-strong">{site.role}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>Email me</Button>
            <Button href={asset(site.resumePdf)} variant="outline">Resume (PDF)</Button>
            <Button href={site.github} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>
          </div>
        </div>
      </section>

      <Container>
        <Section id="about-heading" title="How I work">
          <div className="max-w-2xl space-y-4 leading-8">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium">
            <Link href="/framework" className={linkStyle}>How I structure a test suite</Link>
          </p>
        </Section>

        <Section id="work-heading" title="Selected work" className="mt-16">
          <ProjectList items={projects.filter((p) => p.featured)} />
          <p className="mt-6 text-sm font-medium">
            <Link href="/projects" className={linkStyle}>All projects and test docs</Link>
          </p>
        </Section>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <Section id="experience-heading" title="Experience" className="">
            <p className="font-bold">{job.role}</p>
            <p className="text-sm text-muted">{job.where}</p>
            <p className="mt-1 font-mono text-xs text-muted">{job.period}</p>
          </Section>
          <Section id="education-heading" title="Education" className="">
            <p className="font-bold">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
          </Section>
        </div>
      </Container>
    </>
  );
}
