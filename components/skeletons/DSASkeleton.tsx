export const DSASkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-border/50 bg-card/80 backdrop-blur-2xl shadow-xl">
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-primary/5 to-transparent" />

      <div className="p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-24 rounded-full bg-muted animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-muted animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-8 w-3/4 rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-1/2 rounded-lg bg-muted animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/50 p-4 space-y-3">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
          </div>

          <div className="rounded-2xl border border-border/50 p-4 space-y-3">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
          </div>

          <div className="h-3 w-full rounded-full bg-muted animate-pulse" />
        </div>

        <div className="border-t border-border/50 pt-5 flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
};
