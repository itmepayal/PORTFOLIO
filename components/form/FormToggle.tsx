"use client";

import { Label } from "@/components/ui/label";

type FormToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const FormToggle = ({
  label,
  description,
  checked,
  onChange,
}: FormToggleProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 cursor-pointer accent-primary"
      />
    </div>
  );
};

export default FormToggle;
