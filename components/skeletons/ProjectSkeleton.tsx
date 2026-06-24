export const ProjectSkeleton = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden bg-card animate-pulse">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted" />
      <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7">
        <div className="mb-4 h-3 w-24 rounded bg-muted" />
        <div className="mb-3 h-7 w-3/4 rounded bg-muted" />
        <div className="mb-6 space-y-2">
          <div className="h-3 rounded bg-muted" />
          <div className="h-3 rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 rounded border border-border bg-muted"
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-3">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
