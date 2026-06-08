"use client";

import { useEffect, useState } from "react";

import ExperienceHeader from "@/components/dashboard/sections/experiances/experience-header";
import ExperienceStats from "@/components/dashboard/sections/experiances/experience-stats";
import ExperienceToolbar from "@/components/dashboard/sections/experiances/experience-toolbar";
import ExperienceCard from "@/components/dashboard/sections/experiances/experience-card";
import EmptyProjects from "@/components/dashboard/sections/experiances/empty-card";
import ExperienceCardSkeleton from "@/components/dashboard/skeleton/experience-card";
import { Button } from "@/components/ui/button";

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

const Experiance = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalExperiences: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

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

      const response = await fetch(`/api/experiences?${query}`);

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

  useEffect(() => {
    fetchExperiences();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,
      totalExperiences: Math.max(0, prev.totalExperiences - 1),
    }));
    fetchExperiences();
  };

  return (
    <section className="space-y-8">
      <ExperienceHeader />
      <ExperienceStats />
      <ExperienceToolbar
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
            <ExperienceCardSkeleton key={index} />
          ))}
        </div>
      ) : experiences.length === 0 ? (
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
          <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
            {experiences.map((item) => (
              <ExperienceCard
                key={item._id}
                experience={item}
                onDelete={handleDeleteExperience}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
                pt-3
              "
            >
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
