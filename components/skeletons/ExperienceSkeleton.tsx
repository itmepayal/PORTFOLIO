export const ExperienceSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-px bg-border border border-border animate-pulse">
      <div className="flex flex-row lg:flex-col overflow-hidden bg-card p-2 sm:p-3 lg:p-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 min-w-30 lg:min-w-0 lg:w-full px-4 py-3 lg:px-5 lg:py-4"
          >
            <div className="h-4 w-24 rounded bg-muted mb-2" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="h-8 w-64 rounded bg-muted" />
          <div className="size-10 sm:size-12 rounded border border-border bg-muted shrink-0" />
        </div>
        <div className="mt-3 mb-6 flex flex-wrap gap-3">
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-muted shrink-0" />
              <div className="flex-1">
                <div className="h-4 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 pt-5 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 rounded border border-border bg-muted"
              />
            ))}
          </div>
        </div>
        <div className="mt-7">
          <div className="h-4 w-40 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};
