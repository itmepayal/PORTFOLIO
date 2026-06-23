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
      {/* ====================================================== */}
      {/* NAV */}
      {/* ====================================================== */}
      <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between gap-4 border-b border-border bg-background/88 px-[5%] py-4 backdrop-blur-[18px]">
        <div className="shrink-0 whitespace-nowrap bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-[1.4rem] font-bold tracking-tight text-transparent">
          PY.
        </div>

        <ul className="hidden list-none items-center gap-6 md:flex">
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

        <div className="flex shrink-0 items-center gap-[0.65rem]">
          <div className="flex h-9 w-9 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-primary">
            <ModeToggle />
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex flex-col gap-1.25 border-none bg-transparent p-1 md:hidden"
          >
            {menuOpen ? (
              <HiX className="size-5.5 text-muted-foreground" />
            ) : (
              <HiMenu className="size-5.5 text-muted-foreground" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed left-0 right-0 top-15.25 z-99 flex flex-col gap-4 border-b border-border bg-background/88 px-[5%] py-4 backdrop-blur-[18px] md:hidden">
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

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-[5%] pb-16 pt-28 text-center"
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
          className="pointer-events-none absolute left-[-10%] top-[10%] h-150 w-150 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-[5%] h-125 w-125 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-1 mx-auto flex max-w-225 flex-col items-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[0.76rem] uppercase tracking-[0.2em] text-chart-3">
            Backend Engineer · MERN Stack · Generative AI
          </div>

          <h1 className="mb-6 text-center text-[clamp(2.4rem,7vw,5.8rem)] font-bold leading-none tracking-[-0.03em] text-foreground">
            Payal Yadav
            <br />
            <span className="bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent">
              Backend Engineer.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-130 text-center text-base font-light text-muted-foreground">
            I build scalable backend systems, enterprise-grade APIs, and
            high-performance full-stack applications with a strong focus on
            clean architecture, security, scalability, and production-ready
            engineering.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/pdf/PAYAL_YADAV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-block bg-linear-to-br from-primary to-secondary-foreground px-8 py-[0.85rem] font-mono text-[0.82rem] tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              ↓ Download Resume
            </a>
            <a
              href="mailto:payal@example.com"
              className="inline-block border border-border px-8 py-[0.85rem] font-mono text-[0.82rem] tracking-[0.05em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              Hire Me →
            </a>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-8 border-t border-border pt-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-center text-[1.8rem] font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
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
