"use client";

import { motion } from "framer-motion";

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
    <section
      className="
        relative
        overflow-hidden
      "
    >
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
                text-primary
                uppercase
                tracking-[0.25em]

                text-[10px]
                sm:text-xs
                md:text-sm
              "
            >
              Data Structures & Algorithms
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
              Problem Solving Journey
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
              Consistent problem-solving practice focused on data structures,
              algorithms, backend interview preparation, and scalable thinking.
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
                  delay: i * 0.2,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-3xl

                  border
                  border-border

                  bg-background/60
                  backdrop-blur-xl

                  p-5
                  sm:p-6
                  md:p-8

                  hover:border-primary/30

                  transition-all
                  duration-300
                "
              >
                {/* ====================================================== */}
                {/* GLOW */}
                {/* ====================================================== */}

                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-32
                    h-32

                    sm:w-40
                    sm:h-40

                    bg-primary/10
                    blur-3xl
                    rounded-full
                  "
                />

                {/* ====================================================== */}
                {/* CONTENT */}
                {/* ====================================================== */}

                <div className="relative z-10">
                  <p
                    className="
                      text-[10px]
                      sm:text-xs

                      uppercase
                      tracking-[0.25em]

                      text-primary
                    "
                  >
                    DSA
                  </p>

                  <h2
                    className="
                      mt-4

                      text-4xl
                      sm:text-5xl
                      md:text-6xl

                      font-black
                      tracking-tight
                    "
                  >
                    {item.title}
                  </h2>

                  <h3
                    className="
                      mt-3

                      text-lg
                      sm:text-xl

                      font-semibold
                    "
                  >
                    {item.subtitle}
                  </h3>

                  <p
                    className="
                      mt-3

                      text-xs
                      sm:text-sm

                      leading-6
                      text-muted-foreground
                    "
                  >
                    {item.desc}
                  </p>

                  {/* ====================================================== */}
                  {/* PROGRESS */}
                  {/* ====================================================== */}

                  <div className="mt-7 sm:mt-8">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="
                          text-[10px]
                          sm:text-xs

                          text-muted-foreground
                        "
                      >
                        Progress
                      </span>

                      <span
                        className="
                          text-[10px]
                          sm:text-xs

                          font-medium
                          text-primary
                        "
                      >
                        {item.progress}
                      </span>
                    </div>

                    <div
                      className="
                        h-2
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
                          h-full
                          rounded-full

                          bg-linear-to-r
                          from-primary
                          to-violet-500
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* HOVER BORDER */}
                {/* ====================================================== */}

                <div
                  className="
                    absolute
                    inset-0

                    rounded-3xl

                    border
                    border-primary/0

                    group-hover:border-primary/20

                    transition-all
                    duration-300
                  "
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
