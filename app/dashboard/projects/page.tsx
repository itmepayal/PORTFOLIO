"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectsHeader from "@/components/dashboard/sections/projects/projects-header";
import ProjectsStats from "@/components/dashboard/sections/projects/projects-stats";
import ProjectsToolbar from "@/components/dashboard/sections/projects/projects-toolbar";
import ProjectCard from "@/components/dashboard/sections/projects/projects-card";
import ProjectCardSkeleton from "@/components/dashboard/skeleton/project-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";
import { Button } from "@/components/ui/button";

interface Tech {
  name: string;
  icon: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  isPublished: boolean;
  live: string;
  github: string;
  image?: string;
  features: string[];
  tech: Tech[];
  featured?: boolean;
}

interface Pagination {
  totalProjects: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<Pagination>({
    totalProjects: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: "3",
        search,
        filter: activeFilter,
      });
      const response = await fetch(`/api/projects?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data.projects || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search, activeFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteProject = useCallback(
    (id: string) => {
      setProjects((prev) => prev.filter((project) => project._id !== id));

      setPagination((prev) => ({
        ...prev,
        totalProjects: prev.totalProjects - 1,
      }));

      fetchProjects();
    },
    [fetchProjects],
  );

  return (
    <section className="space-y-8">
      <ProjectsHeader />
      <ProjectsStats />
      <ProjectsToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyProjects
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-2xl px-5"
              >
                Previous
              </Button>
              <div className="rounded-2xl border border-border/50 bg-muted/30 px-5 py-2.5 text-sm text-muted-foreground">
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
                className="rounded-2xl px-5"
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

export default Projects;
