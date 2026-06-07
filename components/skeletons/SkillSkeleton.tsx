export const SkillSkeleton = () => {
  return (
    <div className="relative flex items-center gap-4 px-5 py-5 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-lg min-w-70 overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-primary/5 to-transparent" />

      {/* Icon */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-muted animate-pulse shrink-0" />

      {/* Content */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 rounded bg-muted animate-pulse" />
          <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
        </div>

        <div className="mt-2 h-3 w-24 rounded bg-muted animate-pulse" />

        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-3 w-8 rounded bg-muted animate-pulse" />
          </div>

          <div className="h-2 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
};
