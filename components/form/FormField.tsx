"use client";

import { useId } from "react";

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
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-12 w-full border border-border bg-background px-4 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

export default FormField;
