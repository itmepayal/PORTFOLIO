"use client";

import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { ModeToggle } from "@/components/common/theme-button";
import { useState } from "react";

const navLinks = [
  { label: "DSA", href: "#dsa" },
  { label: "GitHub", href: "#github-contrib" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "800M+", label: "Requests / Day" },
  { value: "600+", label: "Problems Solved" },
  { value: "12", label: "Projects Built" },
  { value: "3 yrs", label: "Experience" },
];

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between gap-2 border-b border-border bg-background/88 px-4 py-3 backdrop-blur-[18px] sm:gap-4 sm:px-[5%] sm:py-4">
        <div className="shrink-0 whitespace-nowrap bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-[1.2rem] font-bold tracking-tight text-transparent sm:text-[1.4rem]">
          PY.
        </div>

        <ul className="hidden list-none items-center gap-5 min-[900px]:flex lg:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-[0.65rem]">
          <div className="flex h-8 w-8 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-primary sm:h-9 sm:w-9">
            <ModeToggle />
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex flex-col gap-1.25 border-none bg-transparent p-1 min-[900px]:hidden"
          >
            {menuOpen ? (
              <HiX className="size-5 text-muted-foreground sm:size-5.5" />
            ) : (
              <HiMenu className="size-5 text-muted-foreground sm:size-5.5" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed left-0 right-0 top-13.5 z-99 flex flex-col gap-3 border-b border-border bg-background/88 px-4 py-4 backdrop-blur-[18px] sm:top-15.25 sm:gap-4 sm:px-[5%] min-[900px]:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-2 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-muted-foreground last:border-none hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-12 pt-24 text-center sm:px-[5%] sm:pb-16 sm:pt-28"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          }}
        />

        <motion.div
          className="pointer-events-none absolute left-[-10%] top-[10%] h-75 w-75 rounded-full sm:h-100 sm:w-100 lg:h-150 lg:w-150"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-[5%] h-62.5 w-62.5 rounded-full sm:h-85 sm:w-85 lg:h-125 lg:w-125"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-1 mx-auto flex max-w-225 flex-col items-center">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 px-2 text-center font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-chart-3 sm:mb-6 sm:gap-3 sm:text-[0.76rem] sm:tracking-[0.2em]">
            Backend Engineer · MERN Stack · Generative AI
          </div>

          <h1 className="mb-5 text-center text-[clamp(2.1rem,9vw,5.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:mb-6 sm:leading-none">
            Payal Yadav
            <br />
            <span className="bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent">
              Backend Engineer.
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-160 text-center text-sm font-light text-muted-foreground capitalize sm:mb-10 sm:text-base">
            I build scalable backend systems, enterprise-grade APIs, and
            high-performance full-stack applications with a strong focus on
            clean architecture, security, scalability, and production-ready
            engineering.
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="/pdf/PAYAL_YADAV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-block w-full bg-linear-to-br from-primary to-secondary-foreground px-8 py-[0.85rem] text-center font-mono text-[0.78rem] tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85 sm:w-auto sm:text-[0.82rem]"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              ↓ Download Resume
            </a>
            <a
              href="mailto:payal@example.com"
              className="inline-block w-full border border-border px-8 py-[0.85rem] text-center font-mono text-[0.78rem] tracking-[0.05em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:w-auto sm:text-[0.82rem]"
            >
              Hire Me →
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:mt-14 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 sm:pt-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-center text-[1.5rem] font-bold text-transparent sm:text-[1.8rem]">
                  {stat.value}
                </div>
                <div className="mt-1 text-center font-mono text-[0.6rem] uppercase tracking-wide text-muted-foreground sm:text-[0.65rem] sm:tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
