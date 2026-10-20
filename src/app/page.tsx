import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { Container, PassMark } from "@/components/ui";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { testCases } from "@/data/artifacts";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Container>
      <section className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {site.role}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            {site.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/projects"
              className="rounded-full bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-85"
            >
              View case studies
            </Link>
            <Link
              href="/artifacts"
              className="rounded-full border border-border px-5 py-3 transition-colors hover:border-foreground"
            >
              See test artifacts
            </Link>
          </div>
        </div>

        <figure className="rounded-xl border border-border bg-surface p-5 font-mono text-sm">
          <figcaption className="text-xs text-muted">
            $ npx playwright test
          </figcaption>
          <ul className="mt-4 space-y-2">
            {testCases.map((tc) => (
              <li key={tc.id} className="flex gap-2">
                <PassMark />
                <span>
                  <span className="text-muted">{tc.id}</span> {tc.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            This site is tested by its own suite.{" "}
            <Link href="/projects/portfolio-e2e-suite" className="underline underline-offset-4 hover:text-foreground">
              How it works
            </Link>
          </p>
        </figure>
      </section>

      <section aria-labelledby="featured-heading" className="mt-20">
        <h2 id="featured-heading" className="text-xl font-semibold tracking-tight">
          Featured work
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
