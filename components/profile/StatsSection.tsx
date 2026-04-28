import { motion } from "framer-motion";
import { AlertTriangle, Code2 } from "lucide-react";
import { useLeetCodeStats } from "../../hooks/use-stats";
import { useCounter } from "@/hooks/use-counter";

export const StatsSection = () => {
  const { stats, loading, error } = useLeetCodeStats();

  const striverCount = 255;

  const total = stats ? stats.solved + striverCount : 0;
  const lcSolved = stats?.solved || 0;

  const totalCount = useCounter(total, 1000);
  const lc = useCounter(lcSolved, 1400);
  const st = useCounter(striverCount, 1800);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="border border-border bg-card backdrop-blur-xl shadow-lg rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
            {/* Animated Loader */}
            <div className="relative flex items-center justify-center w-12 h-12">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/50"></span>
            </div>

            {/* Title Skeleton */}
            <div className="h-4 w-32 rounded-md bg-white/10 animate-pulse"></div>

            {/* Description Skeleton */}
            <div className="space-y-2 flex flex-col items-center gap-1">
              <div className="h-3 w-48 rounded-md bg-white/10 animate-pulse"></div>
              <div className="h-3 w-52 rounded-md bg-white/10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-xl shadow-lg rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-3 p-4 text-center">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-red-300">
              Unable to load stats
            </h3>

            {/* Description */}
            <p className="text-sm text-red-400/80 max-w-xs">
              Something went wrong while fetching your data. Please try again
              later.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const progress = [
    { label: "LeetCode", value: lc },
    { label: "Striver", value: st },
  ];

  return (
    <div className="border-y border-border p-4 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Code2 className="w-4 h-4 text-blue-400" />
        <p className="text-xs uppercase text-gray-400 tracking-wider">
          Problem Solving
        </p>
      </div>

      <div className="text-center">
        <p className="text-4xl font-bold text-white">{totalCount}+</p>
        <p className="text-xs text-gray-400">Problems solved</p>
      </div>

      {progress.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width:
                  totalCount === 0
                    ? "0%"
                    : `${(item.value / totalCount) * 100}%`,
              }}
              className="h-full bg-linear-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
