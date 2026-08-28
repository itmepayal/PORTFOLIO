"use client";

import { motion } from "framer-motion";
import { DashboardCardShell } from "@/components/dashboard/ui/DashboardCardShell";
import { statLabel, statValue } from "@/lib/ui";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  index?: number;
  className?: string;
};

export function StatCard({ value, label, index = 0, className }: StatCardProps) {
  return (
    <DashboardCardShell
      glowPosition="center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1 * index,
        ease: "easeOut",
      }}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-5 sm:py-6",
        className,
      )}
    >
      <div className={cn("relative text-center", statValue)}>{value}</div>
      <div className={cn("relative mt-1.5 text-center", statLabel)}>{label}</div>
    </DashboardCardShell>
  );
}
