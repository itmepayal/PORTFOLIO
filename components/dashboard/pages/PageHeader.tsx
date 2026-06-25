"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  backHref?: string;
  backLabel?: string;
  progress?: number;
};

const PageHeader = ({
  title,
  description,
  icon,
  backHref,
  backLabel = "Back",
  progress,
}: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-8 overflow-hidden border border-border bg-card/40 p-6 backdrop-blur-[18px]"
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
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          {backHref && (
            <Link
              href={backHref}
              className="group inline-flex h-11 items-center gap-2 border border-border bg-background px-4 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary"
            >
              <HiArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {backLabel}
            </Link>
          )}
          {icon && (
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
              style={{
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-[1.7rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm font-light text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {typeof progress === "number" && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="mb-2 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-widest">
                <span className="text-muted-foreground">Completion</span>
                <span className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-transparent">
                  {progress}%
                </span>
              </div>
              <div className="h-2 w-52 overflow-hidden border border-border bg-muted">
                <div
                  className="h-full bg-linear-to-r from-primary to-secondary-foreground transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;
