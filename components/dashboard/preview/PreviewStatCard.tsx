import type { LucideIcon } from "lucide-react";

type PreviewStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

export const PreviewStatCard = ({ icon: Icon, label, value }: PreviewStatCardProps) => (
  <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
    <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
    <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
    <div className="mb-2 flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
    <div className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
      {value}
    </div>
  </div>
);
