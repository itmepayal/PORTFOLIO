"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { sectionTitle, bodySm } from "@/lib/ui";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  actions?: ReactNode;
  /** Part of the title (a suffix) shown with the hero gradient. Defaults to the last word. */
  accent?: string;
  /** Typed terminal line under the chip. Defaults to "> <title-slug>". Pass false to hide. */
  prompt?: string | false;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const SectionHeader = ({
  label,
  title,
  subtitle,
  className,
  actions,
  accent,
  prompt,
}: SectionHeaderProps) => {
  // "01 — PROJECTS" -> number (dim) + name (bright), like the nav on the home page
  const [num, ...rest] = label.split(/\s*[—–]\s*/);
  const labelName = rest.join(" — ");

  // split the title into plain part + gradient part
  let lead = "";
  let accentText = title;
  if (accent && title.endsWith(accent)) {
    lead = title.slice(0, title.length - accent.length).trimEnd();
    accentText = accent;
  } else {
    const words = title.trim().split(/\s+/);
    if (words.length > 1) {
      accentText = words.pop() as string;
      lead = words.join(" ");
    }
  }

  const promptText = prompt === false ? null : (prompt ?? `${slugify(title)}`);
  const typedLength = promptText ? promptText.length : 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
      className={cn("relative mb-6 sm:mb-8", className)}
    >
      {/* floating hero-style decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      >
        <motion.span
          className="absolute right-[24%] top-1 h-9 w-9 border border-cyan/30"
          animate={{ rotate: [12, 372], y: [0, 8, 0] }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.span
          className="absolute right-[38%] top-10 h-5 w-5 rotate-45 border border-primary/30"
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[30%] top-16 select-none font-mono text-xl text-primary/15"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.span>
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          {/* chip (same look as "OPEN TO WORK") */}
          <motion.div
            variants={fadeLeft}
            className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <div className="relative inline-flex items-center gap-2.5 border-l border-t border-primary/40 bg-linear-to-b from-primary/10 to-transparent py-1.5 pl-3 pr-5">
              {/* nav-style corner brackets: top-left + bottom-right */}
              <span
                aria-hidden
                className="absolute -left-px -top-px h-2 w-2 border-l border-t border-cyan"
              />
              <span
                aria-hidden
                className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-cyan"
              />

              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
              </span>

              {labelName ? (
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] sm:text-[0.7rem]">
                  <span className="mr-2 text-muted-foreground/60">{num}</span>
                  <span className="text-primary">{labelName}</span>
                </span>
              ) : (
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-primary sm:text-[0.7rem]">
                  {label}
                </span>
              )}
            </div>

            {/* typed terminal line (same as "> MERN|") */}
            {promptText && (
              <span className="inline-flex items-center font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cyan sm:text-[0.7rem]">
                <span className="mr-2 opacity-70">&gt;</span>
                <motion.span
                  className="inline-block overflow-hidden whitespace-nowrap"
                  variants={{
                    hidden: { width: 0 },
                    show: {
                      width: `${typedLength * 1.25}ch`,
                      transition: {
                        duration: Math.max(0.6, typedLength * 0.07),
                        delay: 0.5,
                        ease: (t: number) =>
                          Math.floor(t * typedLength) / typedLength,
                      },
                    },
                  }}
                >
                  {promptText}
                </motion.span>
                <motion.span
                  aria-hidden
                  className="ml-0.5 h-3 w-px bg-cyan"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 1],
                  }}
                />
              </span>
            )}
          </motion.div>

          {/* title: plain lead + animated hero gradient on the last word */}
          <motion.h2 variants={titleVariants} className={sectionTitle}>
            {lead && <>{lead} </>}
            <motion.span
              className="inline-block bg-linear-to-r from-primary via-cyan to-primary bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {accentText}
            </motion.span>
          </motion.h2>

          {subtitle && (
            <motion.p
              variants={fadeUp}
              className={cn("mt-3 max-w-2xl", bodySm)}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {actions && (
          <motion.div variants={fadeRight} className="shrink-0">
            {actions}
          </motion.div>
        )}
      </div>

      {/* divider: node + line that draws in + beam travelling along it */}
      <div className="relative mt-5 flex items-center sm:mt-6" aria-hidden>
        <motion.span
          variants={{
            hidden: { scale: 0, rotate: 0 },
            show: {
              scale: 1,
              rotate: 45,
              transition: { duration: 0.4, delay: 0.3, ease: EASE },
            },
          }}
          className="h-1.5 w-1.5 shrink-0 bg-primary shadow-[0_0_10px_var(--color-primary)]"
        />
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: { duration: 1, delay: 0.35, ease: EASE },
            },
          }}
          style={{ originX: 0 }}
          className="relative ml-1 h-px flex-1 overflow-hidden bg-linear-to-r from-primary/60 via-primary/20 to-transparent"
        >
          <motion.span
            className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-cyan to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
