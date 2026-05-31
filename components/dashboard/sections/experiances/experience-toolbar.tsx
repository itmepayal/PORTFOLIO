"use client";

import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Briefcase,
  Star,
  Sparkles,
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
  view = "grid",
  setView,
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
      {/* Glow */}

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
        {/* LEFT */}

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
          {/* SEARCH */}

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
              placeholder="Search company, position, technologies..."
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

          {/* FILTERS */}

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

        {/* RIGHT */}

        <div className="flex items-center gap-4">
          {/* COUNT */}

          <div
            className="
              hidden
              rounded-2xl
              border
              border-border/50
              bg-background/60
              px-4
              py-2
              backdrop-blur-xl
              md:flex
              md:items-center
              md:gap-2
            "
          >
            <Sparkles className="h-4 w-4 text-primary" />

            <span className="text-sm text-muted-foreground">Total</span>

            <span className="font-bold">{total}</span>
          </div>

          {/* VIEW TOGGLE */}

          <div
            className="
              flex
              items-center
              rounded-2xl
              border
              border-border/50
              bg-background/70
              p-1
              shadow-sm
            "
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setView?.("grid")}
              className={`
                h-11
                w-11
                rounded-xl

                ${
                  view === "grid"
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-md
                    `
                    : `
                      hover:bg-primary/10
                      hover:text-primary
                    `
                }
              `}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setView?.("list")}
              className={`
                h-11
                w-11
                rounded-xl

                ${
                  view === "list"
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-md
                    `
                    : `
                      hover:bg-primary/10
                      hover:text-primary
                    `
                }
              `}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceToolbar;
