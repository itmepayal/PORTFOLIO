import type { LucideIcon } from "lucide-react";

type PreviewStatRowProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

export const PreviewStatRow = ({
  icon: Icon,
  label,
  value,
  valueClassName = "font-semibold text-foreground",
}: PreviewStatRowProps) => (
  <div className="flex items-center justify-between border border-border bg-background/40 p-4">
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
    <span className={valueClassName}>{value}</span>
  </div>
);
