"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectsHeader from "@/components/dashboard/sections/projects/ProjectHeader";
import ProjectsStats from "@/components/dashboard/sections/projects/ProjectStats";
import ProjectsToolbar from "@/components/dashboard/sections/projects/ProjectToolbar";
import ProjectCard from "@/components/dashboard/sections/projects/ProjectCard";
import ProjectCardSkeleton from "@/components/dashboard/skeleton/ProjectCard";
import EmptyProjects from "@/components/dashboard/sections/projects/EmptyProjects";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

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
          {Array.from({ length: 3 }).map((_, index) => (
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

export default Projects;
