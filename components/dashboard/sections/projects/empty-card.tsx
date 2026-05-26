"use client";

import { motion } from "framer-motion";
import { FolderSearch, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProjectsProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyProjects = ({
  title = "No projects found",
  description = "Try changing your search or filters to find projects.",
  onReset,
}: EmptyProjectsProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        relative
        overflow-hidden
        rounded-4xl
        border
        border-dashed
        border-border
        bg-card/40
        px-6
        py-20
        text-center
        backdrop-blur-xl
      "
    >
      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col items-center">
        {/* ICON */}

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            border
            border-border/50
            bg-background/80
            shadow-sm
          "
        >
          <FolderSearch className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* TITLE */}

        <h2 className="mt-6 text-2xl font-bold tracking-tight">{title}</h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-3
            max-w-md
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          {description}
        </p>

        {/* ACTION */}

        {onReset && (
          <Button
            onClick={onReset}
            className="
              mt-8
              h-11
              rounded-2xl
              px-6
            "
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyProjects;
