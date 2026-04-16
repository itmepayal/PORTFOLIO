"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { Roles } from "@/components/home/roles";
import { CTAButtons } from "@/components/home/cta-buttons";

export const Home = () => {
  const roles = ["Full-Stack Developer", "Backend Developer", "API Developer"];

  return (
    <Section id="home" className="overflow-hidden">
      {/* Background */}
      <BackgroundBlobs />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Badge
            className="
      inline-flex items-center gap-2
      px-5 py-4

      rounded-full
      border border-border/60

      bg-background/70
      backdrop-blur-xl

      text-foreground

      shadow-sm

      hover:bg-accent/40
      transition-all duration-300
    "
          >
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-medium tracking-wide">
              Introduction
            </span>
          </Badge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="
    text-3xl sm:text-4xl md:text-6xl
    font-semibold
    leading-[1.1]
    tracking-tight
  "
        >
          Hi, I'm{" "}
          <span
            className="
      bg-linear-to-r
      from-primary
      via-chart-2
      to-chart-3
      bg-clip-text
      text-transparent
    "
          >
            Payal Yadav
          </span>
          <br />
          <span
            className="
      block mt-3
      text-muted-foreground
      text-lg sm:text-xl md:text-2xl
      font-medium
    "
          >
            <Roles roles={roles} />
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed"
        >
          I design and develop scalable backend systems and modern full-stack
          applications, focusing on performance, security, and clean
          architecture to deliver reliable and efficient solutions.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <CTAButtons />
        </motion.div>
      </div>

      {/* Subtle bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent" />
    </Section>
  );
};
