export const PaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2 sm:mt-8 mt-6 animate-pulse">
      {/* Prev Button */}
      <div className="h-10 w-20 rounded-xl bg-muted border border-border" />

      {/* Page Numbers */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-10 rounded-xl bg-muted border border-border"
        />
      ))}

      {/* Next Button */}
      <div className="h-10 w-20 rounded-xl bg-muted border border-border" />
    </div>
  );
};

export const ProjectSkeleton = () => {
  return (
    <div className="group">
      <div className="relative flex flex-col h-full min-h-155 overflow-hidden rounded-4xl border border-border/70 bg-card/70 backdrop-blur-2xl shadow-xl">
        <div className="p-5 sm:p-7 animate-pulse">
          {/* Category */}
          <div className="h-7 w-28 rounded-full bg-muted" />

          {/* Image */}
          <div className="my-6 h-56 w-full rounded-3xl bg-muted" />

          {/* Title */}
          <div className="h-10 w-3/4 rounded-lg bg-muted" />

          {/* Description */}
          <div className="mt-5 space-y-3">
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 w-4/5 rounded bg-muted" />
          </div>

          {/* Tech Stack */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-2xl border border-border bg-muted"
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-2xl border border-border bg-muted"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <div className="h-12 flex-1 rounded-2xl bg-muted" />
            <div className="h-12 w-12 rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
