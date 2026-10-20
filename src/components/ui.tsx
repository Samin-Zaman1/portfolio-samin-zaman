import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
      )}
    </header>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function PassMark() {
  return (
    <span aria-hidden className="font-mono text-accent">
      ✓
    </span>
  );
}
