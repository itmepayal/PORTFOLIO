"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Globe, LayoutGrid, Server, Box } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { SectionEmptyState } from "../common/SectionEmptyState";
import { SkillSkeleton } from "../skeletons/SkillSkeleton";

interface ApiSkill {
  _id: string;
  title: string;
  category: string;
  icon: string;
  level: number;
  order?: number;
}

const CATEGORY_FILTERS = [
  { name: "All", value: "all", icon: <LayoutGrid size={13} /> },
  { name: "Frontend", value: "frontend", icon: <Globe size={13} /> },
  { name: "Backend", value: "backend", icon: <Server size={13} /> },
  { name: "DevOps", value: "devops", icon: <Box size={13} /> },
  { name: "Databases", value: "database", icon: <Database size={13} /> },
];

function levelToDots(level: number) {
  return Math.min(5, Math.max(1, Math.round(level / 20)));
}

export const Skills = () => {
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills?limit=100");
        const data = await response.json();
        if (data.success) {
          setSkills(data.skills || []);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const marqueeItems = skills.slice(0, 14);

  return (
    <Container id="skills">
      <SectionHeader label="04 — SKILLS" title="My Tech Stack" />

      <div className="mb-8 grid grid-cols-2 gap-2 sm:mb-10 sm:grid-cols-5">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`inline-flex h-11 flex-col items-center justify-center gap-1.5 border py-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] transition-all sm:flex-row sm:gap-1.5 sm:py-2 sm:text-[0.68rem] ${
              activeCategory === cat.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            <span className="shrink-0">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <SkillSkeleton />
      ) : skills.length === 0 ? (
        <SectionEmptyState
          icon={Code2}
          title="No skills yet"
          description="Skills will appear here once they are added from the dashboard."
        />
      ) : (
        <>
          <div className="mb-10 grid grid-cols-2 gap-px border border-border bg-border sm:mb-12 sm:grid-cols-3 md:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const dots = levelToDots(skill.level);
                return (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex flex-col items-center gap-2 overflow-hidden bg-card px-2 py-4 text-center transition-colors hover:bg-secondary sm:px-3 sm:py-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center border border-border bg-background text-primary transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <div className="w-full truncate px-1 font-mono text-[0.6rem] tracking-[0.04em] text-foreground/80 sm:text-[0.68rem]">
                      {skill.title}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 transition-colors ${
                            i < dots ? "bg-primary" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary to-chart-3 transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {marqueeItems.length > 0 && (
            <div className="overflow-hidden">
              <div className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted-foreground sm:mb-4 sm:text-[0.62rem]">
                All technologies
              </div>
              <div
                className="overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div className="animate-marquee flex w-max gap-3 sm:gap-6">
                  {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                    <span
                      key={`${item._id}-${idx}`}
                      className="flex items-center gap-1.5 whitespace-nowrap border border-transparent px-2 py-1.5 font-mono text-[0.68rem] text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-primary sm:gap-2 sm:px-3 sm:py-2 sm:text-[0.78rem]"
                    >
                      <Code2 className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      {item.title}
                      <span className="h-1 w-1 shrink-0 bg-border" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};
