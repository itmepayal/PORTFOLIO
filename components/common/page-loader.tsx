"use client";

import { motion, AnimatePresence } from "framer-motion";

/* ====================================================================== */
/* PAGE LOADER */
/* ====================================================================== */

interface PageLoaderProps {
  loading: boolean;
}

const title = "PAYAL YADAV";

const role = "BACKEND ENGINEER";

/* ====================================================================== */
/* COMPONENT */
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
          }}
          transition={{
            duration: 0.8,
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
          "
        >
          {/* ====================================================== */}
          {/* GRID BACKGROUND */}
          {/* ====================================================== */}

          <div
            className="
              absolute
              inset-0

              opacity-[0.04]

              bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]

              bg-size-[70px_70px]
            "
          />

          {/* ====================================================== */}
          {/* GLOW ORBS */}
          {/* ====================================================== */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="
              absolute

              w-125
              h-125

              rounded-full

              bg-primary/20

              blur-[140px]
            "
          />

          <motion.div
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="
              absolute
              bottom-0
              right-0

              w-[320px]
              h-80

              rounded-full

              bg-chart-3/20

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
            {/* TOP LABEL */}
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
                border-border

                bg-card/60

                px-5
                py-2

                backdrop-blur-xl

                shadow-lg
              "
            >
              <p
                className="
                  text-[10px]
                  sm:text-xs

                  uppercase

                  tracking-[0.35em]

                  text-muted-foreground
                "
              >
                Portfolio Initializing
              </p>
            </motion.div>

            {/* ====================================================== */}
            {/* LOGO AREA */}
            {/* ====================================================== */}

            <div className="relative flex items-center justify-center">
              {/* OUTER RING */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-44

                  rounded-full

                  border
                  border-primary/20
                "
              />

              {/* MIDDLE RING */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-34

                  rounded-full

                  border-2
                  border-dashed
                  border-primary/30
                "
              />

              {/* INNER PULSE */}

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="
                  absolute

                  size-24

                  rounded-full

                  bg-primary/10

                  blur-2xl
                "
              />

              {/* CENTER CARD */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  size-28

                  rounded-4xl

                  border
                  border-border

                  bg-card/70

                  backdrop-blur-2xl

                  shadow-2xl
                "
              >
                <motion.span
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="
                    text-4xl

                    font-black

                    tracking-tight

                    bg-linear-to-r
                    from-primary
                    to-chart-3

                    bg-clip-text
                    text-transparent
                  "
                >
                  PY
                </motion.span>
              </motion.div>
            </div>

            {/* ====================================================== */}
            {/* NAME */}
            {/* ====================================================== */}

            <div className="mt-14 flex overflow-hidden">
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
                    text-2xl
                    sm:text-3xl
                    md:text-5xl

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
                delay: 0.9,
              }}
              className="
                mt-5

                text-xs
                sm:text-sm

                uppercase

                tracking-[0.45em]

                text-muted-foreground
              "
            >
              {role}
            </motion.p>

            {/* ====================================================== */}
            {/* LOADING BAR */}
            {/* ====================================================== */}

            <div
              className="
                relative

                mt-12

                h-1.5
                w-72
                sm:w-96

                overflow-hidden

                rounded-full

                bg-muted
              "
            >
              {/* TRACK GLOW */}

              <div
                className="
                  absolute
                  inset-0

                  bg-linear-to-r
                  from-transparent
                  via-primary/10
                  to-transparent
                "
              />

              {/* ACTIVE BAR */}

              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.6,
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
                  via-chart-3
                  to-primary

                  shadow-[0_0_30px_hsl(var(--primary)/0.8)]
                "
              />
            </div>

            {/* ====================================================== */}
            {/* STATUS */}
            {/* ====================================================== */}

            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="
                mt-7

                flex
                items-center
                gap-3

                text-xs

                text-muted-foreground
              "
            >
              <div
                className="
                  relative

                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    size-2

                    rounded-full

                    bg-primary
                  "
                />

                <div
                  className="
                    absolute

                    size-4

                    rounded-full

                    border
                    border-primary/40

                    animate-ping
                  "
                />
              </div>
              Initializing Production Systems...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
