"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/constants/skills";

export const Skills = () => {
  return (
    <section
      className="
        relative
        overflow-hidden

        py-20
        sm:py-24
        md:py-28
      "
    >
      {/* ================================================================ */}
      {/* CONTAINER */}
      {/* ================================================================ */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          px-4
          sm:px-6
          md:px-10
          lg:px-16
          xl:px-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden"
        >
          {/* ================================================================ */}
          {/* TITLE */}
          {/* ================================================================ */}

          <div className="text-center mb-10 sm:mb-14">
            <p
              className="
                text-primary
                uppercase
                tracking-[0.25em]

                text-[10px]
                sm:text-xs
                md:text-sm
              "
            >
              Tech Stack
            </p>

            <h2
              className="
                mt-3

                text-2xl
                xs:text-3xl
                sm:text-4xl
                md:text-5xl

                font-black
                tracking-[-0.03em]
                leading-tight
              "
            >
              Skills & Technologies
            </h2>

            <p
              className="
                mt-4

                max-w-xs
                xs:max-w-md
                sm:max-w-2xl

                mx-auto

                text-xs
                xs:text-sm
                sm:text-base

                text-muted-foreground
                leading-6
                sm:leading-7
              "
            >
              Technologies and tools I use to build scalable backend systems,
              modern web applications, and enterprise-grade architectures.
            </p>
          </div>

          {/* ================================================================ */}
          {/* LEFT FADE */}
          {/* ================================================================ */}

          <div
            className="
              absolute
              left-0
              top-0

              h-full

              w-8
              sm:w-16
              md:w-24
              lg:w-40

              bg-linear-to-r
              from-background
              to-transparent

              z-10
              pointer-events-none
            "
          />

          {/* ================================================================ */}
          {/* RIGHT FADE */}
          {/* ================================================================ */}

          <div
            className="
              absolute
              right-0
              top-0

              h-full

              w-8
              sm:w-16
              md:w-24
              lg:w-40

              bg-linear-to-l
              from-background
              to-transparent

              z-10
              pointer-events-none
            "
          />

          {/* ================================================================ */}
          {/* SLIDER */}
          {/* ================================================================ */}

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex
              gap-3
              sm:gap-4
              md:gap-5

              min-w-max
            "
          >
            {[...SKILLS, ...SKILLS].map((skill, i) => {
              const Icon = skill.icon;

              return (
                <div
                  key={i}
                  className="
                    flex
                    items-center

                    gap-3
                    sm:gap-4

                    px-4
                    sm:px-5
                    md:px-6

                    py-3
                    sm:py-4

                    rounded-2xl

                    border
                    border-border

                    bg-background/60
                    backdrop-blur-xl

                    min-w-55
                    xs:min-w-[240px]
                    sm:min-w-65

                    hover:border-primary/40
                    hover:bg-primary/5

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                  "
                >
                  {/* ================================================================ */}
                  {/* ICON */}
                  {/* ================================================================ */}

                  <div
                    className="
                      flex
                      items-center
                      justify-center

                      w-10
                      h-10

                      sm:w-11
                      sm:h-11

                      md:w-12
                      md:h-12

                      rounded-xl

                      bg-primary/10
                      text-primary

                      shrink-0
                    "
                  >
                    <Icon
                      className="
                        w-5
                        h-5

                        sm:w-6
                        sm:h-6
                      "
                    />
                  </div>

                  {/* ================================================================ */}
                  {/* CONTENT */}
                  {/* ================================================================ */}

                  <div className="text-left min-w-0">
                    <p
                      className="
                        text-[10px]
                        sm:text-xs

                        text-muted-foreground
                      "
                    >
                      Technology
                    </p>

                    <h3
                      className="
                        font-semibold

                        text-sm
                        sm:text-base

                        truncate
                      "
                    >
                      {skill.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
