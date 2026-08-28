"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { HiArrowDown, HiArrowRight } from "react-icons/hi2";
import { ModeToggle } from "@/components/common/ThemeToggle";
import {
  bodySm,
  clipPathButton,
  dashboardCardShell,
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  dashboardHoverGlow,
  heroEyebrow,
  heroTitle,
  monoButton,
  navLink,
  sectionInner,
  statLabel,
  statValue,
} from "@/lib/ui";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github-contrib" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_STATS = [
  { value: "0", label: "Problems Solved" },
  { value: "0", label: "Projects Built" },
  { value: "0", label: "Skills" },
  { value: "0", label: "Experiences" },
];

const buttonBase = cn(
  monoButton,
  "group inline-flex w-full items-center justify-center gap-2.5 px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto",
);

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    fetch("/api/public/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.stats) return;
        const s = data.stats;
        setStats([
          {
            value: s.problemsSolved > 0 ? `${s.problemsSolved}+` : "0",
            label: "Problems Solved",
          },
          { value: String(s.projects), label: "Projects Built" },
          { value: String(s.skills), label: "Skills" },
          { value: String(s.experiences), label: "Experiences" },
        ]);
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <nav
        className={cn(
          sectionInner,
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 py-3 backdrop-blur-xl sm:py-4",
        )}
      >
        <a
          href="#hero"
          className="bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-xl font-bold text-transparent"
        >
          PY.
        </a>

        <ul className="hidden list-none items-center gap-6 min-[900px]:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center border border-border bg-card hover:border-primary">
            <ModeToggle />
          </div>
          <button
            type="button"
            aria-label="Menu"
            className="min-[900px]:hidden"
            onClick={() => setMenuOpen((open) => !open)}
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
            "fixed inset-x-0 top-14 z-40 border-b border-border bg-background/95 py-3 backdrop-blur-xl min-[900px]:hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 font-mono text-sm uppercase tracking-wide text-muted-foreground hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      <section
        id="hero"
        className={cn(
          sectionInner,
          "relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-12 pt-24 text-center sm:pb-16 sm:pt-28",
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <p className={cn("mb-6", heroEyebrow)}>
            Backend Engineer · MERN Stack · Generative AI
          </p>

          <h1 className={cn("mb-6", heroTitle)}>
            {SITE.name}
            <br />
            <span className="bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent">
              {SITE.title}.
            </span>
          </h1>

          <p className={cn("mb-8 max-w-2xl capitalize sm:mb-10", bodySm)}>
            I build scalable backend systems, enterprise-grade APIs, and
            production-ready full-stack applications with clean architecture and
            strong security.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href={SITE.resumePath}
              download
              className={cn(
                buttonBase,
                "bg-linear-to-br from-primary to-secondary-foreground text-white hover:opacity-90",
              )}
              style={{ clipPath: clipPathButton }}
            >
              <HiArrowDown className="size-3.5" />
              Download Resume
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                buttonBase,
                "border border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
              style={{ clipPath: clipPathButton }}
            >
              Hire Me
              <HiArrowRight className="size-3.5" />
            </a>
          </div>

          <div className="mt-10 grid w-full grid-cols-2 gap-3 border-t border-border pt-8 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  dashboardCardShell,
                  "flex flex-col items-center justify-center px-4 py-5 sm:py-6",
                )}
              >
                <span className={dashboardCornerAccentTop} />
                <span className={dashboardCornerAccentBottom} />
                <span
                  className={dashboardHoverGlow}
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
                  }}
                />
                <div className={statValue}>{stat.value}</div>
                <div className={cn("mt-1.5", statLabel)}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
