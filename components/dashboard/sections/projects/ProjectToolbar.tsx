"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { filterOptions, workTypeFilterOptions } from "./data";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  workTypeFilter: string;
  setWorkTypeFilter: (value: string) => void;
}

const ProjectsToolbar = ({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
  workTypeFilter,
  setWorkTypeFilter,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 border border-border bg-card/40 p-4 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center">
          <div className="flex h-10 w-full items-center gap-3 border border-border bg-background/60 px-4 lg:max-w-sm">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent font-mono text-[0.78rem] uppercase tracking-wide outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto lg:overflow-visible">
          <SlidersHorizontal className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground sm:block" />
          {filterOptions.map((item) => {
            const isActive = activeFilter === item;
            return (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 font-mono text-[0.62rem] uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-br from-primary to-secondary-foreground text-white"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
                style={
                  isActive
                    ? {
                        clipPath:
                          "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                      }
                    : undefined
                }
              >
                {item}
                {isActive && (
                  <span className="border border-white/20 bg-white/10 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-widest text-white">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto lg:overflow-visible">
        <span className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground sm:block">
          Work Type
        </span>
        {workTypeFilterOptions.map((item) => {
          const isActive = workTypeFilter === item;
          return (
            <button
              key={item}
              onClick={() => setWorkTypeFilter(item)}
              className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 font-mono text-[0.62rem] uppercase tracking-widest transition-all duration-200 ${
                isActive
                  ? "border border-cyan/40 bg-cyan/10 text-cyan"
                  : "border border-border text-muted-foreground hover:border-cyan/40 hover:text-cyan"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectsToolbar;
