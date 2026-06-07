export const DashboardStats = () => {
  return (
    <div className="rounded-3xl border border-border/50 bg-card/50 px-5 py-8 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-12 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
};
