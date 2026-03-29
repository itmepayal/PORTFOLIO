"use client";

import { motion } from "framer-motion";

interface AnimatedBlobProps {
  className: string;
  animate: any;
  transition: any;
}

export const AnimatedBlob = ({
  className,
  animate,
  transition,
}: AnimatedBlobProps) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={animate}
      transition={transition}
    />
  );
};
