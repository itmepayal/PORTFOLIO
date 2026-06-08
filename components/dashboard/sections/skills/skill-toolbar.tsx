"use client";

import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Code2,
  Monitor,
  Server,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  view?: "grid" | "list";
  setView?: (value: "grid" | "list") => void;
}

const filters = ["All", "Frontend", "Backend", "Featured"];

const filterIcons = {
  All: Code2,
  Frontend: Monitor,
  Backend: Server,
  Featured: Star,
};

const SkillToolbar = ({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
  view = "grid",
  setView,
}: Props) => {
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
        duration: 0.4,
      }}
      className=" relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-border/50 bg-background/70 p-5 shadow-xl backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
    >
      <div className=" pointer-events-none absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className=" group flex h-12 w-full items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 shadow-sm transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-lg focus-within:shadow-primary/10 lg:max-w-sm">
          <Search className=" h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-1 hidden items-center gap-2 sm:flex">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filters
            </span>
          </div>
          {filters.map((item) => {
            const isActive = activeFilter === item;
            const Icon = filterIcons[item as keyof typeof filterIcons];
            return (
              <Button
                key={item}
                onClick={() => setActiveFilter(item)}
                variant={isActive ? "default" : "ghost"}
                className={`
                  h-10
                  rounded-2xl
                  px-5
                  text-sm
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-primary
                        text-primary-foreground
                        shadow-lg
                        shadow-primary/20
                      `
                      : `
                        border
                        border-transparent
                        hover:border-primary/20
                        hover:bg-primary/5
                        hover:text-primary
                      `
                  }
                `}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item}
                {isActive && (
                  <Badge className=" ml-2 rounded-full border-0 bg-white/20 px-2 py-0 text-[10px] font-medium text-white">
                    Active
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillToolbar;
