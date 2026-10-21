import type { Metadata } from "next";
import { Container, ProjectList, Section } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-3 text-muted">Test suites, CI and reports are in each repo.</p>

      <Section id="personal-heading" title="On GitHub">
        <ProjectList items={projects.filter((p) => p.kind === "Personal")} />
      </Section>

      <Section id="professional-heading" title="At Sense n Respond">
        <ProjectList items={projects.filter((p) => p.kind === "Professional")} />
      </Section>
    </Container>
  );
}
