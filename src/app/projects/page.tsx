import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Case studies"
        title="Projects"
        description="What I tested, how I approached it, and what changed as a result."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
