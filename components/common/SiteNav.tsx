"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { ModeToggle } from "@/components/common/ThemeToggle";
import { navLink, sectionInner } from "@/lib/ui";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github-contrib" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          sectionInner,
          "fixed inset-x-0 top-0 z-100 flex items-center justify-between gap-2 border-b border-border bg-background/90 py-3 backdrop-blur-xl sm:gap-4 sm:py-4",
        )}
      >
        <a
          href="#hero"
          className="shrink-0 whitespace-nowrap bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-[1.2rem] font-bold tracking-tight text-transparent sm:text-[1.4rem]"
        >
          PY.
        </a>

        <ul className="hidden list-none items-center gap-5 min-[900px]:flex lg:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-border bg-card transition-colors hover:border-primary sm:h-9 sm:w-9">
            <ModeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex border-none bg-transparent p-1 min-[900px]:hidden"
          >
            {menuOpen ? (
              <HiX className="size-5 text-muted-foreground" />
            ) : (
              <HiMenu className="size-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className={cn(
            sectionInner,
            "fixed inset-x-0 top-[3.25rem] z-99 flex flex-col gap-1 border-b border-border bg-background/95 py-3 backdrop-blur-xl sm:top-[3.75rem] min-[900px]:hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/60 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-muted-foreground last:border-none hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
