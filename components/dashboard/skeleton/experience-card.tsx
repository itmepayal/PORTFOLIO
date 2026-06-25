"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ExperienceCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden border border-border bg-card/40 backdrop-blur-sm">
      {/* Corner accents */}
      <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/20" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/20" />

      <div className="flex h-full flex-col gap-6 p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 shrink-0" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>

        {/* Title & Meta */}
        <div>
          <Skeleton className="h-9 w-3/4" />

          <Skeleton className="mt-3 h-4 w-40" />

          <div className="mt-3 flex flex-wrap gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-44" />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>

        {/* Responsibilities & Technologies */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Responsibilities */}
          <div>
            <Skeleton className="mb-3 h-4 w-32" />

            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-[90%]" />
              <Skeleton className="h-10 w-[80%]" />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <Skeleton className="mb-3 h-4 w-28" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-7 w-18" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-4">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardSkeleton;
