"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  clipPathButton,
} from "@/lib/ui";

interface SectionEmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  className?: string;
}

export const SectionEmptyState = ({
  icon: Icon,
  title,
  description,
  className,
}: SectionEmptyStateProps) => (
  <div
    className={cn(
      "group relative overflow-hidden border border-border bg-card/40 px-6 py-14 backdrop-blur-sm sm:py-16",
      className,
    )}
  >
    <span className={dashboardCornerAccentTop} />
    <span className={dashboardCornerAccentBottom} />

    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
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

    <div className="relative z-10 flex flex-col items-center text-center">
      <div
        className="flex h-14 w-14 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
        style={{ clipPath: clipPathButton }}
      >
        <Icon className="h-7 w-7" />
      </div>
      <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      {description && (
        <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  </div>
);
