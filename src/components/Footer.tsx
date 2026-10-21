import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-mint">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-between gap-3 px-5 py-6 text-sm text-muted">
        <p>
          <span className="font-semibold text-foreground">{site.name}</span> · {site.location}
        </p>
        <p className="flex gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-accent-strong">Email</a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent-strong">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
