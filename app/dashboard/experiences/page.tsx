"use client";

import { useEffect, useState } from "react";

import ExperienceHeader from "@/components/dashboard/sections/experiances/experience-header";
import ExperienceStats from "@/components/dashboard/sections/experiances/experience-stats";
import ExperienceToolbar from "@/components/dashboard/sections/experiances/experience-toolbar";
import ExperienceCard from "@/components/dashboard/sections/experiances/experience-card";

import CardSkeleton from "@/components/dashboard/skeleton/project-card";
import EmptyProjects from "@/components/dashboard/sections/experiances/empty-card";

import { Button } from "@/components/ui/button";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

interface ExperienceItem {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo: string;
  companyWebsite: string;
  featured: boolean;
  order: number;
  createdAt?: string;
}

interface Pagination {
  totalExperiences: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const Experiance = () => {
  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalExperiences: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  /* ====================================================== */
  /* FETCH SKILLS */
  /* ====================================================== */

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: String(page),
        limit: "6",
        search,
      });

      if (activeFilter === "Featured") {
        query.append("featured", "true");
      }

      const response = await fetch(`/api/experience?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch experiences");
      }

      const data = await response.json();

      setExperiences(data.experiences || []);

      setPagination(
        data.pagination || {
          totalExperiences: 0,
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
    fetchExperiences();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  /* ====================================================== */
  /* DELETE */
  /* ====================================================== */

  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,
      totalExperiences: Math.max(0, prev.totalExperiences - 1),
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

      <ExperienceHeader />

      {/* ====================================================== */}
      {/* STATS */}
      {/* ====================================================== */}

      <ExperienceStats />

      {/* ====================================================== */}
      {/* TOOLBAR */}
      {/* ====================================================== */}

      <ExperienceToolbar
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
      ) : experiences.length === 0 ? (
        /* ====================================================== */
        /* EMPTY */
        /* ====================================================== */

        <EmptyProjects
          title="No Experiences Found"
          description="Try changing your search or filters to find experiences."
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
            {experiences.map((item) => (
              <ExperienceCard
                key={item._id}
                experience={item}
                view={view}
                onDelete={handleDeleteExperience}
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

export default Experiance;
