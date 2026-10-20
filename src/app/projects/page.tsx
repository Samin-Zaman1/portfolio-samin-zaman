import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { ButtonAnchor, Container, PageHeader, SectionTitle, tints } from "@/components/ui";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const groups = [
    {
      id: "personal-heading",
      title: "On GitHub",
      note: "Open-source projects. Each one has its test suite and CI in the repo.",
      items: projects.filter((p) => p.kind === "Personal"),
    },
    {
      id: "professional-heading",
      title: "Professional work",
      note: "Products I tested at Sense n Respond LLC.",
      items: projects.filter((p) => p.kind === "Professional"),
    },
  ];

  return (
    <Container>
      <PageHeader
        eyebrow="Case studies"
        title="Projects"
        description="What I tested, how I approached it, and the bugs it caught."
      />
      <ButtonAnchor href={site.github} target="_blank" rel="noreferrer" variant="secondary" className="mt-6">
        github.com/Samin-Zaman1 ↗
      </ButtonAnchor>

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={group.id} className="mt-14">
          <SectionTitle id={group.id}>{group.title}</SectionTitle>
          <p className="mt-1 text-muted">{group.note}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((project, i) => (
              <ProjectCard key={project.slug} project={project} tint={tints[i % tints.length]} />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
