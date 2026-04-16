"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { SKILLS } from "@/constants/skills";

export const Skills = () => {
  return (
    <Section
      id="skills"
      className="relative overflow-hidden space-y-6 mt-5 md:mt-0"
    >
      <BackgroundBlobs />

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
            Skills & Technologies
          </span>
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-3">
        {SKILLS.map((category, index) => {
          const CategoryIcon = category.icon;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative group p-px rounded-2xl bg-transperent
            "
            >
              <div
                className="h-full p-6 rounded-2xl bg-sidebar-primary-foreground backdrop-blur-xl 
              border border-border shadow-lg transition-all duration-300 
              group-hover:shadow-xl group-hover:-translate-y-1"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="text-sm font-semibold text-white/90 tracking-wide">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {category.items.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="group/item relative flex flex-col items-center gap-2 p-3 rounded-xl 
                      bg-transparent border border-border backdrop-blur-md
                        hover:bg-primary/10 hover:border-primary/30
                        transition-all duration-300 cursor-pointer
                        hover:-translate-y-1"
                      >
                        {/* Glow Effect */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 
                        bg-linear-to-br from-primary/20 to-transparent blur-xl transition"
                        />

                        {Icon && (
                          <Icon
                            className="relative w-5 h-5 text-white/70 
                          group-hover/item:text-primary transition"
                          />
                        )}

                        <span
                          className="relative text-[11px] text-white/60 text-center 
                        group-hover/item:text-white"
                        >
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
