"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
}

const filters = ["All", "Published", "Draft"];

const ProjectsToolbar = ({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" flex flex-col gap-4 rounded-3xl border border-border/50 bg-background/70 p-4 shadow-xl backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-1 items-center">
        <div className="flex h-11 w-full items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 lg:max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto lg:overflow-visible">
        <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground sm:block" />
        {filters.map((item) => {
          const isActive = activeFilter === item;
          return (
            <Button
              key={item}
              onClick={() => setActiveFilter(item)}
              variant={isActive ? "default" : "ghost"}
              className={`
                h-9
                rounded-xl
                whitespace-nowrap
                px-4
                text-sm
                transition
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10 hover:text-primary"
                }
              `}
            >
              {item}
              {isActive && (
                <Badge className="ml-2 bg-white/20 px-2 py-0 text-[10px] text-white">
                  Active
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectsToolbar;
