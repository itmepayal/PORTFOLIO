export const SkillSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 md:grid-cols-5 animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 bg-card px-2 py-4 sm:px-3 sm:py-5"
        >
          <div className="h-9 w-9 border border-border bg-muted sm:h-10 sm:w-10" />
          <div className="h-3 w-16 bg-muted" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, dot) => (
              <div key={dot} className="size-1.5 rounded-full bg-muted" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
