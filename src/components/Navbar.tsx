"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";

// same as `width` in ui.tsx; not imported, so the client bundle doesn't pull in the QA data
const width = "mx-auto w-full max-w-5xl px-5";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
      <nav aria-label="Main" className={`${width} flex items-center justify-between gap-4 py-3 text-sm`}>
        <ul className="-ml-3 flex flex-wrap gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-md px-3 py-1.5 font-medium transition-colors ${
                    active ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-md border border-border px-3 py-1.5 font-medium transition-colors hover:border-accent hover:text-accent-strong sm:block"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
