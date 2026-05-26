"use client";

import { motion } from "framer-motion";
import { stats } from "./data";

const ProjectsStats = () => {
  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.07,
              duration: 0.4,
            }}
            whileHover={{
              y: -5,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-border/50
              bg-background/70
              p-5
              shadow-sm
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-primary/20
              hover:shadow-xl
              hover:shadow-primary/5
            "
          >
            {/* BACKGROUND GLOW */}

            <div
              className="
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-primary/5
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-primary/10
              "
            />

            {/* HEADER */}

            <div className="relative flex items-start justify-between">
              {/* ICON */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  text-primary
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-primary
                  group-hover:text-white
                "
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* GROWTH */}

              <div
                className="
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  tracking-wide
                  text-emerald-500
                "
              >
                {item.growth}
              </div>
            </div>

            {/* CONTENT */}

            <div className="relative mt-6">
              <p
                className="
                  text-sm
                  font-medium
                  text-muted-foreground
                "
              >
                {item.label}
              </p>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                {item.value}
              </h2>
            </div>

            {/* FOOTER LINE */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                rounded-full
                bg-primary
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default ProjectsStats;
