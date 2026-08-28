import { cn } from "@/lib/utils";

export const sectionInner =
  "mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20";

export const sectionPadding =
  "py-10 sm:py-12 md:py-16 lg:py-20";

export const monoLabel =
  "font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground";

export const monoLabelPrimary =
  "font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.15em] text-primary uppercase";

export const monoButton =
  "font-mono text-[0.78rem] tracking-[0.05em] sm:text-[0.82rem]";

export const navLink =
  "whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary";

export const bodySm =
  "text-sm font-light leading-relaxed text-muted-foreground sm:text-[0.92rem]";

export const heroEyebrow =
  "font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-chart-3 sm:text-[0.76rem] sm:tracking-[0.2em]";

export const heroTitle =
  "text-[clamp(2.1rem,9vw,5.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:leading-none";

export const statValue =
  "bg-linear-to-br from-primary to-chart-3 bg-clip-text text-[1.6rem] font-bold text-transparent sm:text-[2rem]";

export const statLabel =
  "font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground sm:text-[0.65rem]";

export const sectionTitle =
  "text-[clamp(1.4rem,5vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em]";

export const dashboardCardShell =
  "group relative overflow-hidden border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60";

export const dashboardCornerAccentTop =
  "pointer-events-none absolute left-0 top-0 z-10 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70";

export const dashboardCornerAccentBottom =
  "pointer-events-none absolute bottom-0 right-0 z-10 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70";

export const dashboardHoverGlow =
  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100";

export const filterButtonActive =
  "border-primary bg-primary text-primary-foreground";

export const filterButtonIdle =
  "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary";

export const sectionGapGrid =
  "grid gap-px border border-border bg-border";

export const clipPathButton =
  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)";

export const clipPathIcon =
  "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)";

export function sectionBackgroundClass(
  background: "default" | "surface" | "secondary" | "card",
): string {
  switch (background) {
    case "surface":
      return "bg-surface";
    case "secondary":
      return "bg-secondary";
    case "card":
      return "bg-card border-y border-border";
    default:
      return "";
  }
}

export function cnUi(...inputs: Parameters<typeof cn>) {
  return cn(...inputs);
}
