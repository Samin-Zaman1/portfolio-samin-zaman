import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-6">
        <p>
          <span className="font-semibold text-foreground">{site.name}</span> · {site.role} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-5">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              Email
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">
              GitHub
            </a>
          </li>
          <li>
            <Link href="/resume" className="hover:text-accent">
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
