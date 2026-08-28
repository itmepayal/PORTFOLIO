"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <>
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
        className="pointer-events-none absolute left-[-10%] top-[10%] h-75 w-75 sm:h-100 sm:w-100 lg:h-150 lg:w-150"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[5%] h-62.5 w-62.5 sm:h-85 sm:w-85 lg:h-125 lg:w-125"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
