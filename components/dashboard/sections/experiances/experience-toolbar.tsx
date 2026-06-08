"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  total?: number;
}

const filters = ["All", "Featured"];

const filterIcons = {
  All: Briefcase,
  Featured: Star,
};

const ExperienceToolbar = ({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
  total = 0,
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
      className="
        group
        relative
        overflow-hidden
        rounded-4xl
        border
        border-border/50
        bg-background/70
        p-6
        shadow-xl
        backdrop-blur-2xl
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-linear-to-r
          from-primary/5
          via-transparent
          to-primary/5
        "
      />

      <div
        className="
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="
              group/search
              flex
              h-14
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-border/60
              bg-background/80
              px-4
              shadow-sm
              transition-all
              duration-300
              focus-within:border-primary/40
              focus-within:shadow-lg
              focus-within:shadow-primary/10
              lg:max-w-md
            "
          >
            <Search
              className="
                h-5
                w-5
                text-muted-foreground
                transition-colors
                duration-300
                group-focus-within/search:text-primary
              "
            />

            <input
              type="text"
              placeholder="Search experiences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-transparent
                text-sm
                outline-none
                placeholder:text-muted-foreground
              "
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
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
                  variant="ghost"
                  className={`
                    h-11
                    rounded-2xl
                    px-5
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
                          border-border/50
                          hover:border-primary/30
                          hover:bg-primary/5
                          hover:text-primary
                        `
                    }
                  `}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item}
                  {isActive && (
                    <Badge
                      className="
                        ml-2
                        border-0
                        bg-white/20
                        text-white
                      "
                    >
                      Active
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceToolbar;
