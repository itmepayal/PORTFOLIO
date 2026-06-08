"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { iconMap } from "./data";

type Stat = {
  label: string;
  value: number | string;
  growth: string;
  icon: keyof typeof iconMap;
};

const SkillsStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch("/api/skills/stats");
        const data = await response.json();
        if (data.success) {
          setStats(data.stats || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  if (loading) {
    return (
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-44animate-pulserounded-3xlborderborder-border/50bg-muted/40
            "
          />
        ))}
      </section>
    );
  }

  if (!stats.length) {
    return (
      <div className=" flex h-44 items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 text-muted-foreground">
        No Skill statistics available.
      </div>
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
              delay: index * 0.08,
              duration: 0.4,
            }}
            whileHover={{
              y: -5,
            }}
            className=" group relative overflow-hidden rounded-3xl border border-border/50 bg-background/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className=" absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
            <div className="relative flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-500">
                {item.growth}
              </div>
            </div>
            <div className="relative mt-6">
              <p className=" text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              <h2 className=" mt-2 text-3xl font-black tracking-tight text-foreground">
                {item.value}
              </h2>
            </div>
            <div className=" absolute bottom-0 left-0 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
          </motion.div>
        );
      })}
    </section>
  );
};

export default SkillsStats;
