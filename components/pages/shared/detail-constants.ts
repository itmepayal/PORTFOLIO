export const ACCENT_LINES = [
  "linear-gradient(90deg, var(--color-primary), var(--color-accent2))",
  "linear-gradient(90deg, var(--color-cyan), var(--color-primary))",
  "linear-gradient(90deg, var(--color-green), var(--color-cyan))",
  "linear-gradient(90deg, var(--color-orange), #f59e0b)",
  "linear-gradient(90deg, var(--color-accent2), var(--color-orange))",
  "linear-gradient(90deg, #f43f5e, var(--color-orange))",
];

export const CLIP_PATH =
  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)";

export const getAccentLine = (id: string) =>
  ACCENT_LINES[
    Math.abs(id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) %
      ACCENT_LINES.length
  ];
