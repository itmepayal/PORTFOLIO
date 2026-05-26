"use client";

import { useEffect, useMemo, useState } from "react";

import ProjectsHeader from "@/components/dashboard/sections/projects/projects-header";
import ProjectsStats from "@/components/dashboard/sections/projects/projects-stats";
import ProjectsToolbar from "@/components/dashboard/sections/projects/projects-toolbar";
import ProjectCard from "@/components/dashboard/sections/projects/projects-card";
import ProjectCardSkeleton from "@/components/dashboard/skeleton/project-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

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

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [view, setView] = useState<"grid" | "list">("grid");

  /* ====================================================== */
  /* FETCH PROJECTS */
  /* ====================================================== */

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ====================================================== */
  /* DELETE PROJECT */
  /* ====================================================== */

  const handleDeleteProject = async (id: string) => {
    // OPTION 1
    // instant UI update

    setProjects((prev) => prev.filter((project) => project._id !== id));

    // OPTION 2
    // refetch all projects

    // await fetchProjects();
  };

  /* ====================================================== */
  /* FILTERED PROJECTS */
  /* ====================================================== */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Published"
            ? project.isPublished
            : !project.isPublished;

      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [projects, search, activeFilter]);

  /* ====================================================== */
  /* RENDER */
  /* ====================================================== */

  return (
    <section className="space-y-8">
      <ProjectsHeader />
      <ProjectsStats />
      <ProjectsToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        view={view}
        setView={setView}
      />
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyProjects
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
          }}
        />
      ) : (
        <div
          className={
            view === "grid"
              ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-6"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              view={view}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
