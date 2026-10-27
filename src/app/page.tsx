import Link from "next/link";
import { Button, Chip, Container, ProjectList, Section, linkStyle, width } from "@/components/ui";
import { projects } from "@/data/projects";
import { asset, education, experience, highlights, site } from "@/data/site";

// An illustrative Collection Runner result: the kind of checks I script in Postman
const run = [
  { method: "POST", path: "/apis", status: 201, ms: 142, checks: ["creates the API and returns its id", "responds within 800 ms"] },
  { method: "GET", path: "/apis/{{apiId}}", status: 200, ms: 88, checks: ["matches the OpenAPI schema"] },
  { method: "GET", path: "/apis/unknown", status: 404, ms: 61, checks: ["returns a clear error body"] },
];

function PostmanRun() {
  const checks = run.reduce((n, r) => n + r.checks.length, 0);
  return (
    <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground text-white shadow-[0_24px_48px_-24px_rgb(15_34_25/0.5)]">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-white/75">
        <span className="font-semibold text-white">Postman · Collection Runner</span>
        <span>example run</span>
      </figcaption>
      <ul className="space-y-4 px-5 py-5 font-mono text-[0.8rem] leading-6">
        {run.map((r) => (
          <li key={r.path}>
            <p className="flex gap-3">
              <span className="w-10 font-semibold text-mint-strong">{r.method}</span>
              <span className="flex-1 truncate">{r.path}</span>
              <span className="text-white/75">
                {r.status} · {r.ms} ms
              </span>
            </p>
            <ul>
              {r.checks.map((c) => (
                <li key={c} className="pl-[3.25rem] text-white/75">
                  <span aria-hidden className="text-mint-strong">✓ </span>
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="border-t border-white/10 px-5 py-3 font-mono text-xs text-white/75">
        {run.length} requests · {checks} tests passed
      </p>
    </figure>
  );
}

export default function Home() {
  const job = experience[0];

  return (
    <>
      <section aria-labelledby="hero-heading" className="bg-grid border-b border-border bg-surface">
        <div className={`${width} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Open to SQA roles · {site.location}
            </p>
            <h1 id="hero-heading" className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 text-lg font-semibold text-accent-strong">{site.role}</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`}>Email me</Button>
              <Button href={asset(site.resumePdf)} variant="outline">Resume (PDF)</Button>
              <Button href={site.github} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>
            </div>
            <ul aria-label="Core tools" className="mt-8 flex flex-wrap gap-2">
              {site.core.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <PostmanRun />
        </div>
      </section>

      <Container>
        <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              className={`flex flex-col-reverse justify-end gap-1 p-5 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${
                i === 2 ? "sm:border-l" : ""
              } border-border`}
            >
              <dt className="text-sm leading-5 text-muted">{h.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight">{h.value}</dd>
            </div>
          ))}
        </dl>

        <Section id="work-heading" title="Selected work" className="mt-16">
          <ProjectList items={projects.filter((p) => p.featured)} />
          <p className="mt-6 text-sm font-medium">
            <Link href="/projects" className={linkStyle}>All projects and test docs</Link>
            <span className="mx-2 text-border">|</span>
            <Link href="/framework" className={linkStyle}>How I test</Link>
          </p>
        </Section>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <Section id="experience-heading" title="Experience" className="rounded-xl border border-border p-6">
            <p className="font-bold">{job.role}</p>
            <p className="text-sm text-muted">
              {job.company} · {job.where}
            </p>
            <p className="mt-1 font-mono text-xs text-accent-strong">{job.period}</p>
          </Section>
          <Section id="education-heading" title="Education" className="rounded-xl border border-border p-6">
            <p className="font-bold">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-accent-strong">{education.period}</p>
          </Section>
        </div>
      </Container>
    </>
  );
}
