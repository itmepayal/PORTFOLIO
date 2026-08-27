type PreviewBadgeVariant = "primary" | "muted" | "featured";

const variantClasses: Record<PreviewBadgeVariant, string> = {
  primary: "border-primary/30 bg-primary/10 text-primary",
  muted: "border-border bg-muted text-muted-foreground",
  featured: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
};

type PreviewBadgeProps = {
  children: React.ReactNode;
  variant?: PreviewBadgeVariant;
};

export const PreviewBadge = ({
  children,
  variant = "muted",
}: PreviewBadgeProps) => (
  <span
    className={`border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest ${variantClasses[variant]}`}
  >
    {children}
  </span>
);
