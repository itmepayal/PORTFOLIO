"use client";

import { motion } from "framer-motion";
import { IconPointFilled } from "@tabler/icons-react";
import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { EDUCATION } from "@/constants/education";

export const Education = () => {
  return (
    <Section
      id="education"
      className="py-16 md:py-32 px-4 sm:px-6 md:px-12 relative"
    >
      <BackgroundBlobs />
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 sm:left-5 top-0 h-full w-px bg-border/60 hidden sm:block" />
        <div className="flex flex-col gap-8 md:gap-10">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
            >
              <div className="relative z-10 flex items-center justify-start sm:justify-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center shadow-md overflow-hidden shrink-0">
                  <img
                    src={edu.logo}
                    alt={`${edu.institute} logo`}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 w-full rounded-xl border border-border/60 bg-background/70 backdrop-blur-lg p-4 sm:p-5 hover:shadow-lg transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-snug">
                    {edu.degree}
                  </h3>

                  <span className="text-[11px] sm:text-xs md:text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">
                    {edu.duration}
                  </span>
                </div>

                {/* Institute */}
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {edu.institute}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm mt-3 leading-relaxed flex items-start gap-2 text-muted-foreground">
                  <IconPointFilled
                    size={14}
                    className="mt-1 shrink-0 hidden md:flex"
                  />
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
