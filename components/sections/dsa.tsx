"use client";

import { motion } from "framer-motion";

import { Container } from "../common/container";

/* ====================================================================== */
/* DSA */
/* ====================================================================== */

const dsaCards = [
  {
    title: "366+",
    subtitle: "Problems Solved",
    desc: "Consistent DSA practice across multiple patterns and concepts.",
    progress: "88%",
  },

  {
    title: "111+",
    subtitle: "LeetCode Problems",
    desc: "Focused on interview-oriented backend problem solving.",
    progress: "72%",
  },

  {
    title: "255+",
    subtitle: "Striver A2Z Sheet",
    desc: "Completed structured roadmap covering major DSA topics.",
    progress: "92%",
  },
];

export const DSA = () => {
  return (
    <Container>
      {/* ====================================================== */}
      {/* SECTION */}
      {/* ====================================================== */}

      <section
        className="
          relative

          overflow-hidden
        "
      >
        {/* ====================================================== */}
        {/* BACKGROUND GLOW */}
        {/* ====================================================== */}

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

        {/* ====================================================== */}
        {/* CONTAINER */}
        {/* ====================================================== */}

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
          >
            {/* ====================================================== */}
            {/* TITLE */}
            {/* ====================================================== */}

            <div className="text-center mb-12 sm:mb-16">
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
                Data Structures & Algorithms
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
                Problem Solving Journey
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
                Consistent problem-solving practice focused on data structures,
                algorithms, backend interview preparation, and scalable
                thinking.
              </p>
            </div>

            {/* ====================================================== */}
            {/* GRID */}
            {/* ====================================================== */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3

                gap-5
                sm:gap-6
              "
            >
              {dsaCards.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.6,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group

                    relative

                    overflow-hidden

                    rounded-3xl

                    border
                    border-border/70

                    bg-card/70

                    backdrop-blur-xl

                    shadow-lg

                    p-6
                    sm:p-7
                    md:p-8

                    transition-all
                    duration-500

                    hover:border-primary/40
                    hover:bg-accent/40
                    hover:shadow-primary/10
                  "
                >
                  {/* ====================================================== */}
                  {/* HOVER GLOW */}
                  {/* ====================================================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      opacity-0

                      bg-linear-to-br
                      from-primary/5
                      via-chart-3/5
                      to-chart-2/5

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* ====================================================== */}
                  {/* TOP GLOW */}
                  {/* ====================================================== */}

                  <div
                    className="
                      absolute

                      top-0
                      right-0

                      w-40
                      h-40

                      rounded-full

                      bg-primary/10

                      blur-3xl
                    "
                  />

                  {/* ====================================================== */}
                  {/* CONTENT */}
                  {/* ====================================================== */}

                  <div className="relative z-10">
                    {/* ====================================================== */}
                    {/* BADGE */}
                    {/* ====================================================== */}

                    <div
                      className="
                        inline-flex

                        rounded-full

                        border
                        border-primary/15

                        bg-primary/10

                        px-3
                        py-1

                        text-[10px]
                        sm:text-xs

                        uppercase

                        tracking-[0.2em]

                        text-primary

                        font-semibold
                      "
                    >
                      DSA
                    </div>

                    {/* ====================================================== */}
                    {/* NUMBER */}
                    {/* ====================================================== */}

                    <h2
                      className="
                        mt-6

                        text-4xl
                        sm:text-5xl
                        md:text-6xl

                        font-black

                        tracking-[-0.05em]

                        leading-none

                        bg-linear-to-r
                        from-foreground
                        to-primary

                        bg-clip-text
                        text-transparent
                      "
                    >
                      {item.title}
                    </h2>

                    {/* ====================================================== */}
                    {/* SUBTITLE */}
                    {/* ====================================================== */}

                    <h3
                      className="
                        mt-4

                        text-lg
                        sm:text-xl

                        font-semibold

                        text-foreground
                      "
                    >
                      {item.subtitle}
                    </h3>

                    {/* ====================================================== */}
                    {/* DESCRIPTION */}
                    {/* ====================================================== */}

                    <p
                      className="
                        mt-3

                        text-sm
                        sm:text-base

                        leading-7

                        text-muted-foreground
                      "
                    >
                      {item.desc}
                    </p>

                    {/* ====================================================== */}
                    {/* PROGRESS */}
                    {/* ====================================================== */}

                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="
                            text-[10px]
                            sm:text-xs

                            uppercase

                            tracking-[0.18em]

                            text-muted-foreground
                          "
                        >
                          Progress
                        </span>

                        <span
                          className="
                            text-xs
                            sm:text-sm

                            font-semibold

                            text-primary
                          "
                        >
                          {item.progress}
                        </span>
                      </div>

                      {/* ====================================================== */}
                      {/* BAR */}
                      {/* ====================================================== */}

                      <div
                        className="
                          h-2.5

                          rounded-full

                          bg-muted

                          overflow-hidden
                        "
                      >
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: item.progress,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.2,
                          }}
                          className="
                            relative

                            h-full

                            rounded-full

                            bg-linear-to-r
                            from-primary
                            via-chart-3
                            to-chart-2
                          "
                        >
                          <div
                            className="
                              absolute
                              inset-0

                              bg-white/20

                              animate-pulse
                            "
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* ====================================================== */}
                  {/* BORDER EFFECT */}
                  {/* ====================================================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      rounded-3xl

                      border
                      border-primary/0

                      transition-all
                      duration-500

                      group-hover:border-primary/20
                    "
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};
