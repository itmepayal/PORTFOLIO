"use client";

import { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Container } from "../common/container";
import { motion, AnimatePresence } from "framer-motion";
import { FaNodeJs, FaGithub, FaGitAlt, FaReact } from "react-icons/fa6";
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
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";

const iconMap = {
  FaReact,
  FaGithub,
  FaGitAlt,
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
};

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
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({});
  const [expandedFeatures, setExpandedFeatures] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects?limit=3");
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      {/* ====================================================== */}
      {/* SECTION */}
      {/* ====================================================== */}
      <section className="relative overflow-hidden py-6 md:py-12">
        {/* ====================================================== */}
        {/* BACKGROUND */}
        {/* ====================================================== */}
        <div className="absolute inset-0 -z-20 bg-background" />
        <div className=" absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolutetop-0left-1/2-translate-x-1/2w-125h-125rounded-fullbg-primary/10dark:bg-primary/15blur-3xl" />
        {/* ====================================================== */}
        {/* CONTAINER */}
        {/* ====================================================== */}
        <div className=" relative z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}
          <div className=" flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 sm:mb-16">
            {/* ====================================================== */}
            {/* LEFT */}
            {/* ====================================================== */}
            <div className="max-w-3xl">
              <p className=" text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
                Backend Engineering
              </p>
              <h2 className=" mt-4 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[0.95] text-foreground">
                Scalable Systems
                <span className=" block bg-linear-to-r from-primary via-primary to-chart-3 bg-clip-text text-transparent">
                  & Production APIs
                </span>
              </h2>
              <p className=" mt-6 max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground">
                I specialize in building enterprise-grade backend systems with
                authentication, RBAC, WebSockets, caching layers, scalable APIs,
                payment systems, and realtime infrastructure.
              </p>
            </div>

            {/* ====================================================== */}
            {/* RIGHT STATS */}
            {/* ====================================================== */}
            <div className=" grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
              {[
                {
                  label: "Projects",
                  value: `+ ${projects.length}`,
                },
                {
                  label: "APIs",
                  value: "50+",
                },
                {
                  label: "Uptime",
                  value: "99.9%",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -5,
                  }}
                  className=" rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl px-4 sm:px-5 py-5 text-center min-w-22.5 sm:min-w-27.5 shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                >
                  <h3 className=" text-xl sm:text-2xl font-black text-foreground">
                    {item.value}
                  </h3>
                  <p className=" mt-1 text-[10px] sm:text-xs text-muted-foreground">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* ====================================================== */}
          {/* PROJECT GRID */}
          {/* ====================================================== */}
          <div className="relative min-h-175">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7"
              >
                {projects.map((project, i) => {
                  return (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -10,
                      }}
                      className="group"
                    >
                      <div className=" relative flex flex-col h-full min-h-155 overflow-hidden rounded-4xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-2xl shadow-xl shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]">
                        <div className=" absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        <div className=" absolute top-0 right-0 w-56 h-56 rounded-full bg-primary/10 dark:bg-primary/15 blur-[120px] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <div className=" relative z-10 flex flex-col h-full p-5 sm:p-7">
                          <div className=" inline-flex items-center gap-2 w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary">
                            {project.category}
                          </div>
                          <div className="relative overflow-hidden rounded-3xl my-6 border border-border bg-card shadow-lg group">
                            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
                            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 dark:ring-white/5" />
                          </div>
                          <h3 className=" mt-5 text-2xl sm:text-3xl font-black tracking-[-0.03em] leading-tight text-foreground">
                            {project.title}
                          </h3>
                          <div className="mt-4">
                            <p
                              className={` text-sm sm:text-base leading-7 text-muted-foreground ${expandedProject === project._id ? "" : "line-clamp-3"}`}
                            >
                              {project.description}
                            </p>
                            {project.description.length > 150 && (
                              <button
                                onClick={() =>
                                  setExpandedProject(
                                    expandedProject === project._id
                                      ? null
                                      : project._id,
                                  )
                                }
                                className="
                                mt-2
                                text-sm
                                font-medium
                                text-primary
                                hover:underline
                                transition-colors
                              "
                              >
                                {expandedProject === project._id
                                  ? "Read Less"
                                  : "Read More"}
                              </button>
                            )}
                          </div>

                          <div className="mt-8 max-h-40 overflow-y-auto pr-2">
                            <div className="grid grid-cols-2 gap-3">
                              {project.tech
                                .slice(
                                  0,
                                  expandedTech[project._id]
                                    ? project.tech.length
                                    : 4,
                                )
                                .map((tech, idx) => {
                                  const Icon = iconMap[tech.icon];
                                  return (
                                    <motion.div
                                      key={idx}
                                      whileHover={{ scale: 1.05 }}
                                      className=" flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 dark:bg-background/40 px-3 py-2 text-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10"
                                    >
                                      <div className=" flex items-center justify-center size-8 rounded-xl bg-primary/10 text-primary">
                                        {Icon && <Icon className="size-4" />}
                                      </div>
                                      <span className="font-medium text-foreground truncate">
                                        {tech.name}
                                      </span>
                                    </motion.div>
                                  );
                                })}
                            </div>
                            {project.tech.length > 4 && (
                              <button
                                onClick={() =>
                                  setExpandedTech((prev) => ({
                                    ...prev,
                                    [project._id]: !prev[project._id],
                                  }))
                                }
                                className="
                                mt-4
                                text-sm
                                font-medium
                                text-primary
                                hover:underline
                                transition
                              "
                              >
                                {expandedTech[project._id]
                                  ? "Show Less"
                                  : `Show More (+${project.tech.length - 4})`}
                              </button>
                            )}
                          </div>

                          {/* ====================================================== */}
                          {/* FEATURES */}
                          {/* ====================================================== */}
                          <div className="mt-8 max-h-56 overflow-y-auto pr-2">
                            <div className="space-y-3">
                              {project.features
                                .slice(
                                  0,
                                  expandedFeatures[project._id]
                                    ? project.features.length
                                    : 3,
                                )
                                .map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className=" flex items-center gap-3 rounded-2xl border border-border/50 bg-background/50 dark:bg-background/30 px-4 py-3 transition-all duration-300 hover:border-primary/20"
                                  >
                                    <div className=" size-2 rounded-full bg-primary shadow-[0_0_20px_rgba(139,92,246,0.9)]" />
                                    <span className=" text-sm text-muted-foreground">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                            </div>
                            {project.features.length > 3 && (
                              <button
                                onClick={() =>
                                  setExpandedFeatures((prev) => ({
                                    ...prev,
                                    [project._id]: !prev[project._id],
                                  }))
                                }
                                className="
                                mt-4
                                text-sm
                                font-medium
                                text-primary
                                hover:underline
                                transition-all
                                duration-300
                              "
                              >
                                {expandedFeatures[project._id]
                                  ? "Show Less"
                                  : `Show More (+${project.features.length - 3})`}
                              </button>
                            )}
                          </div>

                          <div className="mt-auto pt-8">
                            <div className="flex gap-3">
                              <Button className=" flex-1 h-11 sm:h-12 rounded-2xl text-sm shadow-lg shadow-primary/20">
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  Live API
                                  <HiArrowRight className="ml-2 size-4" />
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                className=" h-11 sm:h-12 aspect-square rounded-2xl border-border/70 bg-background/70 dark:bg-background/40 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/10"
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`View ${project.title} source code on GitHub`}
                                >
                                  <FaGithub className="size-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className=" absolute inset-0 rounded-4xl border border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ====================================================== */}
          {/* PAGINATION */}
          {/* ====================================================== */}
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-10 px-4 rounded-xl border border-border disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`h-10 w-10 rounded-xl border transition-all duration-300 ${
                  currentPage === idx + 1
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="h-10 px-4 rounded-xl border border-border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
};
