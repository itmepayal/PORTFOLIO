import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { monoLabelPrimary, sectionTitle, bodySm } from "@/lib/ui";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  actions?: ReactNode;
}

export const SectionHeader = ({
  label,
  title,
  subtitle,
  className,
  actions,
}: SectionHeaderProps) => {
  return (
    <div className={cn("reveal mb-8 sm:mb-10", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className={cn("mb-1", monoLabelPrimary)}>{label}</div>
          <h2 className={sectionTitle}>{title}</h2>
          {subtitle && (
            <p className={cn("mt-3 max-w-2xl", bodySm)}>{subtitle}</p>
          )}
        </div>

        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className="mt-6 h-px w-full bg-linear-to-r from-border via-border/50 to-transparent" />
    </div>
  );
};
