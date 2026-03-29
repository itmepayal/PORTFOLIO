"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { BackgroundBlobs } from "../backgrounds/background-blobs";

export const Resume = () => {
  return (
    <Section
      id="resume"
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      <BackgroundBlobs />

      <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
        {/* 🔥 Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          Let’s Build Something Great Together
        </motion.h2>

        {/* 🔥 Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed"
        >
          I specialize in building scalable backend systems and modern
          full-stack applications with a strong focus on performance, security,
          and clean architecture. Download my resume to explore my work and
          experience in detail.
        </motion.p>

        {/* Optional credibility line */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xs text-muted-foreground"
        >
          Full Stack Developer • Backend Specialist • API Architect
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="flex items-center gap-2 px-6 py-5 text-base rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <a href="/resume.pdf" download>
              <Download className="size-5" />
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};
