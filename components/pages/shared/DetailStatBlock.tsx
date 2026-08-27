export const DetailStatBlock = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="relative overflow-hidden border border-border bg-card px-5 py-4 transition-colors duration-200 hover:bg-card-h">
    <div className="truncate font-mono text-sm font-medium text-foreground">
      {value}
    </div>
    <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </div>
  </div>
);
