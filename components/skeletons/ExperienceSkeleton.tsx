export const ExperienceSkeleton = () => {
  return (
    <div className="grid grid-cols-1 overflow-hidden border border-border bg-border lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] animate-pulse">
      <div className="flex flex-row overflow-hidden border-b border-border bg-card p-2 sm:p-3 lg:flex-col lg:border-b-0 lg:border-r lg:p-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 min-w-[160px] px-4 py-3 lg:min-w-0 lg:w-full lg:px-3.5 lg:py-3.5"
          >
            <div className="mb-2 h-4 w-24 bg-muted" />
            <div className="h-3 w-20 bg-muted" />
          </div>
        ))}
      </div>
      <div className="bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="h-8 w-64 bg-muted" />
          <div className="size-10 shrink-0 border border-border bg-muted sm:size-12" />
        </div>
        <div className="mt-3 mb-6 flex flex-wrap gap-3">
          <div className="h-4 w-48 bg-muted" />
          <div className="h-4 w-32 bg-muted" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border border-border/50 bg-surface/20 p-3"
            >
              <div className="mt-0.5 size-5 shrink-0 bg-muted" />
              <div className="h-4 flex-1 bg-muted" />
            </div>
          ))}
        </div>
        <div className="mt-7 border-t border-border pt-5">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 border border-border bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
