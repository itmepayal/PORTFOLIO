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

            bg-[#050505]
          "
        >
          {/* ====================================================== */}
          {/* GRID BACKGROUND */}
          {/* ====================================================== */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
              bg-size-[70px_70px]
            "
          />

          {/* ====================================================== */}
          {/* GLOW */}
          {/* ====================================================== */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 5,
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
                border-white/10

                bg-white/3

                px-5
                py-2

                backdrop-blur-xl
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
            {/* LOGO */}
            {/* ====================================================== */}

            <div className="relative flex items-center justify-center">
              {/* OUTER RING */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-44

                  rounded-full

                  border
                  border-primary/15
                "
              />

              {/* MIDDLE RING */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute

                  size-34

                  rounded-full

                  border
                  border-dashed
                  border-primary/30
                "
              />

              {/* CENTER */}

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  size-28

                  rounded-4xl

                  border
                  border-white/10

                  bg-white/4

                  backdrop-blur-2xl

                  shadow-[0_0_60px_rgba(120,119,255,0.25)]
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
                    to-violet-400

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
                    delay: index * 0.04,
                    duration: 0.5,
                  }}
                  className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl

                    font-black

                    tracking-[0.18em]

                    text-white
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

                tracking-[0.45em]

                text-muted-foreground
              "
            >
              {role}
            </motion.p>

            {/* ====================================================== */}
            {/* LOADING LINE */}
            {/* ====================================================== */}

            <div
              className="
                relative

                mt-12

                h-0.5
                w-72
                sm:w-96

                overflow-hidden

                rounded-full

                bg-white/10
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
                  duration: 1.5,
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
                  via-violet-400
                  to-primary

                  shadow-[0_0_30px_rgba(120,119,255,0.9)]
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
                duration: 1.6,
                repeat: Infinity,
              }}
              className="
                mt-6

                flex
                items-center
                gap-3

                text-xs

                text-muted-foreground
              "
            >
              <div
                className="
                  size-2

                  rounded-full

                  bg-primary

                  shadow-[0_0_20px_rgba(120,119,255,1)]
                "
              />
              Initializing Production Systems...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
