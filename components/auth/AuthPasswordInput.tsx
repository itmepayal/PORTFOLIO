import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from "react-icons/hi";

type AuthPasswordInputProps = {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
};

export const AuthPasswordInput = ({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
  showPassword,
  onTogglePassword,
}: AuthPasswordInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
    >
      {label}
    </label>
    <div className="relative flex items-center">
      <HiOutlineLockClosed
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
      />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-background px-4 py-3 pl-10 pr-11 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
      />
      <button
        type="button"
        onClick={onTogglePassword}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 text-muted-foreground transition-colors hover:text-primary"
      >
        {showPassword ? (
          <HiOutlineEyeOff className="size-4.5" />
        ) : (
          <HiOutlineEye className="size-4.5" />
        )}
      </button>
    </div>
  </div>
);
