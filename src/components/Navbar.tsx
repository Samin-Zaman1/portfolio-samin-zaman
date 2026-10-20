"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm text-white">
            ✓
          </span>
          {site.name}
        </Link>
        <ul className="flex flex-wrap gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-3.5 py-2 transition-colors ${
                    active
                      ? "bg-mint text-accent-strong"
                      : "text-muted hover:bg-mint/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
