"use client";

/* =========================
  EXTERNAL DEPENDENCIES
   ========================= */
import { motion } from "framer-motion";

/* =========================
  ICONS
   ========================= */
import { Target } from "lucide-react";

/* =========================
  TYPES
   ========================= */
type IconType = React.ComponentType<{ className?: string }>;

type Props = {
  techStack: { name: string; icon: IconType }[];
};

/* =========================================================
   COMPONENT: TechStack
   ========================================================= */
export const TechStack = ({ techStack }: Props) => {
  return (
    /* =========================
       WRAPPER
       ========================= */
    <div className="space-y-4">
      {/* -------------------------
          SECTION HEADER
         ------------------------- */}
      <div className="flex gap-2 items-center">
        <Target className="w-4 h-4 text-pink-400" />
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Technical Focus
        </p>
      </div>

      {/* -------------------------
          TECH GRID
         ------------------------- */}
      <div className="grid grid-cols-2 gap-3">
        {techStack.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-1 p-3 rounded-xl border border-white/10 text-xs text-center hover:border-white/20 transition"
          >
            <Icon className="w-4 h-4 text-white" />
            <span className="text-gray-300">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
