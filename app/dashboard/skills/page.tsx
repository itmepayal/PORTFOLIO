"use client";

import { useEffect, useState } from "react";

import SkillHeader from "@/components/dashboard/sections/skills/skill-header";
import SkillStats from "@/components/dashboard/sections/skills/skill-stats";
import SkillToolbar from "@/components/dashboard/sections/skills/skill-toolbar";
import SkillCard from "@/components/dashboard/sections/skills/skill-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";
import SkillsCardSkeleton from "@/components/dashboard/skeleton/skill-card";
import { Button } from "@/components/ui/button";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface SkillItem {
  _id: string;
  title: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "mobile"
    | "language"
    | "tool"
    | "cloud"
    | "other";
  icon: string;
  level: number;
  featured: boolean;
  order: number;
  createdAt?: string;
}

interface Pagination {
  totalSkills: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalSkills: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: String(page),

        limit: "3",

        search,
      });

      if (activeFilter === "Featured") {
        query.append("featured", "true");
      } else if (activeFilter !== "All") {
        query.append("category", activeFilter.toLowerCase());
      }

      const response = await fetch(`/api/skills?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();

      setSkills(data.skills || []);

      setPagination(
        data.pagination || {
          totalSkills: 0,
          totalPages: 1,
          currentPage: 1,
          limit: 6,
          hasNextPage: false,
          hasPrevPage: false,
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,

      totalSkills: Math.max(0, prev.totalSkills - 1),
    }));
    fetchSkills();
  };

  return (
    <section className="space-y-8">
      <SkillHeader />
      <SkillStats />
      <SkillToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {loading ? (
        <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <SkillsCardSkeleton key={index} />
          ))}
        </div>
      ) : skills.length === 0 ? (
        <EmptyProjects
          title="No Skills Found"
          description="Try changing your search or filters to find skills."
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
            {skills.map((item) => (
              <SkillCard
                key={item._id}
                skill={item}
                onDelete={handleDeleteSkill}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 border border-border bg-transparent px-6 py-[0.6rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                <HiArrowLeft className="size-3.5" />
                Previous
              </button>

              <div className="border border-border bg-card/40 px-6 py-[0.6rem] font-mono text-[0.72rem] tracking-[0.05em] text-muted-foreground">
                Page{" "}
                <span className="font-medium text-foreground">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {pagination.totalPages}
                </span>
              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 border border-border bg-transparent px-6 py-[0.6rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                Next
                <HiArrowRight className="size-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Skills;
