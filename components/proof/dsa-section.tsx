"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */
type DSAStat = {
  title: string;
  solved: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  description: string;
};

/* ================= CONSTANTS ================= */
const SIZE = 160;
const RADIUS = 60;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ================= MAIN ================= */
export const DSASection = ({
  active,
  stats,
}: {
  active: string;
  stats: DSAStat[];
}) => {
  if (active !== "DSA") return null;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stats.map((item, idx) => {
        const safeTotal = item.total || 1;

        const percent = Math.round((item.solved / safeTotal) * 100);
        const offset =
          CIRCUMFERENCE - (item.solved / safeTotal) * CIRCUMFERENCE;

        const gradientId = `gradient-${idx}`;

        return (
          <motion.div
            key={item.title}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="p-5 rounded-2xl border border-border bg-background shadow-sm hover:shadow-lg transition-all duration-300">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <Badge
                  className="
                      inline-flex items-center gap-2
      px-5 py-4

      rounded-full
      border border-border/60

      bg-background/70
      backdrop-blur-xl

      text-foreground

      shadow-sm

      hover:bg-accent/40
      transition-all duration-300"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  {item.title}
                </Badge>

                <span className="text-[11px] font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {percent}%
                </span>
              </div>

              <div className="flex items-center gap-6">
                {/* ================= CIRCLE ================= */}
                <div className="relative w-36 h-36">
                  <svg
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="w-full h-full -rotate-90"
                  >
                    {/* Background */}
                    <circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={RADIUS}
                      stroke="currentColor"
                      strokeWidth={STROKE}
                      className="text-muted/20"
                      fill="transparent"
                    />

                    {/* Progress */}
                    <motion.circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={RADIUS}
                      stroke={`url(#${gradientId})`}
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      initial={{ strokeDashoffset: CIRCUMFERENCE }}
                      animate={{ strokeDashoffset: offset }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      fill="transparent"
                    />

                    {/* Gradient */}
                    <defs>
                      <linearGradient id={gradientId}>
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* CENTER */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-foreground">
                      {item.solved}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      / {item.total}
                    </p>
                  </div>
                </div>

                {/* ================= STATS ================= */}
                <div className="flex-1 space-y-3">
                  <ProgressRow
                    label="Easy"
                    value={item.easy}
                    total={safeTotal}
                    color="bg-green-500"
                  />
                  <ProgressRow
                    label="Medium"
                    value={item.medium}
                    total={safeTotal}
                    color="bg-yellow-500"
                  />
                  <ProgressRow
                    label="Hard"
                    value={item.hard}
                    total={safeTotal}
                    color="bg-red-500"
                  />
                </div>
              </div>

              {/* FOOTER */}
              <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                {item.description}{" "}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ================= PROGRESS ROW ================= */
const ProgressRow = ({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) => {
  const width = Math.min((value / total) * 100, 100);
  const percent = Math.round(width);

  return (
    <div className="space-y-1.5 group">
      {/* HEADER */}
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-muted-foreground group-hover:text-foreground transition">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
          <span className="text-[10px] text-muted-foreground">
            ({percent}%)
          </span>
        </div>
      </div>

      {/* BAR */}
      <div className="relative h-2 bg-muted/70 rounded-full overflow-hidden">
        {/* Glow */}
        <div className={`absolute inset-0 ${color} opacity-20 blur-sm`} />

        {/* Progress */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className={`relative h-full ${color} rounded-full`}
        />

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full w-1/3 bg-white/20 blur-sm"
        />
      </div>
    </div>
  );
};
