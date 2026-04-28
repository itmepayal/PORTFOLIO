"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { SKILLS } from "@/constants/skills";

/* ---------------- ANIMATION CONFIG ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ---------------- COMPONENT ---------------- */

export const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="skills"
      className="relative overflow-hidden space-y-10 mt-5 md:mt-0"
    >
      <BackgroundBlobs />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge
          className="
          inline-flex items-center gap-2
          px-5 py-5
          rounded-full
          border border-border/60
          bg-background/60 backdrop-blur-xl
          text-foreground/80
          shadow-sm
          hover:bg-accent/40
          transition-all duration-300
        "
        >
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-medium tracking-wide">
            Skills & Technologies
          </span>
        </Badge>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
      >
        {SKILLS.map((category) => {
          const CategoryIcon = category.icon;

          return (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="group relative rounded-2xl"
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              {/* CARD */}
              <div
                className="
                relative h-full p-6 rounded-2xl
                bg-background/60 backdrop-blur-xl
                border border-border/70
                shadow-lg

                transition-all duration-300
                group-hover:-translate-y-2
                group-hover:shadow-2xl
              "
              >
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/20 shadow-inner">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground/90 tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* SKILLS */}
                <div className="grid grid-cols-3 gap-4">
                  {category.items.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <motion.a
                        key={skill.name}
                        href={skill.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${skill.name} documentation`}
                        whileHover={reduceMotion ? {} : { scale: 1.05, y: -3 }}
                        className="
                          group/item relative flex flex-col items-center gap-2
                          p-3 rounded-xl
                          border border-border/60
                          bg-background/40 backdrop-blur-md

                          hover:bg-primary/10
                          hover:border-primary/30

                          transition-all duration-300
                          cursor-pointer
                        "
                      >
                        {/* Glow */}
                        <div
                          className="
                          absolute inset-0 rounded-xl
                          opacity-0 group-hover/item:opacity-100
                          bg-gradient-to-br from-primary/20 to-transparent
                          blur-lg transition duration-300
                        "
                        />

                        {/* External Icon */}
                        <span className="absolute top-1 right-1 text-[10px] opacity-0 group-hover/item:opacity-100 transition">
                          ↗
                        </span>

                        {Icon && (
                          <Icon
                            className="
                            relative w-5 h-5
                            text-foreground/60
                            group-hover/item:text-primary
                            transition
                          "
                          />
                        )}

                        <span
                          className="
                          relative text-[11px]
                          text-foreground/60 text-center
                          group-hover/item:text-foreground
                          transition
                        "
                        >
                          {skill.name}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};
