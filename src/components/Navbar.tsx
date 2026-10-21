"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 pt-8 text-sm"
      >
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <ul className="flex gap-5">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "text-accent" : "text-muted hover:text-foreground"}
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
