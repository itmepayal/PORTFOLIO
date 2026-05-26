"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const ProjectCardSkeleton = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="h-full w-full"
    >
      <Card
        className="
          group
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-border/50
          bg-background/80
          shadow-sm
        "
      >
        {/* SHIMMER */}

        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <CardContent className="flex h-full flex-col p-6">
          {/* ====================================================== */}
          {/* TOP */}
          {/* ====================================================== */}

          <div className="flex items-start justify-between gap-4">
            {/* LEFT */}

            <div className="flex-1 space-y-4">
              {/* BADGES */}

              <div className="flex flex-wrap items-center gap-3">
                <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />

                <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />

                <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
              </div>

              {/* TITLE */}

              <div className="space-y-3">
                <div className="h-8 w-2/3 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />

                  <div className="h-4 w-5/6 animate-pulse rounded-lg bg-muted" />

                  <div className="h-4 w-4/6 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 animate-pulse rounded-2xl bg-muted" />

              <div className="h-10 w-10 animate-pulse rounded-2xl bg-muted" />

              <div className="h-10 w-10 animate-pulse rounded-2xl bg-muted" />
            </div>
          </div>

          {/* ====================================================== */}
          {/* CONTENT */}
          {/* ====================================================== */}

          <div className="mt-6 flex flex-1 flex-col justify-between">
            <div className="space-y-6">
              {/* TECH STACK */}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-36 animate-pulse rounded-lg bg-muted" />

                  <div className="h-4 w-24 animate-pulse rounded-lg bg-muted" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-10 w-24 animate-pulse rounded-2xl bg-muted"
                    />
                  ))}
                </div>
              </div>

              {/* FEATURES */}

              <div className="space-y-3">
                <div className="h-5 w-28 animate-pulse rounded-lg bg-muted" />

                <div className="grid gap-2 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-border/40
                        bg-muted/20
                        px-3
                        py-3
                      "
                    >
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />

                      <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="mt-6 flex items-center gap-3 pt-4">
              <div className="h-11 flex-1 animate-pulse rounded-2xl bg-muted" />

              <div className="h-11 flex-1 animate-pulse rounded-2xl bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCardSkeleton;
