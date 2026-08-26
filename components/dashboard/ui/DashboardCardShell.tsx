"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  dashboardCardShell,
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  dashboardHoverGlow,
} from "@/lib/ui";

interface DashboardCardShellProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  glowPosition?: "top" | "center";
  cornerSize?: "sm" | "md";
}

export const DashboardCardShell = ({
  children,
  className,
  glowPosition = "top",
  cornerSize = "md",
  ...motionProps
}: DashboardCardShellProps) => {
  const cornerClass =
    cornerSize === "sm"
      ? "h-4 w-4 border-primary/20 group-hover:border-primary/70"
      : undefined;

  return (
    <motion.div
      className={cn(dashboardCardShell, className)}
      {...motionProps}
    >
      <span
        className={cn(dashboardCornerAccentTop, cornerClass)}
      />
      <span
        className={cn(dashboardCornerAccentBottom, cornerClass)}
      />

      <div
        className={cn(dashboardHoverGlow)}
        style={{
          background:
            glowPosition === "center"
              ? "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)"
              : "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      {children}
    </motion.div>
  );
};
