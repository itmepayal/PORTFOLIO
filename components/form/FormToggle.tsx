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
    <div className="flex items-center justify-between gap-4 border border-border bg-background/40 p-4">
      <div className="min-w-0">
        <p className="font-mono text-[0.72rem] uppercase tracking-widest text-foreground">
          {label}
        </p>
        {description && (
          <p className="mt-1 font-mono text-[0.64rem] text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 border transition-colors ${
          checked
            ? "border-primary bg-primary/20"
            : "border-border bg-background"
        }`}
      >
        <span
          className={`absolute top-0.5 block h-5 w-5 bg-primary transition-transform ${
            checked ? "translate-x-[1.35rem]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default FormToggle;
