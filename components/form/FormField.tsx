"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
};

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-12
          rounded-2xl
          border-border/60
          bg-background/50
          shadow-sm
          transition-all
          focus-visible:ring-2
          focus-visible:ring-primary/30
          hover:border-primary/40
        "
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;
