"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
  required?: boolean;
};

const FormTextarea = ({
  label,
  value,
  onChange,
  placeholder = "",
  minHeight = "min-h-32",
  className = "",
  required = false,
}: FormTextareaProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          ${minHeight}
          rounded-2xl
          border-border/60
          bg-background/50
          shadow-sm
          transition-all
          focus-visible:ring-2
          focus-visible:ring-primary/30
          hover:border-primary/40
        `}
      />
    </div>
  );
};

export default FormTextarea;
