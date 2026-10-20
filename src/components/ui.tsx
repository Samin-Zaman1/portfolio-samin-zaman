import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

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
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
      )}
    </header>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-strong">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 ${className}`}>
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export function PassMark() {
  return (
    <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-[0.7rem] font-bold text-accent">
      ✓
    </span>
  );
}

export function SectionTitle({ id, children, action }: { id: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {children}
      </h2>
      {action}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent-strong",
  secondary: "border border-border bg-surface text-foreground hover:border-accent hover:text-accent-strong",
};

type ButtonProps = { variant?: keyof typeof buttonStyles; className?: string; children: ReactNode };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${buttonStyles[variant]} ${className}`}
    />
  );
}

export function ButtonAnchor({ variant = "primary", className = "", ...props }: ButtonProps & ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${buttonStyles[variant]} ${className}`}
    />
  );
}

// Pastel tints rotated across cards so the grid feels bright but calm
export const tints = ["bg-mint", "bg-lime", "bg-sky", "bg-peach", "bg-lilac"];
