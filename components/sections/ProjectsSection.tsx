"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { SectionEmptyState } from "../common/SectionEmptyState";
import { ProjectsViewToolbar } from "../common/ProjectsViewToolbar";
import { getProjectWorkTypeLabel } from "@/lib/project";
import { isSafeHttpsUrl } from "@/lib/utils";
import { techIconMap } from "@/lib/tech-icons";
import { FaGithub } from "react-icons/fa6";
import {
  TbAlertTriangle,
  TbArrowUpRight,
  TbChevronLeft,
  TbChevronRight,
  TbDots,
  TbExternalLink,
  TbFolderOff,
  TbRefresh,
} from "react-icons/tb";
import { ProjectSkeleton } from "../skeletons/ProjectSkeleton";

const iconMap = techIconMap;

const ACCENT_CLASSES = [
  "from-primary to-accent2",
  "from-cyan to-primary",
  "from-green to-cyan",
  "from-orange to-amber-400",
  "from-accent2 to-orange",
  "from-rose-500 to-orange",
];

/**
 * Grid spans depend on how many cards are on the page, so the last row is
 * never left half-empty (3 items -> 7/5 then one full-width card).
 */
const SPANS: Record<number, string[]> = {
  1: ["col-span-12"],
  2: ["col-span-12 lg:col-span-7", "col-span-12 lg:col-span-5"],
  3: ["col-span-12 lg:col-span-7", "col-span-12 lg:col-span-5", "col-span-12"],
  4: [
    "col-span-12 lg:col-span-7",
    "col-span-12 lg:col-span-5",
    "col-span-12 lg:col-span-5",
    "col-span-12 lg:col-span-7",
  ],
};

const ITEMS_PER_PAGE = 4;
const MAX_VISIBLE_TECH = 5;
const EASE = [0.22, 1, 0.36, 1] as const;

// Same slanted shape as the "Download Resume" button on the home page
const SLANT = "[clip-path:polygon(7%_0,100%_0,93%_100%,0_100%)]";

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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ---------------- motion variants ---------------- */

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

const scanVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3, ease: EASE } },
};

const arrowVariants: Variants = {
  hidden: { opacity: 0, x: -6, y: 6 },
  show: { opacity: 0, x: -6, y: 6 },
  hover: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25 } },
};

const chipsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE },
  },
};

const ghostVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2, ease: EASE },
  },
  hover: { x: -6, transition: { duration: 0.4 } },
};

/* ---------------- small pieces ---------------- */

// HUD corner brackets (same as the nav bar frame on the home page)
const Corners = () => {
  const base =
    "pointer-events-none absolute z-20 h-3 w-3 border-primary/70 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-cyan";
  return (
    <>
      <span aria-hidden className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${base} right-0 top-0 border-r border-t`} />
      <span
        aria-hidden
        className={`${base} bottom-0 left-0 border-b border-l`}
      />
      <span
        aria-hidden
        className={`${base} bottom-0 right-0 border-b border-r`}
      />
    </>
  );
};

const CountUp = ({ value }: { value: number }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
};

const LinkButton = ({
  href,
  label,
  external = true,
  primary = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
  children: React.ReactNode;
}) => (
  <motion.a
    href={href}
    aria-label={label}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 22 }}
    className={`group/link inline-flex items-center gap-1.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-[color,border-color,filter] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      primary
        ? `${SLANT} bg-linear-to-r from-primary to-accent2 px-6 text-white hover:brightness-125`
        : "border border-primary/25 bg-primary/5 px-3.5 text-muted-foreground hover:border-primary hover:text-primary"
    }`}
  >
    {children}
  </motion.a>
);

const ProjectCard = ({
  project,
  index,
  displayIndex,
  spanClass,
  dimmed,
  onHover,
}: {
  project: Project;
  index: number;
  displayIndex: number;
  spanClass: string;
  dimmed: boolean;
  onHover: (id: string | null) => void;
}) => {
  const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];
  const extraTech = project.tech.length - MAX_VISIBLE_TECH;
  const hasImage =
    !!project.image &&
    (isSafeHttpsUrl(project.image) || project.image.startsWith("/"));

  // cursor spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--color-primary, #6366f1) 18%, transparent), transparent 45%)`;

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18 });

  return (
    <motion.article
      layout
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => onHover(project._id)}
      onHoverEnd={() => {
        onHover(null);
        tiltX.set(0);
        tiltY.set(0);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        tiltY.set((x / rect.width - 0.5) * 5);
        tiltX.set(-(y / rect.height - 0.5) * 5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      transition={{ layout: { duration: 0.5, ease: EASE } }}
      className={`group relative flex flex-col overflow-hidden border border-primary/15 bg-card/70 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:z-10 hover:border-primary/50 hover:shadow-[0_0_50px_-14px_var(--color-primary)] ${spanClass}`}
    >
      <Corners />

      {/* spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* faint grid inside the card, like the hero background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      {/* shine sweep on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-[transform,opacity] duration-1000 ease-out group-hover:translate-x-[450%] group-hover:opacity-100"
      />

      {/* top scan line (draws in) + travelling beam on hover */}
      <motion.div
        aria-hidden
        variants={scanVariants}
        style={{ originX: 0 }}
        className={`absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r ${accentClass}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0.5 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <motion.div
          className="h-full w-1/3 bg-linear-to-r from-transparent via-cyan to-transparent"
          animate={{ x: ["-100%", "320%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* bottom line sweeps in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-0 bg-linear-to-r from-primary to-cyan transition-[width] duration-700 ease-out group-hover:w-full"
      />

      {/* dim overlay when another card is hovered */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-30 bg-black/35 transition-opacity duration-300 ${
          dimmed ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* terminal window bar */}
      <div className="relative z-10 flex items-center gap-3 border-b border-primary/15 bg-black/20 px-4 py-2.5 sm:px-5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-rose-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-green/70" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[0.6rem] tracking-[0.08em] text-muted-foreground sm:text-[0.63rem]">
          ~/projects/{slugify(project.title)}
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-[0.6rem]">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                project.featured ? "animate-ping bg-green/70" : "bg-primary/40"
              }`}
            />
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                project.featured ? "bg-green" : "bg-primary"
              }`}
            />
          </span>
          {project.featured ? "Featured" : "Project"}
        </span>
      </div>

      {/* optional preview image */}
      {hasImage && (
        <div className="relative z-10 h-36 overflow-hidden border-b border-primary/15 sm:h-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover opacity-70 saturate-50 transition-[transform,filter,opacity] duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        {/* ghost index number (kept inside the padding so it never clips) */}
        <motion.span
          aria-hidden
          variants={ghostVariants}
          className="pointer-events-none absolute right-5 top-4 select-none font-mono text-[3.5rem] font-bold leading-none tracking-tighter text-primary/[0.08] transition-colors duration-300 group-hover:text-primary/[0.18] sm:right-6 sm:text-[4.5rem]"
        >
          {String(displayIndex).padStart(2, "0")}
        </motion.span>

        {/* title */}
        <a
          href={`/projects/${project._id}`}
          className="relative mb-3 inline-flex max-w-[85%] items-start gap-2 self-start font-sans text-[1.3rem] font-extrabold leading-tight tracking-[-0.03em] outline-none focus-visible:underline sm:text-[1.7rem]"
        >
          <span className="bg-linear-to-r from-foreground to-foreground bg-clip-text transition-colors duration-300 group-hover:from-primary group-hover:to-cyan group-hover:text-transparent">
            {project.title}
          </span>
          <motion.span
            variants={arrowVariants}
            className="mt-1.5 inline-flex text-primary"
          >
            <TbArrowUpRight className="text-[1.3rem]" />
          </motion.span>
        </a>

        {/* badges */}
        <div className="relative mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted-foreground">
            {getProjectWorkTypeLabel(project.workType)}
          </span>
          {project.workType === "company" && project.company && (
            <span className="inline-flex items-center border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-primary">
              {project.company}
            </span>
          )}
        </div>

        <p className="relative mb-6 line-clamp-2 flex-1 text-[0.85rem] font-light leading-[1.7] text-muted-foreground sm:text-[0.92rem]">
          {project.description}
        </p>

        {/* tech chips: stagger in, lift on hover */}
        <motion.div
          variants={chipsVariants}
          className="relative mb-6 flex flex-wrap gap-1.5"
        >
          {project.tech.slice(0, MAX_VISIBLE_TECH).map((t, idx) => {
            const Icon = iconMap[t.icon];
            return (
              <motion.span
                key={idx}
                variants={chipVariants}
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-2 py-1.5 font-mono text-[0.58rem] uppercase leading-none tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary sm:px-2.5 sm:text-[0.62rem]"
              >
                {Icon && (
                  <Icon className="shrink-0 text-[0.85rem] sm:text-[0.9rem]" />
                )}
                {t.name}
              </motion.span>
            );
          })}
          {extraTech > 0 && (
            <motion.span
              variants={chipVariants}
              className="inline-flex items-center border border-dashed border-primary/30 px-2 py-1.5 font-mono text-[0.6rem] leading-none text-muted-foreground"
            >
              +{extraTech}
            </motion.span>
          )}
        </motion.div>

        {/* actions */}
        <div className="relative mt-auto flex flex-wrap items-center gap-2.5 border-t border-primary/15 pt-5">
          <LinkButton
            href={`/projects/${project._id}`}
            external={false}
            primary
            label={`View details of ${project.title}`}
          >
            Details
            <TbArrowUpRight className="text-[0.85rem] transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </LinkButton>
          {isSafeHttpsUrl(project.github) && (
            <LinkButton href={project.github} label="View source on GitHub">
              <FaGithub className="text-[0.85rem]" />
              GitHub
            </LinkButton>
          )}
          {isSafeHttpsUrl(project.live) && (
            <LinkButton href={project.live} label="Open live site">
              Live
              <TbExternalLink className="text-[0.8rem] transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </LinkButton>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ---------------- main component ---------------- */

export const Projects = () => {
  const { trackPromise } = useLoading();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(false);
        const reqPromise = fetch(
          `/api/projects?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        ).then((res) => res.json());

        // Track with global loader on initial page 1
        const data =
          currentPage === 1
            ? await trackPromise("projects-list", reqPromise)
            : await reqPromise;

        if (cancelled) return;
        if (data.success) {
          setProjects(data.projects);
          setTotalProjects(data.pagination.totalProjects);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [currentPage, trackPromise, reloadKey]);

  const hasProjects = totalProjects > 0;
  const showToolbar = !loading && hasProjects;
  const startIndex = hasProjects ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = hasProjects
    ? Math.min(currentPage * ITEMS_PER_PAGE, totalProjects)
    : 0;

  const gotoPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      setCurrentPage(page);
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages, currentPage],
  );

  const getSpanClass = (i: number, count: number) => {
    if (viewMode === "list") return "col-span-12";
    const pattern = SPANS[Math.min(Math.max(count, 1), 4)];
    return pattern[i % pattern.length];
  };

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

  const gridClass = "grid grid-cols-12 gap-5 sm:gap-6";

  return (
    // reducedMotion="user" respects the OS "reduce motion" setting automatically
    <MotionConfig reducedMotion="user">
      <Container id="projects" background="surface">
        <div className="relative">
          {/* background: grid + glow orbs, like the hero */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <motion.div
              className="absolute -left-12 top-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[110px]"
              animate={{ y: [0, 40, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-12 bottom-10 h-80 w-80 rounded-full bg-accent2/10 blur-[110px]"
              animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <SectionHeader
                label="01 — PROJECTS"
                title="Selected Work"
                actions={
                  showToolbar ? (
                    <ProjectsViewToolbar
                      viewMode={viewMode}
                      onChange={setViewMode}
                    />
                  ) : undefined
                }
              />
            </motion.div>

            <AnimatePresence>
              {showToolbar && (
                <motion.div
                  key="toolbar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.15em] tabular-nums text-muted-foreground sm:text-[0.72rem]">
                    <span className="h-3.5 w-0.5 bg-linear-to-b from-primary to-cyan" />
                    <span>
                      Showing{" "}
                      <strong className="text-primary">
                        {startIndex}–{endIndex}
                      </strong>{" "}
                      of{" "}
                      <strong className="text-primary">
                        <CountUp value={totalProjects} />
                      </strong>{" "}
                      projects
                    </span>
                  </div>

                  <div
                    className="hidden h-px w-40 overflow-hidden bg-primary/20 sm:block"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={totalPages}
                    aria-valuenow={currentPage}
                    aria-label="Projects page progress"
                  >
                    <motion.div
                      className="h-full bg-linear-to-r from-primary to-cyan"
                      initial={false}
                      animate={{
                        width: `${(currentPage / totalPages) * 100}%`,
                      }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-10">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    aria-busy="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={gridClass}
                  >
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <div
                        key={i}
                        className={`border border-primary/15 bg-card/60 ${getSpanClass(i, ITEMS_PER_PAGE)}`}
                      >
                        <ProjectSkeleton />
                      </div>
                    ))}
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="group relative flex flex-col items-center justify-center gap-4 border border-orange/30 bg-card/60 px-6 py-14 text-center"
                  >
                    <Corners />
                    <motion.div
                      initial={{ rotate: -12 }}
                      animate={{ rotate: [-12, 12, -8, 8, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <TbAlertTriangle className="text-3xl text-orange" />
                    </motion.div>
                    <div>
                      <p className="font-sans text-base font-bold">
                        Couldn’t load projects
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Check your connection and try again.
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setReloadKey((k) => k + 1)}
                      whileHover="hover"
                      whileTap={{ scale: 0.96 }}
                      className={`${SLANT} inline-flex items-center gap-2 bg-linear-to-r from-primary to-accent2 px-7 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-white hover:brightness-110`}
                    >
                      <motion.span
                        variants={{ hover: { rotate: 180 } }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex"
                      >
                        <TbRefresh />
                      </motion.span>
                      Retry
                    </motion.button>
                  </motion.div>
                ) : projects.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <SectionEmptyState
                      icon={TbFolderOff}
                      title="No projects yet"
                      description="Projects will appear here once they are published from the dashboard."
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`page-${currentPage}`}
                    layout
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={gridClass}
                  >
                    {projects.map((project, i) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        index={i}
                        displayIndex={
                          (currentPage - 1) * ITEMS_PER_PAGE + i + 1
                        }
                        spanClass={getSpanClass(i, projects.length)}
                        dimmed={hoveredId !== null && hoveredId !== project._id}
                        onHover={setHoveredId}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {totalPages > 1 && !loading && !error && (
              <motion.nav
                aria-label="Projects pagination"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center justify-center gap-3 sm:justify-between sm:gap-4"
              >
                <div className="order-2 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted-foreground sm:order-1 sm:text-[0.72rem]">
                  Page <strong className="text-primary">{currentPage}</strong> /{" "}
                  <strong className="text-primary">{totalPages}</strong>
                </div>

                <div className="order-1 flex flex-wrap items-center justify-center gap-1.5 sm:order-2">
                  <motion.button
                    onClick={() => gotoPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-9 w-9 items-center justify-center border border-primary/25 bg-primary/5 font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <TbChevronLeft className="text-[1rem]" />
                  </motion.button>

                  {visiblePages.map((page, idx) => {
                    const prevPage = visiblePages[idx - 1];
                    const showEllipsis =
                      prevPage !== undefined && page - prevPage > 1;
                    const active = currentPage === page;
                    return (
                      <span key={page} className="flex items-center gap-1.5">
                        {showEllipsis && (
                          <TbDots className="text-[1rem] text-muted-foreground" />
                        )}
                        <motion.button
                          onClick={() => gotoPage(page)}
                          aria-label={`Page ${page}`}
                          aria-current={active ? "page" : undefined}
                          whileHover={active ? undefined : { y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          className={`relative flex h-9 w-9 items-center justify-center border font-mono text-[0.72rem] transition-colors ${
                            active
                              ? "border-primary text-white"
                              : "border-primary/25 bg-primary/5 text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-page-pill"
                              className="absolute inset-0 bg-linear-to-br from-primary to-accent2 shadow-[0_6px_20px_-6px_var(--color-primary)]"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                            />
                          )}
                          <span className="relative z-10">{page}</span>
                        </motion.button>
                      </span>
                    );
                  })}

                  <motion.button
                    onClick={() => gotoPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-9 w-9 items-center justify-center border border-primary/25 bg-primary/5 font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <TbChevronRight className="text-[1rem]" />
                  </motion.button>
                </div>
              </motion.nav>
            )}
          </div>
        </div>
      </Container>
    </MotionConfig>
  );
};
