"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { iconMap } from "./data";

type Stat = {
  label: string;
  value: number;
  growth: string;
  icon: keyof typeof iconMap;
};

const DSAStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch("/api/dsa/stats");
        const data = await response.json();
        if (data.success) setStats(data.stats || []);
      } catch (error) {
        console.error("Failed to fetch DSA stats:", error);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  if (loading) {
    return (
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse border border-border bg-muted/40"
          />
        ))}
      </section>
    );
  }

  if (!stats.length) {
    return (
      <div className="flex h-44 items-center justify-center border border-dashed border-border bg-card/40 font-mono text-[0.72rem] uppercase tracking-widest text-muted-foreground">
        No DSA statistics available.
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
      {stats.map((item, index) => {
        const Icon = iconMap[item.icon];
        if (!Icon) return null;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
            className="group relative overflow-hidden border border-border bg-card/40 px-5 py-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60"
          >
            <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />

            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
              }}
            />

            <div className="relative flex items-start justify-between">
              <div
                className="flex h-11 w-11 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white transition-all duration-300 group-hover:scale-105"
                style={{
                  clipPath:
                    "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span className="border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-chart-3">
                {item.growth}
              </span>
            </div>

            <div className="relative mt-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <h2 className="mt-2 bg-linear-to-br from-primary to-chart-3 bg-clip-text text-3xl font-bold text-transparent">
                {item.value}
              </h2>
            </div>

            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary to-chart-3 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        );
      })}
    </section>
  );
};

export default DSAStats;
