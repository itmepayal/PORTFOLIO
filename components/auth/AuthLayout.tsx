import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16 sm:px-[5%]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
      }}
    />

    <motion.div
      className="pointer-events-none absolute left-[-10%] top-[10%] h-75 w-75 rounded-full sm:h-100 sm:w-100 lg:h-125 lg:w-125"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="pointer-events-none absolute bottom-0 right-[5%] h-62.5 w-62.5 rounded-full sm:h-85 sm:w-85 lg:h-100 lg:w-100"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
      }}
      animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-1 w-full max-w-110 border border-border bg-card/60 backdrop-blur-[18px]"
    >
      {children}
    </motion.div>
  </section>
);

export const AuthCardHeader = () => (
  <div className="flex items-center gap-3 border-b border-border px-7 py-5">
    <span className="whitespace-nowrap bg-linear-to-br from-primary to-secondary-foreground bg-clip-text font-mono text-[1.1rem] font-bold tracking-tight text-transparent">
      &lt;PY./&gt;
    </span>

    <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.64rem] tracking-[0.08em] text-muted-foreground">
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-chart-3" />
      All systems operational
    </span>
  </div>
);
