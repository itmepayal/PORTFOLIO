"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

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
    <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* BUTTON */}
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange(!value)}
          className={`
            group
            relative
            h-12
            overflow-hidden
            rounded-2xl
            border
            px-5
            font-semibold
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
            ${
              value
                ? `
                    border-primary/30
                    bg-primary
                    text-primary-foreground
                    shadow-lg
                    shadow-primary/20
                    hover:bg-primary/90
                  `
                : `
                    border-border/60
                    bg-background
                    hover:border-primary/40
                    hover:bg-primary/5
                  `
            }
          `}
        >
          {/* TEXT + ICON */}
          <span
            className={`
              relative z-10 flex items-center gap-2
              ${value ? "text-white font-medium" : ""}
            `}
          >
            <Star
              className={`
                h-4 w-4 transition-all duration-300
                ${
                  value
                    ? "fill-current scale-110 text-yellow-400"
                    : "group-hover:rotate-12"
                }
              `}
            />

            {value ? "Featured" : "Mark as Featured"}
          </span>

          {/* HOVER EFFECT */}
          <div
            className={`
              absolute inset-0 opacity-0 transition-opacity duration-300
              group-hover:opacity-100
              ${
                value
                  ? "bg-white/10"
                  : "bg-linear-to-r from-primary/5 to-primary/10"
              }
            `}
          />
        </Button>
      </div>
    </div>
  );
};

export default FormFeatureToggle;
