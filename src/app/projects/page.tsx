import type { Metadata } from "next";
import { Band, Container, ProjectList, Section } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Band>
        <h1 className="text-4xl font-extrabold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
          Open a project for its requirements, test plan, scenarios and test cases. The suites and CI are in each repo.
        </p>
      </Band>
      <Container>
        <Section id="personal-heading" title="On GitHub">
          <ProjectList items={projects.filter((p) => p.kind === "Personal")} />
        </Section>
        <Section id="professional-heading" title="At work">
          <ProjectList items={projects.filter((p) => p.kind === "Professional")} />
        </Section>
      </Container>
    </>
  );
}
