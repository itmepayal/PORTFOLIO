"use client";

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
    <div className="flex items-center justify-between border border-border bg-background/40 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 font-mono text-[0.64rem] text-muted-foreground">
            {description}
          </p>
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
