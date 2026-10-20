import Link from "next/link";
import type { CaseStudy } from "@/data/projects";
import { Tag } from "@/components/ui";

export default function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {project.category}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-7 text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
        {project.tools.map((tool) => (
          <li key={tool}>
            <Tag>{tool}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
