"use client";

import { motion } from "framer-motion";
import { IconPointFilled } from "@tabler/icons-react";
import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { EDUCATION } from "@/constants/education";

export const Education = () => {
  return (
    <Section id="education">
      <BackgroundBlobs />
      <div className="relative">
        <div className="absolute left-4 sm:left-5 top-0 h-full w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent hidden sm:block" />
        <div className="flex flex-col gap-10">
          {EDUCATION.map((edu, index) => {
            const isLatest = index === EDUCATION.length - 1;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group relative flex flex-col sm:flex-row gap-5 sm:gap-8"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <div className="relative">
                    {isLatest && (
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition ${
                        isLatest
                          ? "bg-primary text-white"
                          : "bg-muted border border-border group-hover:bg-primary/10"
                      }`}
                    >
                      <img
                        src={edu.logo}
                        alt=""
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 rounded-xl p-5 border transition-all duration-300 ${
                    isLatest
                      ? "bg-primary/5 border-primary shadow-lg"
                      : "bg-card border-border hover:shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {edu.institute}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isLatest && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary text-white rounded-md">
                          Current
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {edu.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-4 flex gap-2 text-muted-foreground leading-relaxed">
                    <IconPointFilled size={14} className="mt-1 shrink-0" />
                    {edu.description}
                  </p>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none border border-primary/20" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
