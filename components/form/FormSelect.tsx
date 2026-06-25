"use client";

import { useId } from "react";
import { HiChevronDown } from "react-icons/hi2";

type FormSelectProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
};

const FormSelect = ({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
}: FormSelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <select
          id={id}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-12 w-full appearance-none uppercase border border-border bg-background px-4 pr-10 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
        >
          {!value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option} className="uppercase">
              {option}
            </option>
          ))}
        </select>
        <HiChevronDown className="pointer-events-none absolute right-3.5 size-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default FormSelect;
