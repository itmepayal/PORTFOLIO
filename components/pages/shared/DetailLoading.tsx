export const DetailLoading = () => (
  <div className="min-h-screen bg-background px-[5%] pb-16 pt-8">
    <div className="mx-auto max-w-300 animate-pulse space-y-6">
      <div className="h-8 w-40 border border-border bg-card" />
      <div className="h-80 w-full border border-border bg-card" />
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-card" />
        ))}
      </div>
      <div className="h-32 border border-border bg-card" />
    </div>
  </div>
);
