"use client";

import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { Badge } from "@/components/ui/badge";
import { RESUME } from "@/constants/resume";

export const Resume = () => {
  return (
    <Section
      id="resume"
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden text-sm"
    >
      <BackgroundBlobs />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-125 h-125 bg-white/10 blur-3xl rounded-full opacity-30" />
      </div>
      <div className="relative  mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Badge className="flex w-fit items-center gap-2 px-5 py-4 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
              <Sparkles className="size-4 text-white/70" />
              <span className="text-white/80">Available in Oppertunity</span>
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            Build. Scale. <span className="text-white/60">Ship Faster.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed"
          >
            I design and develop high-performance backend systems and modern
            full-stack applications with scalability, security, and clean
            architecture at the core.
          </motion.p>
          <div className="flex flex-wrap gap-2 text-xs text-white/60">
            {RESUME.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {tag}
              </span>
            ))}
          </div>{" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden px-7 py-6 text-base rounded-xl bg-white text-black font-medium shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <a href="/resume.pdf" download>
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  <Download className="size-5" />
                  Download Resume
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition duration-500" />
              </a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative p-px rounded-3xl bg-white/10">
            <div className="rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 flex flex-col gap-6">
              <div className="flex justify-between text-xs text-white/50">
                <span>Resume Preview</span>
                <span>PDF • Updated 2026</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-2/3 bg-white/10 rounded" />
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-5/6 bg-white/10 rounded" />
                <div className="h-3 w-3/4 bg-white/10 rounded" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60 text-xs">View full details</span>
                <Download className="size-4 text-white/70" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-white/10" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
