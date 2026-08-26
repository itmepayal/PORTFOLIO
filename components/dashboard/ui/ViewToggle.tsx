"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type ToggleIcon = ComponentType<{ className?: string }>;

interface ViewToggleOption<T extends string> {
  value: T;
  label: string;
  icon: ToggleIcon;
}

interface ViewToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ViewToggleOption<T>[];
  className?: string;
}

export function ViewToggle<T extends string>({
  value,
  onChange,
  options,
  className,
}: ViewToggleProps<T>) {
  return (
    <div
      className={cn(
        "flex shrink-0 overflow-hidden border border-border",
        className,
      )}
    >
      {options.map((option, index) => {
        const isActive = value === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 font-mono text-[0.62rem] tracking-[0.06em] transition-colors sm:px-3 sm:py-2 sm:text-[0.65rem]",
              index < options.length - 1 && "border-r border-border",
              isActive
                ? "bg-primary text-white"
                : "bg-card text-muted-foreground hover:text-primary",
            )}
          >
            <Icon className="text-[0.9rem]" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export type ViewMode = "grid" | "list";
