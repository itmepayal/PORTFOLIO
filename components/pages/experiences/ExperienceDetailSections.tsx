import { motion } from "framer-motion";
import { DetailSectionHeader } from "@/components/pages/shared/DetailSectionHeader";
import {
  experienceTechIconMap,
  type Experience,
} from "./experience-types";

export const ExperienceDetailTechStack = ({
  experience,
}: {
  experience: Experience;
}) => (
  <section className="bg-surface px-[5%] py-12">
    <div className="mx-auto max-w-300">
      <DetailSectionHeader index="01 — STACK" title="Tech Stack" />
      <div className="flex flex-wrap gap-px border border-border bg-border">
        {experience.technologies.map((tech, i) => {
          const Icon = experienceTechIconMap[tech];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group flex max-w-[calc(50%-1px)] flex-1 basis-37.5 items-center gap-2.5 bg-card px-3.5 py-3 transition-colors duration-200 hover:bg-card-h sm:max-w-[calc(20%-1px)]"
            >
              <div className="flex size-7 shrink-0 items-center justify-center text-primary">
                {Icon ? (
                  <Icon className="size-4" />
                ) : (
                  <span className="font-mono text-[0.6rem] font-bold">
                    {tech.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="truncate font-mono text-[0.72rem] text-dimmed">
                {tech}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export const ExperienceDetailResponsibilities = ({
  experience,
}: {
  experience: Experience;
}) => (
  <section className="px-[5%] py-12">
    <div className="mx-auto max-w-300">
      <DetailSectionHeader
        index="02 — RESPONSIBILITIES"
        title="Key Responsibilities"
      />
      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
        {experience.responsibilities.map((resp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.025 }}
            className="flex items-start gap-3 bg-card px-4 py-4 transition-colors duration-200 hover:bg-card-h"
          >
            <span className="mt-1 shrink-0 font-mono text-[0.7rem] text-primary">
              ▸
            </span>
            <span className="text-[0.85rem] leading-relaxed text-muted-foreground">
              {resp}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
