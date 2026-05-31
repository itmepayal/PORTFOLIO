"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      className="
        relative
        mb-8
        overflow-hidden
        rounded-4xl
        border
        border-border/50
        bg-background/70
        p-6
        shadow-[0_10px_50px_rgba(0,0,0,0.08)]
        backdrop-blur-xl
      "
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          {/* BACK BUTTON */}
          {backHref && (
            <Link href={backHref}>
              <Button variant="outline" className="h-11 rounded-2xl">
                ← {backLabel}
              </Button>
            </Link>
          )}

          {/* ICON */}
          {icon && (
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

            {description && (
              <p className="mt-1 text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - PROGRESS */}
        {typeof progress === "number" && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-semibold">{progress}%</span>
              </div>

              <div className="h-2 w-52 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
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
