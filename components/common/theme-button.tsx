import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.94,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative"
    >
      {/* OUTER GLOW */}

      <div
        className="
          absolute
          inset-0

          rounded-2xl

          bg-primary/10

          blur-2xl
        "
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="
          group
          relative

          size-12
          sm:size-13

          overflow-hidden

          rounded-2xl

          border
          border-border/60

          bg-card/70

          backdrop-blur-2xl

          shadow-lg
          shadow-black/5

          transition-all
          duration-300

          hover:border-primary/40
          hover:bg-accent/60
          hover:shadow-xl
          hover:shadow-primary/10
        "
      >
        {/* TOP SHINE */}

        <div
          className="
            absolute
            inset-x-0
            top-0

            h-px

            bg-linear-to-r
            from-transparent
            via-white/40
            to-transparent
          "
        />

        {/* INNER BACKGROUND */}

        <motion.div
          animate={{
            scale: isDark ? 1.25 : 1,
            opacity: isDark ? 0.22 : 0.12,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="
            absolute
            inset-0

            rounded-2xl

            bg-primary

            blur-xl
          "
        />

        {/* FLOATING PARTICLE */}

        <motion.div
          animate={{
            y: [0, -3, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-2
            top-2

            size-1

            rounded-full

            bg-primary
          "
        />

        {/* ICON SWITCH */}

        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{
                rotate: 120,
                scale: 0,
                opacity: 0,
                y: 8,
              }}
              animate={{
                rotate: 0,
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                rotate: -120,
                scale: 0,
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              <Moon
                className="
                  size-[1.2rem]

                  text-primary

                  drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]
                "
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{
                rotate: -120,
                scale: 0,
                opacity: 0,
                y: 8,
              }}
              animate={{
                rotate: 0,
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                rotate: 120,
                scale: 0,
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              <Sun
                className="
                  size-[1.2rem]

                  text-amber-500

                  drop-shadow-[0_0_10px_rgba(251,191,36,0.45)]
                "
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROTATING BORDER */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0

            rounded-2xl

            border
            border-primary/10
          "
        />

        {/* HOVER LIGHT */}

        <div
          className="
            absolute
            inset-0

            opacity-0

            transition-opacity
            duration-300

            group-hover:opacity-100

            bg-linear-to-br
            from-white/10
            via-transparent
            to-primary/10
          "
        />

        <span className="sr-only">Toggle Theme</span>
      </Button>
    </motion.div>
  );
}
