"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { iconMap } from "./data";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

type Stat = {
  label: string;
  value: number;
  growth: string;
  icon: keyof typeof iconMap;
};

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const DSAStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  /* ====================================================== */
  /* GET STATS */
  /* ====================================================== */

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch("/api/dsa/stats");
        const data = await response.json();
        if (data.success) {
          setStats(data.stats || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  /* ====================================================== */
  /* LOADING */
  /* ====================================================== */

  if (loading) {
    return (
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-44
              animate-pulse
              rounded-3xl
              border
              border-border/50
              bg-muted/40
            "
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
      {stats.map((item, index) => {
        const Icon = iconMap[item.icon];
        if (!Icon) return null;
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
            {/* BACKGROUND */}

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

            {/* BOTTOM LINE */}

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

export default DSAStats;
