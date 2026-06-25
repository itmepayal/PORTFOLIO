"use client";

import { motion } from "framer-motion";
import { FolderSearch, RefreshCcw, ArrowRight, Sparkles } from "lucide-react";

interface EmptyExperianceProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyExperiance = ({
  title = "No experience found",
  description = "Try adjusting your search, category, or filters to discover matching projects from your collection.",
  onReset,
}: EmptyExperianceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative overflow-hidden border border-border bg-card/40 px-6 py-20 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 sm:px-10"
    >
      <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 12%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="flex h-20 w-20 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
            style={{
              clipPath:
                "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            }}
          >
            <FolderSearch className="h-9 w-9" />
          </div>
          <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center border border-primary/30 bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
        </motion.div>

        <h2 className="mt-8 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl capitalize">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-sm font-light leading-8 text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {onReset && (
            <button
              onClick={onReset}
              className="group/btn inline-flex items-center justify-center gap-2.5 bg-linear-to-br from-primary to-secondary-foreground px-7 py-[0.78rem] font-mono text-[0.75rem] uppercase tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <RefreshCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-180" />
              Reset Filters
            </button>
          )}
          <button className="group/btn inline-flex items-center justify-center gap-2.5 border border-border px-7 py-[0.78rem] font-mono text-[0.75rem] uppercase tracking-[0.05em] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
            Browse Projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {["Modern UI", "Fast Search", "Smart Filters"].map((item) => (
            <span
              key={item}
              className="border border-border bg-background/40 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyExperiance;
