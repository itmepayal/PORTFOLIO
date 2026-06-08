"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FolderSearch, RefreshCcw, Sparkles, ArrowRight } from "lucide-react";

interface EmptyDSAProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyDSA = ({
  title = "No DSA found",
  description = "Try adjusting your search, category, or filters to discover matching projects from your collection.",
  onReset,
}: EmptyDSAProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-4xl
        border
        border-border/50
        bg-background/70
        px-6
        py-20
        shadow-sm
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-primary/20
        hover:shadow-2xl
        hover:shadow-primary/5
        sm:px-10
      "
    >
      <div className=" pointer-events-none absolute inset-0 opacity-80">
        <div className=" absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />
        <div className=" absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className=" absolute bottom-0 right-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className=" absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className=" relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-[30px]
            border
            border-border/50
            bg-background/80
            shadow-xl
            backdrop-blur-xl
          "
        >
          <div className=" absolute inset-0 rounded-[30px] bg-linear-to-br from-primary/10 to-transparent" />
          <div className=" absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <FolderSearch className=" relative z-10 h-12 w-12 text-primary" />
        </motion.div>

        <h2 className=" mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl capitalize">
          {title}
        </h2>

        <p className=" mt-4 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className=" mt-10 flex flex-wrap items-center justify-center gap-4">
          {onReset && (
            <Button
              onClick={onReset}
              className=" group/button h-12 rounded-2xl px-7 text-sm font-semibold shadow-lg shadow-primary/10"
            >
              <RefreshCcw className=" mr-2 h-4 w-4 transition-transform duration-500 group-hover/button:rotate-180" />
              Reset Filters
            </Button>
          )}

          <Button
            variant="outline"
            className=" h-12 rounded-2xl border-border/60 bg-background/50 px-7 text-sm font-medium backdrop-blur-xl"
          >
            Browse Projects
            <ArrowRight className=" ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className=" mt-12 flex flex-wrap items-center justify-center gap-4">
          {["Modern UI", "Fast Search", "Smart Filters"].map((item) => (
            <div
              key={item}
              className=" rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyDSA;
