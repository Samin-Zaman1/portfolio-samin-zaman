import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-5 pb-10 text-sm text-muted">
      <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-6">
        <p>{site.location}</p>
        <p className="flex gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-accent">Email</a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
