"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  dashboardCardShell,
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
} from "@/lib/ui";
import { cn } from "@/lib/utils";

const ProjectCardSkeleton = () => {
  return (
    <div className={cn(dashboardCardShell, "h-full animate-pulse")}>
      <span className={dashboardCornerAccentTop} />
      <span className={dashboardCornerAccentBottom} />

      <div className="relative z-1 flex h-full flex-col gap-6 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-24" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>

        <div>
          <Skeleton className="h-9 w-3/4" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Skeleton className="mb-3 h-3 w-24" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="mb-3 h-3 w-28" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 border border-border bg-background/40 px-3 py-2"
                >
                  <Skeleton className="size-1.5 shrink-0" />
                  <Skeleton className="h-3 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
