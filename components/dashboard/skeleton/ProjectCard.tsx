const ProjectCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden border border-border bg-card/40 animate-pulse">
      {/* Corner accents */}
      <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-border" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-border" />

      <div className="flex h-full flex-col gap-6 p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-24 rounded bg-muted" />
            <div className="h-7 w-20 rounded bg-muted" />
            <div className="h-7 w-24 rounded bg-muted" />
          </div>

          <div className="flex gap-2">
            <div className="h-9 w-9 rounded bg-muted" />
            <div className="h-9 w-9 rounded bg-muted" />
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <div className="h-8 w-3/4 rounded bg-muted" />
          <div className="mt-4 space-y-2">
            <div className="h-3 rounded bg-muted" />
            <div className="h-3 rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
          </div>
        </div>

        {/* Tech Stack + Features */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Tech Stack */}
          <div>
            <div className="mb-3 h-3 w-24 rounded bg-muted" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-7 w-20 rounded bg-muted" />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="mb-3 h-3 w-28 rounded bg-muted" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded border border-border bg-muted/50"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="h-12 w-full rounded bg-muted" />
          <div className="h-12 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
