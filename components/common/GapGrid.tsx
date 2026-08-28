import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sectionGapGrid } from "@/lib/ui";

type GapGridProps = {
  children: ReactNode;
  className?: string;
};

export function GapGrid({ children, className }: GapGridProps) {
  return <div className={cn(sectionGapGrid, className)}>{children}</div>;
}
