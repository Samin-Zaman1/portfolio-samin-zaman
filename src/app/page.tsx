import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { ButtonLink, Container, Eyebrow, PassMark, SectionTitle, tints } from "@/components/ui";
import { testCases } from "@/data/artifacts";
import { projects } from "@/data/projects";
import { experience, services, site, stats } from "@/data/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const job = experience[0];

  return (
    <>
      <section className="hero-glow">
        <Container className="grid items-center gap-12 md:grid-cols-[1.35fr_1fr] md:py-24">
          <div>
            <Eyebrow>{site.tagline}</Eyebrow>
            <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-accent-strong">{site.role}</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View projects</ButtonLink>
              <ButtonLink href="/resume" variant="secondary">
                Resume
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">
              📍 {site.location} · <a href={`mailto:${site.email}`} className="font-medium text-accent-strong underline-offset-4 hover:underline">{site.email}</a>
            </p>
          </div>

          <figure className="rounded-2xl border border-border bg-surface/90 p-5 shadow-xl shadow-accent/10 backdrop-blur">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-3 rounded-full bg-peach" />
              <span className="size-3 rounded-full bg-lime" />
              <span className="size-3 rounded-full bg-mint-deep" />
            </div>
            <figcaption className="mt-4 font-mono text-xs text-muted">
              $ npx playwright test
            </figcaption>
            <ul className="mt-3 space-y-2.5 text-sm">
              {testCases.map((tc) => (
                <li key={tc.id} className="flex gap-2.5">
                  <PassMark />
                  <span>
                    <span className="font-mono text-xs text-muted">{tc.id}</span> {tc.title}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-mint px-3 py-2 font-mono text-xs font-semibold text-accent-strong">
              {testCases.length} passed · this site tests itself
            </p>
            <Link href="/artifacts" className="mt-3 inline-block text-xs font-medium text-muted underline underline-offset-4 hover:text-accent-strong">
              See the test plan
            </Link>
          </figure>
        </Container>
      </section>

      <Container className="py-0 sm:py-0">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col rounded-2xl ${tints[i % tints.length]} p-5`}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container>
        <section aria-labelledby="services-heading">
          <SectionTitle id="services-heading">What I do</SectionTitle>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-surface p-6">
                <PassMark />
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-heading" className="mt-20">
          <SectionTitle
            id="featured-heading"
            action={<Link href="/projects" className="text-sm font-semibold text-accent-strong hover:underline">All {projects.length} projects →</Link>}
          >
            Featured work
          </SectionTitle>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} tint={tints[i % tints.length]} />
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading" className="mt-20 rounded-3xl bg-mint p-6 sm:p-10">
          <SectionTitle id="experience-heading">Experience</SectionTitle>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold">
              {job.role} · <span className="text-accent-strong">{job.company}</span>
            </h3>
            <p className="text-sm font-medium text-muted">{job.period}</p>
          </div>
          <p className="text-sm text-muted">{job.detail}</p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {job.points.slice(0, 4).map((p) => (
              <li key={p} className="flex gap-3 rounded-xl bg-surface/80 p-4 text-sm leading-6">
                <PassMark />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/resume" variant="secondary" className="mt-6">
            Full resume
          </ButtonLink>
        </section>
      </Container>
    </>
  );
}
