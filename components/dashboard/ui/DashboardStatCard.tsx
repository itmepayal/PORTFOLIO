"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  dashboardHoverGlow,
  clipPathIcon,
} from "@/lib/ui";

interface DashboardStatCardProps {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  growth?: string;
  delay?: number;
  className?: string;
  valueClassName?: string;
  badgeClassName?: string;
}

export const DashboardStatCard = ({
  label,
  value,
  icon: Icon,
  growth,
  delay = 0,
  className,
  valueClassName,
  badgeClassName,
}: DashboardStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden border border-border bg-card/40 px-5 py-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60",
        className,
      )}
    >
      <span className={dashboardCornerAccentTop} />
      <span className={dashboardCornerAccentBottom} />

      <div
        className={dashboardHoverGlow}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white transition-all duration-300 group-hover:scale-105"
          style={{ clipPath: clipPathIcon }}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        {growth && (
          <span
            className={cn(
              "border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-chart-3",
              badgeClassName,
            )}
          >
            {growth}
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <div
          className={cn(
            "mt-2 bg-linear-to-br from-primary to-chart-3 bg-clip-text text-3xl font-bold text-transparent",
            valueClassName,
          )}
        >
          {value}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary to-chart-3 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export const DashboardStatCardSkeleton = ({
  className,
}: {
  className?: string;
}) => (
  <div
    className={cn(
      "relative overflow-hidden border border-border bg-card/40 px-5 py-6 backdrop-blur-sm animate-pulse",
      className,
    )}
  >
    <span className={dashboardCornerAccentTop} />
    <span className={dashboardCornerAccentBottom} />
    <div className="h-44" />
  </div>
);

export const DashboardStatCardGridSkeleton = ({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) => (
  <div className={cn("grid gap-4 md:grid-cols-2 2xl:grid-cols-4", className)}>
    {Array.from({ length: count }).map((_, index) => (
      <DashboardStatCardSkeleton key={index} />
    ))}
  </div>
);
