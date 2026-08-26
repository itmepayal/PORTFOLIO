"use client";

import { useState, useEffect } from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { SectionEmptyState } from "../common/SectionEmptyState";
import { ProjectsViewToolbar } from "../common/ProjectsViewToolbar";
import { getProjectWorkTypeLabel } from "@/lib/project";
import { FaGithub, FaReact, FaGitAlt, FaNodeJs } from "react-icons/fa6";
import {
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiJsonwebtokens,
  SiSwagger,
  SiReactrouter,
  SiTailwindcss,
  SiRender,
  SiMongodb,
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";
import {
  TbApi,
  TbChevronLeft,
  TbChevronRight,
  TbExternalLink,
  TbDots,
  TbFolderOff,
} from "react-icons/tb";
import { ProjectSkeleton } from "../skeletons/ProjectSkeleton";

const iconMap = {
  FaReact,
  FaGithub,
  FaGitAlt,
  FaNodeJs,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiJsonwebtokens,
  SiSwagger,
  SiReactrouter,
  SiTailwindcss,
  SiRender,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  TbApi,
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
};

const ACCENT_CLASSES = [
  "from-primary to-accent2",
  "from-cyan to-primary",
  "from-green to-cyan",
  "from-orange to-amber-400",
  "from-accent2 to-orange",
  "from-rose-500 to-orange",
];

// Fixed span pattern for grid view, keyed by position within a page (0-3).
const GRID_SPAN_PATTERN = [
  "col-span-12 lg:col-span-7",
  "col-span-12 lg:col-span-5",
  "col-span-12 sm:col-span-6 lg:col-span-4",
  "col-span-12 sm:col-span-6 lg:col-span-8",
];

interface Tech {
  name: string;
  icon: keyof typeof iconMap;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: Tech[];
  features: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  category: string;
  workType?: "company" | "freelance" | "self";
  company?: string;
}

const ITEMS_PER_PAGE = 4;

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/projects?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        );
        const data = await response.json();
        if (cancelled) return;
        if (data.success) {
          setProjects(data.projects);
          setTotalProjects(data.pagination.totalProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const hasProjects = totalProjects > 0;
  const showToolbar = !loading && hasProjects;
  const startIndex = hasProjects ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = hasProjects
    ? Math.min(currentPage * ITEMS_PER_PAGE, totalProjects)
    : 0;

  const gotoPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getSpanClass = (i: number) =>
    viewMode === "list" ? "col-span-12" : GRID_SPAN_PATTERN[i % 4];

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, totalPages, currentPage]);
    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);
    return Array.from(pages).sort((a, b) => a - b);
  };
  const visiblePages = getVisiblePages();

  return (
    <Container id="projects" background="surface">
      <SectionHeader
        label="01 — PROJECTS"
        title="Selected Work"
        actions={
          showToolbar ? (
            <ProjectsViewToolbar viewMode={viewMode} onChange={setViewMode} />
          ) : undefined
        }
      />

      {showToolbar && (
        <div className="reveal mb-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="font-mono text-[0.68rem] sm:text-[0.72rem] text-muted-foreground">
            Showing{" "}
            <strong className="text-primary">
              {startIndex}–{endIndex}
            </strong>{" "}
            of <strong className="text-primary">{totalProjects}</strong> projects
          </div>
        </div>
      )}

      {loading ? (
        <div
          className={`reveal mb-6 grid gap-px border border-border bg-border ${viewMode === "list" ? "grid-cols-1" : "grid-cols-12"}`}
        >
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={i} className={`bg-card ${getSpanClass(i)}`}>
              <ProjectSkeleton />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <SectionEmptyState
          icon={TbFolderOff}
          title="No projects yet"
          description="Projects will appear here once they are published from the dashboard."
        />
      ) : (
        <div
          className={`reveal mb-6 grid gap-px border border-border bg-border ${viewMode === "list" ? "grid-cols-1" : "grid-cols-12"}`}
        >
          {projects.map((project, i) => {
            const accentClass = ACCENT_CLASSES[i % ACCENT_CLASSES.length];
            const spanClass = getSpanClass(i);

            return (
              <div
                key={project._id}
                className={`group relative flex flex-col overflow-hidden bg-card hover:bg-card-h transition-colors duration-200 ${spanClass}`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${accentClass}`}
                />

                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-linear-to-r from-primary to-cyan transition-all duration-400 ease-out" />

                <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7">
                  <div className="mb-3 sm:mb-4 font-mono text-[0.6rem] sm:text-[0.63rem] tracking-[0.15em] text-muted-foreground uppercase">
                    PROJECT{" "}
                    {String(
                      (currentPage - 1) * ITEMS_PER_PAGE + i + 1,
                    ).padStart(3, "0")}
                  </div>

                  <div className="mb-2.5 sm:mb-3 font-sans text-[1.05rem] sm:text-[1.2rem] font-bold tracking-[-0.02em]">
                    {project.title}
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center border border-border bg-(--bg) px-2 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">
                      {getProjectWorkTypeLabel(project.workType)}
                    </span>
                    {project.workType === "company" && project.company && (
                      <span className="inline-flex items-center border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-primary">
                        {project.company}
                      </span>
                    )}
                  </div>

                  <p className="flex-1 mb-5 sm:mb-6 text-[0.825rem] sm:text-[0.875rem] font-light leading-[1.6] sm:leading-[1.65] line-clamp-2 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((t, idx) => {
                        const Icon = iconMap[t.icon];
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] sm:text-[0.63rem] text-muted-foreground bg-(--bg) border border-border px-2 sm:px-2.5 py-1 leading-none"
                          >
                            {Icon && (
                              <Icon className="text-[0.85rem] sm:text-[0.9rem] shrink-0" />
                            )}
                            {t.name}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[0.66rem] sm:text-[0.68rem] tracking-[0.05em] text-primary hover:text-cyan transition-colors"
                        >
                          <FaGithub className="text-[0.85rem]" />
                          GitHub
                          <TbExternalLink className="text-[0.8rem]" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[0.66rem] sm:text-[0.68rem] tracking-[0.05em] text-primary hover:text-cyan transition-colors"
                        >
                          Live
                          <TbExternalLink className="text-[0.8rem]" />
                        </a>
                      )}

                      <a
                        href={`/projects/${project._id}`}
                        className="inline-flex items-center gap-1 font-mono text-[0.66rem] sm:text-[0.68rem] tracking-[0.05em] text-primary hover:text-cyan transition-colors"
                      >
                        More
                        <TbExternalLink className="text-[0.8rem]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && !loading && (
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
          <div className="font-mono text-[0.68rem] sm:text-[0.72rem] text-muted-foreground order-2 sm:order-1">
            Page <strong className="text-primary">{currentPage}</strong> of{" "}
            <strong className="text-primary">{totalPages}</strong>
          </div>

          <div className="flex gap-1.5 items-center order-1 sm:order-2 flex-wrap justify-center">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="font-mono text-[0.7rem] sm:text-[0.72rem] w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <TbChevronLeft className="text-[1rem]" />
            </button>

            {visiblePages.map((page, idx) => {
              const prevPage = visiblePages[idx - 1];
              const showEllipsis =
                prevPage !== undefined && page - prevPage > 1;
              return (
                <span key={page} className="flex items-center gap-1.5">
                  {showEllipsis && (
                    <TbDots className="text-muted-foreground text-[1rem]" />
                  )}
                  <button
                    onClick={() => gotoPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`font-mono text-[0.7rem] sm:text-[0.72rem] w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center border transition-colors ${
                      currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              );
            })}
            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="font-mono text-[0.7rem] sm:text-[0.72rem] w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <TbChevronRight className="text-[1rem]" />
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};
