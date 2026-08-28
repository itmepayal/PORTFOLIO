import Link from "next/link";
import { cn } from "@/lib/utils";
import { clipPathButton, monoButton } from "@/lib/ui";

type ClipButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
};

export function ClipButton({
  href,
  children,
  variant = "primary",
  className,
  download,
  target,
  rel,
}: ClipButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const classes = cn(
    monoButton,
    "group inline-flex w-full items-center justify-center gap-2.5 px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto",
    variant === "primary"
      ? "bg-linear-to-br from-primary to-secondary-foreground text-white hover:opacity-90"
      : "border border-border text-muted-foreground hover:border-primary hover:text-primary",
    className,
  );

  const style = { clipPath: clipPathButton };

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        download={download}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style} download={download}>
      {children}
    </Link>
  );
}
