"use client";

import { HiPlus, HiX } from "react-icons/hi";

type FormChipInputProps = {
  title: string;
  description?: string;

  value: string[];
  inputValue: string;
  setInputValue: (val: string) => void;

  onAdd: () => void;
  onRemove: (item: string) => void;

  placeholder?: string;
};

const FormChipInput = ({
  title,
  description,
  value,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  placeholder = "Add item...",
}: FormChipInputProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full border border-border bg-background px-4 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
        />

        <button
          type="button"
          onClick={onAdd}
          style={{
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
          className="flex h-12 shrink-0 items-center gap-2 bg-linear-to-br from-primary to-secondary-foreground px-6 font-mono text-[0.78rem] tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
        >
          <HiPlus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {value.map((item) => (
          <span
            key={item}
            className="group flex h-10 items-center gap-2 border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
          >
            <span className="text-primary">•</span>
            {item}

            <button
              type="button"
              onClick={() => onRemove(item)}
              aria-label={`Remove ${item}`}
              className="ml-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <HiX className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormChipInput;
