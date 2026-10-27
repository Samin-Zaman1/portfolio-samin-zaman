import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Project } from "@/data/projects";
import { qaDocs } from "@/data/qa";

const hasQaDoc = (slug: string) => qaDocs.some((d) => d.slug === slug);

export const width = "mx-auto w-full max-w-5xl px-5";

export function Container({ children }: { children: ReactNode }) {
  return <div className={`${width} py-12 sm:py-16`}>{children}</div>;
}

// Header band for the top of a page
export function Band({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-border">
      <div className={`${width} py-12 sm:py-16`}>{children}</div>
    </div>
  );
}

export function Section({
  id,
  title,
  children,
  className = "mt-14 first:mt-0",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="text-xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export const linkStyle = "underline decoration-mint-strong decoration-2 underline-offset-4 hover:decoration-accent hover:text-accent-strong";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted">{children}</span>
  );
}

const buttons = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  outline: "border border-border bg-white text-foreground hover:border-accent hover:text-accent-strong",
};

export function Button({ variant = "primary", className = "", ...props }: { variant?: keyof typeof buttons } & ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${buttons[variant]} ${className}`}
    />
  );
}

export function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((p) => (
        <li
          key={p.slug}
          className="flex flex-col rounded-xl border border-border bg-white p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-bold">
              {hasQaDoc(p.slug) ? (
                <Link href={`/projects/${p.slug}`} className={linkStyle}>
                  {p.title}
                </Link>
              ) : (
                p.title
              )}
            </h3>
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted hover:text-accent-strong">
                Repo<span className="sr-only"> for {p.title}</span> <span aria-hidden>↗</span>
              </a>
            )}
          </div>
          <p className="mt-2 text-[0.95rem] leading-7 text-muted">{p.summary}</p>
          <p className="mt-auto pt-4 text-xs text-muted">
            <span className="sr-only">Tools: </span>
            {p.tools.join(" · ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
