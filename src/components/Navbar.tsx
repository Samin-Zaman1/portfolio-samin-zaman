"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-white">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 text-sm"
      >
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span aria-hidden className="size-2.5 rounded-sm bg-accent" />
          {site.name}
        </Link>
        <ul className="flex gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-md px-3 py-1.5 font-medium ${
                    active ? "bg-mint text-accent-strong" : "text-muted hover:text-foreground"
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
