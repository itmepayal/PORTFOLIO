"use client";

import { useEffect, useState } from "react";

import SkillHeader from "@/components/dashboard/sections/skills/skill-header";
import SkillStats from "@/components/dashboard/sections/skills/skill-stats";
import SkillToolbar from "@/components/dashboard/sections/skills/skill-toolbar";
import SkillCard from "@/components/dashboard/sections/skills/skill-card";

import CardSkeleton from "@/components/dashboard/skeleton/project-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";

import { Button } from "@/components/ui/button";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

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

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const Skills = () => {
  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalSkills: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  /* ====================================================== */
  /* FETCH SKILLS */
  /* ====================================================== */

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

  /* ====================================================== */
  /* EFFECTS */
  /* ====================================================== */

  useEffect(() => {
    fetchSkills();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  /* ====================================================== */
  /* DELETE */
  /* ====================================================== */

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,

      totalSkills: Math.max(0, prev.totalSkills - 1),
    }));
  };

  /* ====================================================== */
  /* RENDER */
  /* ====================================================== */

  return (
    <section className="space-y-8">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <SkillHeader />

      {/* ====================================================== */}
      {/* STATS */}
      {/* ====================================================== */}

      <SkillStats />

      {/* ====================================================== */}
      {/* TOOLBAR */}
      {/* ====================================================== */}

      <SkillToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        view={view}
        setView={setView}
      />

      {/* ====================================================== */}
      {/* LOADING */}
      {/* ====================================================== */}

      {loading ? (
        <div
          className={
            view === "grid"
              ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-6"
          }
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : skills.length === 0 ? (
        /* ====================================================== */
        /* EMPTY */
        /* ====================================================== */

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
          {/* ====================================================== */}
          {/* SKILLS GRID */}
          {/* ====================================================== */}

          <div
            className={
              view === "grid"
                ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-6"
            }
          >
            {skills.map((item) => (
              <SkillCard
                key={item._id}
                skill={item}
                view={view}
                onDelete={handleDeleteSkill}
              />
            ))}
          </div>

          {/* ====================================================== */}
          {/* PAGINATION */}
          {/* ====================================================== */}

          {pagination.totalPages > 1 && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
                pt-6
              "
            >
              {/* PREVIOUS */}

              <Button
                variant="outline"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="
                  rounded-2xl
                  px-5
                "
              >
                Previous
              </Button>

              {/* PAGE INFO */}

              <div
                className="
                  rounded-2xl
                  border
                  border-border/50
                  bg-muted/30
                  px-5
                  py-2.5
                  text-sm
                  text-muted-foreground
                "
              >
                Page{" "}
                <span className="font-semibold text-foreground">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {pagination.totalPages}
                </span>
              </div>

              {/* NEXT */}

              <Button
                variant="outline"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="
                  rounded-2xl
                  px-5
                "
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Skills;
