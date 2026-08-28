"use client";

import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { sectionInner } from "@/lib/ui";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { label: "GitHub", icon: IconBrandGithub, href: SITE.github },
  { label: "LinkedIn", icon: IconBrandLinkedin, href: SITE.linkedin },
] as const;

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-8 sm:py-10">
      <div
        className={cn(
          sectionInner,
          "flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-left">
          <span className="bg-linear-to-br from-primary to-chart-2 bg-clip-text font-sans text-lg font-bold tracking-tight text-transparent">
            {SITE.name}.
          </span>
          <span className="font-mono text-[0.62rem] tracking-wide text-muted-foreground sm:text-[0.68rem]">
            © {new Date().getFullYear()} · Built from scratch
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 border border-border px-2.5 py-1.5 font-mono text-[0.62rem] tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:px-3 sm:text-[0.65rem]"
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.62rem] text-chart-4 sm:text-[0.68rem]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping bg-chart-4 opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-chart-4" />
            </span>
            Open to opportunities
          </div>
        </div>
      </div>
    </footer>
  );
};
