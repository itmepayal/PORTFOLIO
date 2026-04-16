"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/hooks/use-role";

interface AnimatedRoleProps {
  roles: string[];
  interval?: number;
}

export const Roles = ({ roles, interval = 2500 }: AnimatedRoleProps) => {
  const currentRole = useRole(roles, interval);
  return (
    <span className="relative inline-block h-[2.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentRole}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="block bg-linear-to-b text-3xl md:text-6xl font-semibold from-secondary via-primary to-secondary bg-clip-text text-transparent"
        >
          {currentRole}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
