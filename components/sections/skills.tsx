"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { SKILLS } from "@/constants/skills";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const Skills = () => {
  return (
    <Section
      id="skills"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <BackgroundBlobs />
      <div className="py-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="flex w-fit items-center gap-2 px-5 py-4 mb-8 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <Sparkles className="size-4 text-white/70" />
            <span className="text-white/80">My Skills</span>
          </Badge>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SKILLS.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="group relative h-full p-px rounded bg-linear-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300"
              >
                <div className="relative flex flex-col h-full min-h-80 rounded-3xl p-6 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/20 transition overflow-hidden">
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition bg-linear-to-br ${category.color}`}
                  />
                  <div className="flex items-center gap-3 mb-6 relative">
                    <div
                      className={`p-2 bg-linear-to-br ${category.color} shadow-md`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-white/90 tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4 flex-1">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm text-white/70 mb-1">
                          <span>{skill.name}</span>
                          <span className="text-white/60">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full bg-linear-to-r ${category.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute -inset-full rotate-45 bg-white/10 blur-2xl animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};
