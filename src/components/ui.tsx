import type { ReactNode } from "react";
import type { Project } from "@/data/projects";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-2xl px-5 py-14 sm:py-20">{children}</div>;
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <h2 id={id} className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export const linkStyle = "underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent";

export function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((p) => (
        <li key={p.slug} className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-semibold">
              {p.repoUrl ? (
                <a href={p.repoUrl} target="_blank" rel="noreferrer" className={linkStyle}>
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
            <p className="font-mono text-xs text-muted">{p.tools.join(" · ")}</p>
          </div>
          <p className="mt-1.5 text-sm leading-6 text-muted">
            {p.summary}
            {p.reportUrl && (
              <>
                {" "}
                <a href={p.reportUrl} target="_blank" rel="noreferrer" className={`${linkStyle} text-foreground`}>
                  Test report
                </a>
              </>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
