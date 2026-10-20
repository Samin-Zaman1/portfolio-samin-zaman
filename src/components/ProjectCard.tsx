import Link from "next/link";
import type { CaseStudy } from "@/data/projects";
import { Tag } from "@/components/ui";

export default function ProjectCard({ project, tint }: { project: CaseStudy; tint: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
      <div className={`${tint} px-6 pb-4 pt-5`}>
        <div className="flex items-center justify-between gap-3 text-xs font-semibold">
          <span className="text-foreground/80">{project.category}</span>
          <span className="rounded-full bg-surface/80 px-2.5 py-0.5 text-muted">{project.kind}</span>
        </div>
        {project.stats && (
          <dl className="mt-4 flex gap-5">
            {project.stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold tracking-tight">{s.value}</dd>
                <dd aria-hidden className="text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-strong">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools">
          {project.tools.slice(0, 4).map((tool) => (
            <li key={tool}>
              <Tag>{tool}</Tag>
            </li>
          ))}
          {project.tools.length > 4 && (
            <li>
              <Tag>+{project.tools.length - 4}</Tag>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
