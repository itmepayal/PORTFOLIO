"use client";

/* ====================================================================== */
/* IMPORTS */
/* ====================================================================== */

import { AnimatePresence, motion } from "framer-motion";

import { Code2, Database, Globe, ShieldCheck } from "lucide-react";

/* ====================================================================== */
/* TYPES */
/* ====================================================================== */

interface PageLoaderProps {
  loading: boolean;
}

/* ====================================================================== */
/* CONSTANTS */
/* ====================================================================== */

const title = "PAYAL YADAV";

const role = "BACKEND ENGINEER";

const technologies = [
  {
    icon: Code2,
    label: "API",
  },

  {
    icon: Database,
    label: "DATABASE",
  },

  {
    icon: Globe,
    label: "REALTIME",
  },

  {
    icon: ShieldCheck,
    label: "SECURITY",
  },
];

/* ====================================================================== */
/* PAGE LOADER */
/* ====================================================================== */

export const PageLoader = ({ loading }: PageLoaderProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="
            fixed
            inset-0
            z-9999

            overflow-hidden

            flex
            items-center
            justify-center

            bg-background
            text-foreground
          "
        >
          {/* ====================================================== */}
          {/* GRID BACKGROUND */}
          {/* ====================================================== */}

          <div
            className="
              absolute
              inset-0

              opacity-[0.05]

              bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]

              bg-size-[70px_70px]
            "
          />

          {/* ====================================================== */}
          {/* TOP GRADIENT */}
          {/* ====================================================== */}

          <div
            className="
              absolute
              inset-x-0
              top-0

              h-72

              bg-linear-to-b
              from-primary/10
              to-transparent
            "
          />

          {/* ====================================================== */}
          {/* FLOATING ORBS */}
          {/* ====================================================== */}

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="
              absolute

              h-105
              w-105

              rounded-full

              bg-primary/15

              blur-[140px]
            "
          />

          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-0
              top-1/3

              h-80
              w-80

              rounded-full

              bg-chart-2/15

              blur-[120px]
            "
          />

          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-0
              left-0

              h-80
              w-80

              rounded-full

              bg-chart-3/15

              blur-[120px]
            "
          />

          {/* ====================================================== */}
          {/* MAIN CONTENT */}
          {/* ====================================================== */}

          <div
            className="
              relative
              z-10

              flex
              flex-col
              items-center
            "
          >
            {/* ====================================================== */}
            {/* TOP BADGE */}
            {/* ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                mb-10

                rounded-full

                border
                border-border/60

                bg-card/70

                px-5
                py-2.5

                backdrop-blur-xl
              "
            >
              <p
                className="
                  text-[10px]
                  sm:text-xs

                  uppercase

                  tracking-[0.4em]

                  text-muted-foreground
                "
              >
                Initializing Portfolio
              </p>
            </motion.div>

            {/* ====================================================== */}
            {/* CENTER SYSTEM */}
            {/* ====================================================== */}

            <div className="relative flex items-center justify-center">
              {/* OUTER SPIN */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-80

                  rounded-full

                  border
                  border-dashed
                  border-primary/20
                "
              />

              {/* MIDDLE RING */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-60

                  rounded-full

                  border
                  border-primary/30
                "
              />

              {/* INNER RING */}

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  absolute

                  size-40

                  rounded-full

                  bg-primary/15

                  blur-3xl
                "
              />

              {/* FLOATING TECH ICONS */}

              {technologies.map((item, index) => {
                const Icon = item.icon;

                const positions = [
                  "top-0 left-1/2 -translate-x-1/2",
                  "right-0 top-1/2 -translate-y-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2",
                  "left-0 top-1/2 -translate-y-1/2",
                ];

                return (
                  <motion.div
                    key={item.label}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2 + index,
                      repeat: Infinity,
                    }}
                    className={`
                      absolute
                      ${positions[index]}
                    `}
                  >
                    <div
                      className="
                        flex
                        size-14
                        items-center
                        justify-center

                        rounded-2xl

                        border
                        border-border/60

                        bg-card/70

                        backdrop-blur-xl
                      "
                    >
                      <Icon className="size-5 text-primary" />
                    </div>
                  </motion.div>
                );
              })}

              {/* CENTER CARD */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative

                  flex
                  flex-col
                  items-center
                  justify-center

                  size-52

                  rounded-4xl

                  border
                  border-border/60

                  bg-card/70

                  backdrop-blur-2xl

                  shadow-2xl
                "
              >
                {/* INNER GLOW */}

                <div
                  className="
                    absolute
                    inset-4

                    rounded-3xl

                    border
                    border-primary/20
                  "
                />

                {/* LOGO */}

                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    text-6xl

                    font-black

                    tracking-tight

                    bg-linear-to-r
                    from-primary
                    via-chart-2
                    to-chart-3

                    bg-clip-text
                    text-transparent
                  "
                >
                  PY
                </motion.span>

                {/* STATUS */}

                <p
                  className="
                    mt-4

                    text-[10px]

                    uppercase

                    tracking-[0.35em]

                    text-muted-foreground
                  "
                >
                  SYSTEM ONLINE
                </p>
              </motion.div>
            </div>

            {/* ====================================================== */}
            {/* NAME */}
            {/* ====================================================== */}

            <div className="mt-16 flex overflow-hidden">
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                  }}
                  className="
                    text-3xl
                    sm:text-5xl
                    md:text-6xl

                    font-black

                    tracking-[0.18em]

                    text-foreground
                  "
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* ====================================================== */}
            {/* ROLE */}
            {/* ====================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="
                mt-5

                text-xs
                sm:text-sm

                uppercase

                tracking-[0.5em]

                text-muted-foreground
              "
            >
              {role}
            </motion.p>

            {/* ====================================================== */}
            {/* ADVANCED LOADING BAR */}
            {/* ====================================================== */}

            <div className="mt-12 w-80 sm:w-105">
              {/* TOP LABEL */}

              <div
                className="
                  mb-3

                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[10px]

                    uppercase

                    tracking-[0.3em]

                    text-muted-foreground
                  "
                >
                  Loading Assets
                </span>

                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="
                    text-[10px]

                    uppercase

                    tracking-[0.3em]

                    text-primary
                  "
                >
                  Processing
                </motion.span>
              </div>

              {/* BAR */}

              <div
                className="
                  relative

                  h-2

                  overflow-hidden

                  rounded-full

                  bg-muted
                "
              >
                <motion.div
                  initial={{
                    x: "-100%",
                  }}
                  animate={{
                    x: "100%",
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0

                    w-1/2

                    rounded-full

                    bg-linear-to-r
                    from-primary
                    via-chart-2
                    to-chart-3

                    shadow-lg
                  "
                />
              </div>
            </div>

            {/* ====================================================== */}
            {/* BOTTOM STATUS */}
            {/* ====================================================== */}

            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                mt-8

                flex
                items-center
                gap-3

                text-xs

                text-muted-foreground
              "
            >
              <div className="relative flex items-center justify-center">
                <div
                  className="
                    size-2

                    rounded-full

                    bg-chart-4
                  "
                />

                <div
                  className="
                    absolute

                    size-5

                    rounded-full

                    border
                    border-chart-4/40

                    animate-ping
                  "
                />
              </div>
              Initializing Production Infrastructure...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
