import { motion } from "framer-motion";
import { IconPointFilled } from "@tabler/icons-react";
import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { EDUCATION } from "@/constants/education";

export const Education = () => {
  return (
    <Section id="education" className="mt-3 md:mt-0">
      <BackgroundBlobs />
      <div className="relative mx-auto px-0 sm:px-6">
        <div className="hidden sm:block absolute left-10 top-0 h-full w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent" />

        <div className="flex flex-col gap-10 sm:gap-12">
          {EDUCATION.map((edu, index) => {
            const isLatest = index === EDUCATION.length - 1;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 group"
              >
                <div className="flex sm:flex-col items-start sm:items-center">
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="relative">
                      {isLatest && (
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      )}

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition
                        ${
                          isLatest
                            ? "bg-primary text-white"
                            : "bg-muted border border-border group-hover:bg-primary/10"
                        }`}
                      >
                        <img
                          src={edu.logo}
                          alt={edu.institute}
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className={`relative w-full rounded-xl p-4 sm:p-5 border transition-all duration-300
                  ${
                    isLatest
                      ? "bg-primary/5 border-primary shadow-lg"
                      : "bg-card border-border hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold">
                        {edu.degree}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {edu.institute}
                      </p>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 sm:items-end">
                      {isLatest && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary text-white rounded-md">
                          Current
                        </span>
                      )}
                      <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {edu.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm mt-3 sm:mt-4 flex gap-2 text-muted-foreground leading-relaxed">
                    <IconPointFilled
                      size={12}
                      className="mt-1 shrink-0 sm:size-3.5"
                    />
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
