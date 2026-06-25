export const DashboardStats = () => {
  return (
    <div className="relative overflow-hidden border border-border bg-card/40 px-5 py-8 animate-pulse">
      {/* Corner Accents */}
      <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-border" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-border" />

      <div className="relative flex items-center justify-between">
        <div>
          {/* Label */}
          <div className="h-3 w-20 rounded bg-muted" />

          {/* Value */}
          <div className="mt-3 h-9 w-14 rounded bg-muted" />
        </div>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center border border-border bg-background">
          <div className="h-5 w-5 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};
