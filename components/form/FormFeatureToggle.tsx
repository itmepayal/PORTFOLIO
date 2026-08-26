"use client";

import { HiStar } from "react-icons/hi";
import { clipPathButton } from "@/lib/ui";

type FormFeatureToggleProps = {
  title: string;
  description?: string;
  value: boolean;
  onChange: (val: boolean) => void;
};

const FormFeatureToggle = ({
  title,
  description,
  value,
  onChange,
}: FormFeatureToggleProps) => {
  return (
    <div className="border border-border bg-card/30 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-[1.05rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onChange(!value)}
          style={value ? { clipPath: clipPathButton } : undefined}
          className={`group relative flex h-12 shrink-0 items-center gap-2 overflow-hidden border px-5 font-mono text-[0.78rem] uppercase tracking-[0.05em] transition-all duration-200 sm:ml-4 ${
            value
              ? "border-primary/40 bg-linear-to-br from-primary to-secondary-foreground text-white hover:-translate-y-0.5 hover:opacity-90"
              : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          <HiStar
            className={`h-4 w-4 transition-all duration-300 ${
              value
                ? "scale-110 fill-current text-yellow-300"
                : "group-hover:rotate-12"
            }`}
          />
          {value ? "Featured" : "Mark as Featured"}
        </button>
      </div>
    </div>
  );
};

export default FormFeatureToggle;
