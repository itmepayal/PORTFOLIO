"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="space-y-2 mt-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-12! rounded-2xl w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
