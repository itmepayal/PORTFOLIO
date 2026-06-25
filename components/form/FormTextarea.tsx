"use client";

import { useId } from "react";

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
  const id = useId();

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${minHeight} w-full border border-border bg-background px-4 py-3 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary`}
      />
    </div>
  );
};

export default FormTextarea;
