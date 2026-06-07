export const ExperienceSkeleton = () => {
  return (
    <div className="relative md:pl-16 lg:pl-20">
      {/* Timeline Icon */}
      <div className="absolute left-0 top-10 hidden size-12 lg:size-14 rounded-2xl border border-border bg-card md:flex items-center justify-center">
        <div className="size-5 rounded bg-muted animate-pulse" />
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-xl">
        <div className="p-6 lg:p-8 animate-pulse">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              {/* Logo */}
              <div className="size-16 rounded-2xl bg-muted shrink-0" />

              <div className="flex-1">
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  <div className="h-7 w-32 rounded-full bg-muted" />
                  <div className="h-7 w-28 rounded-full bg-muted" />
                </div>

                {/* Position */}
                <div className="h-10 w-72 rounded-lg bg-muted mb-3" />

                {/* Company + Location */}
                <div className="flex flex-wrap gap-3">
                  <div className="h-10 w-40 rounded-full bg-muted" />
                  <div className="h-10 w-32 rounded-full bg-muted" />
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="h-12 w-44 rounded-2xl bg-muted" />
          </div>

          {/* Description */}
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-4/5 rounded bg-muted" />
          </div>

          {/* Responsibilities */}
          <div className="mt-8">
            <div className="h-7 w-52 rounded bg-muted mb-4" />

            <div className="grid md:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-background/50 px-4 py-4"
                >
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-8">
            <div className="h-7 w-44 rounded bg-muted mb-4" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
