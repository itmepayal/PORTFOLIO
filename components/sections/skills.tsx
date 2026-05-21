"use client";

import { motion } from "framer-motion";

import { SKILLS } from "@/constants/skills";

import { Container } from "../common/container";

export const Skills = () => {
  return (
    <Container>
      {/* ================================================================ */}
      {/* SECTION */}
      {/* ================================================================ */}

      <section
        className="
          relative
          py-6
          md:py-10
          overflow-hidden
        "
      >
        {/* ================================================================ */}
        {/* BACKGROUND GLOW */}
        {/* ================================================================ */}

        <div
          className="
            absolute

            top-1/2
            left-1/2

            -translate-x-1/2
            -translate-y-1/2

            w-125
            h-125

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

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
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden"
          >
            {/* ================================================================ */}
            {/* TITLE */}
            {/* ================================================================ */}

            <div className="text-center mb-10 sm:mb-14">
              <p
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-primary/20

                  bg-primary/10

                  px-4
                  py-1.5

                  text-primary

                  uppercase
                  tracking-[0.25em]

                  text-[10px]
                  sm:text-xs
                  md:text-sm

                  font-semibold
                "
              >
                Tech Stack
              </p>

              <h2
                className="
                  mt-5

                  text-3xl
                  xs:text-3xl
                  sm:text-4xl
                  md:text-5xl

                  font-black

                  tracking-[-0.05em]

                  leading-none

                  bg-linear-to-r
                  from-foreground
                  via-primary
                  to-chart-3

                  bg-clip-text
                  text-transparent
                "
              >
                Skills & Technologies
              </h2>

              <p
                className="
                  mt-5

                  max-w-xs
                  xs:max-w-md
                  sm:max-w-2xl
                  lg:max-w-3xl

                  mx-auto

                  text-xs
                  xs:text-sm
                  sm:text-base
                  md:text-lg

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

                w-10
                sm:w-16
                md:w-24
                lg:w-40

                bg-linear-to-r
                from-background
                via-background/90
                to-transparent

                z-20

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

                w-10
                sm:w-16
                md:w-24
                lg:w-40

                bg-linear-to-l
                from-background
                via-background/90
                to-transparent

                z-20

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
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                flex

                gap-4
                sm:gap-5
                md:gap-6

                min-w-max

                py-4
              "
            >
              {[...SKILLS, ...SKILLS].map((skill, i) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={i}
                    className="
                      group

                      relative

                      flex
                      items-center

                      gap-3
                      sm:gap-4

                      px-4
                      sm:px-5
                      md:px-6

                      py-4
                      sm:py-5

                      rounded-3xl

                      border
                      border-border/70

                      bg-card/70

                      backdrop-blur-xl

                      shadow-lg

                      min-w-55
                      xs:min-w-[240px]
                      sm:min-w-65

                      overflow-hidden

                      transition-all
                      duration-500

                      hover:border-primary/40
                      hover:bg-accent/50
                      hover:shadow-primary/10
                      hover:-translate-y-1
                    "
                  >
                    {/* ================================================================ */}
                    {/* HOVER GLOW */}
                    {/* ================================================================ */}

                    <div
                      className="
                        absolute
                        inset-0

                        opacity-0

                        bg-linear-to-r
                        from-primary/5
                        via-chart-3/5
                        to-chart-2/5

                        transition-opacity
                        duration-500

                        group-hover:opacity-100
                      "
                    />

                    {/* ================================================================ */}
                    {/* ICON */}
                    {/* ================================================================ */}

                    <div
                      className="
                        relative
                        z-10

                        flex
                        items-center
                        justify-center

                        w-11
                        h-11

                        sm:w-12
                        sm:h-12

                        md:w-14
                        md:h-14

                        rounded-2xl

                        bg-primary/10

                        text-primary

                        border
                        border-primary/10

                        shrink-0

                        transition-all
                        duration-300

                        group-hover:scale-110
                        group-hover:bg-primary/15
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

                    <div className="relative z-10 text-left min-w-0">
                      <p
                        className="
                          text-[10px]
                          sm:text-xs

                          uppercase

                          tracking-[0.18em]

                          text-muted-foreground
                        "
                      >
                        Technology
                      </p>

                      <h3
                        className="
                          mt-1

                          font-semibold

                          text-sm
                          sm:text-base
                          md:text-lg

                          text-foreground

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
    </Container>
  );
};
