"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

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
    <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-2xl"
        />

        <Button type="button" onClick={onAdd} className="h-12 rounded-2xl px-6">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {value.map((item) => (
          <span
            key={item}
            className="
              flex items-center gap-2
              h-11
              rounded-2xl
              border border-border/50
              bg-background
              px-4
              text-sm font-medium
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >
            <span className="text-primary">•</span>
            {item}

            <button
              type="button"
              onClick={() => onRemove(item)}
              className="ml-2"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormChipInput;
