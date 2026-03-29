"use client";

import { AnimatedBlob } from "@/components/backgrounds/animated-blob";

export const BackgroundBlobs = () => {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden">
      <AnimatedBlob
        className="w-75 h-75 md:w-125 md:h-125 bg-primary/20 blur-[120px] -top-30 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <AnimatedBlob
        className="w-62.5 h-62.5 md:w-100 md:h-100 bg-muted/30 blur-[100px] -bottom-30 -right-20"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <AnimatedBlob
        className="w-50 h-50 md:w-75 md:h-75 bg-accent/20 blur-[90px] top-[40%] -left-20"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  );
};
