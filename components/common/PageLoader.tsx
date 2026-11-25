"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Code2, Database, Globe, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const technologies = [
  { icon: Code2, label: "API" },
  { icon: Database, label: "DATABASE" },
  { icon: Globe, label: "REALTIME" },
  { icon: ShieldCheck, label: "SECURITY" },
];

const orbitPositions = [
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

const Corner = ({ className }: { className: string }) => (
  <div
    className={`pointer-events-none absolute size-5 sm:size-7 border-primary/60 ${className}`}
  />
);

export interface PageLoaderProps {
  fullScreen?: boolean;
  label?: string;
  sublabel?: string;
  progress?: number;
  showProgress?: boolean;
  showTechOrbit?: boolean;
  className?: string;
}

export function PageLoader({
  fullScreen = true,
  label = "Loading your experience...",
  sublabel = "INITIALIZING EXPERIENCE",
  progress,
  showProgress = progress !== undefined,
  showTechOrbit = true,
  className,
}: PageLoaderProps) {
  const reduceMotion = useReducedMotion();
  const roundedProgress =
    progress !== undefined
      ? Math.min(100, Math.max(0, Math.round(progress)))
      : undefined;

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    roundedProgress !== undefined
      ? circumference - (roundedProgress / 100) * circumference
      : undefined;

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden bg-background text-foreground select-none",
        fullScreen
          ? "fixed inset-0 z-[99999] px-4 sm:px-6 min-h-screen"
          : "relative w-full py-12 px-4",
        className,
      )}
    >
      {/* Background Grid Pattern */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.06]
          bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
          bg-size-[48px_48px]
          sm:bg-size-[64px_64px]
        "
      />

      {/* Ambient Radial Vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_100%)]
        "
      />

      {/* Ambient Animated Glow Orbs */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.2, 1], opacity: [0.18, 0.4, 0.18] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 sm:h-110 sm:w-110 rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.1, 0.9, 1.1], opacity: [0.15, 0.35, 0.15] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 sm:h-110 sm:w-110 rounded-full bg-chart-2/20 blur-[130px]"
      />

      {/* Subtle Scanning Light Bar */}
      {!reduceMotion && fullScreen && (
        <motion.div
          initial={{ y: "-10vh" }}
          animate={{ y: "110vh" }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            h-px
            bg-linear-to-r
            from-transparent
            via-primary/50
            to-transparent
            shadow-[0_0_16px_var(--color-primary)]
          "
        />
      )}

      {/* HUD Corner Accents */}
      {fullScreen && (
        <div className="pointer-events-none absolute inset-4 sm:inset-8">
          <Corner className="left-0 top-0 border-l-2 border-t-2" />
          <Corner className="right-0 top-0 border-r border-t border-primary/40" />
          <Corner className="bottom-0 left-0 border-b border-l border-primary/40" />
          <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

          <div className="absolute left-1 top-6 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
            SYS // CORE
          </div>
          <div className="absolute bottom-6 right-1 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
            PORTFOLIO // READY
          </div>
        </div>
      )}

      {/* Main Center Content Container */}
      <div className="relative z-10 flex w-full max-w-sm sm:max-w-md flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mb-6
            sm:mb-8
            -skew-x-12
            border
            border-border/80
            bg-card/75
            px-4
            py-1.5
            shadow-xs
            backdrop-blur-md
          "
        >
          <div className="flex skew-x-12 items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-chart-4/70" />
              <span className="relative inline-flex size-2 rounded-full bg-chart-4" />
            </span>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {sublabel}
            </p>
          </div>
        </motion.div>

        {/* Central Hexagon Logo + Circular Progress Ring */}
        <div className="relative flex size-48 sm:size-60 items-center justify-center">
          {/* SVG Circular Ring */}
          <svg
            className="absolute inset-0 size-full -rotate-90 pointer-events-none"
            viewBox="0 0 200 200"
          >
            {/* Track ring */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              className="text-border/40"
              strokeWidth="2.5"
            />
            {/* Dynamic or Indeterminate stroke */}
            {roundedProgress !== undefined ? (
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                  filter: "drop-shadow(0 0 8px var(--color-primary))",
                }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            ) : (
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="90 300"
                className="animate-spin"
                style={{
                  transformOrigin: "center",
                  filter: "drop-shadow(0 0 8px var(--color-primary))",
                }}
              />
            )}
          </svg>

          {/* Orbiting Tech Nodes */}
          {showTechOrbit && (
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 sm:inset-1 pointer-events-none"
            >
              {technologies.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`absolute ${orbitPositions[index]}`}
                  >
                    <motion.div
                      animate={reduceMotion ? undefined : { rotate: -360 }}
                      transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        flex
                        flex-col
                        items-center
                        border
                        border-border/70
                        bg-card/90
                        p-1.5
                        sm:p-2
                        shadow-xs
                        backdrop-blur-md
                      "
                    >
                      <Icon className="size-3 sm:size-3.5 text-primary" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Glowing Core Hexagon with Brand Monogram */}
          <div className="relative flex size-24 sm:size-28 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full overflow-visible"
              fill="none"
            >
              <polygon
                points="50,4 92,27 92,73 50,96 8,73 8,27"
                className="fill-card/85 stroke-border/80"
                strokeWidth="1.2"
              />
              <motion.polygon
                points="50,4 92,27 92,73 50,96 8,73 8,27"
                className="stroke-primary"
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>

            {/* Brand Monogram */}
            <div className="relative flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-linear-to-br from-foreground via-primary to-chart-2 bg-clip-text text-transparent">
                PY
                <span className="text-primary">.</span>
              </span>
              <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-muted-foreground">
                DEV
              </span>
            </div>
          </div>
        </div>

        {/* Title & Brand Name */}
        <div className="mt-6 sm:mt-7 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {SITE.name}
          </h2>
          <p className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-primary">
            &gt; {SITE.title}
          </p>
        </div>

        {/* Optional Progress Bar & Numerical Percentage */}
        {showProgress && roundedProgress !== undefined && (
          <div className="mt-6 sm:mt-7 w-full max-w-[280px] sm:max-w-xs">
            <div className="mb-2 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                LOADING ASSETS
              </span>
              <span className="font-bold tabular-nums text-primary text-sm sm:text-base">
                {String(roundedProgress).padStart(3, "0")}
                <span className="text-xs text-muted-foreground ml-0.5">%</span>
              </span>
            </div>

            {/* Angled Progress Track */}
            <div className="relative h-2 -skew-x-12 overflow-hidden border border-border/80 bg-muted/70">
              <motion.div
                className="
                  absolute
                  inset-y-0
                  left-0
                  bg-linear-to-r
                  from-primary
                  via-chart-3
                  to-chart-2
                  shadow-[0_0_14px_var(--color-primary)]
                "
                style={{ width: `${roundedProgress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />

              {!reduceMotion && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "300%" }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    w-1/3
                    bg-linear-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                  "
                />
              )}
            </div>

            {/* Sub-ticks */}
            <div className="mt-1.5 flex justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-px transition-colors duration-200 ${
                    roundedProgress >= (i + 1) * 11
                      ? "bg-primary"
                      : "bg-border/60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Real-time Status Message */}
        <div className="mt-5 sm:mt-6 flex h-6 items-center justify-center gap-2 font-mono text-[11px] sm:text-xs text-muted-foreground">
          <span className="text-primary font-bold animate-pulse">&gt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="truncate max-w-[240px] sm:max-w-[300px]"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return content;
}

export { PageLoader as default };
