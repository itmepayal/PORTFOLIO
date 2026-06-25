"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkillsCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden border border-border bg-card/40 backdrop-blur-sm">
      <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/20" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/20" />

      <div className="flex h-full flex-col gap-6 p-6 md:p-7">
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

        {/* Title & Description */}
        <div>
          <Skeleton className="h-9 w-3/4" />

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>

        {/* Skill Level */}
        <div className="border border-border bg-background/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-1.5 w-full" />
        </div>

        {/* Meta Tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-20" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCardSkeleton;
