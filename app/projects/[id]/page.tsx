"use client";

import { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiArrowLeft, HiArrowRight, HiExternalLink } from "react-icons/hi";
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
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

const iconMap = {
  FaNodeJs,
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
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
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
  createdAt: string;
}

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const SectionHeading = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <span className="font-mono text-xs font-bold tracking-[0.15em] text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5">
      {number}
    </span>
    <h2 className="text-lg sm:text-xl font-black tracking-[-0.02em] text-foreground">
      {title}
    </h2>
    <div className="flex-1 h-px bg-border/50" />
  </div>
);

const MetaCard = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl px-4 py-3.5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5">
    <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10 text-primary shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-0.5">
        {label}
      </p>
      <div className="text-sm font-medium text-foreground truncate">
        {children}
      </div>
    </div>
  </div>
);

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        data.success ? setProject(data.project) : setError(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <Container>
        <section>
          <div className="absolute inset-0 -z-20 bg-background" />
          <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[60px_60px]" />
          <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-7xl space-y-6 animate-pulse">
            <div className="h-8 w-36 rounded-full bg-muted" />
            <div className="h-80 w-full rounded-3xl bg-muted" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 rounded-2xl bg-muted" />
              ))}
            </div>
            <div className="h-32 rounded-2xl bg-muted" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
        </section>
      </Container>
    );

  if (error || !project)
    return (
      <Container>
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="text-6xl mx-auto w-fit">🔍</div>
            <h2 className="text-2xl font-black text-foreground">
              Project not found
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              This project doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.back()} className="mt-2 rounded-2xl">
              <HiArrowLeft className="mr-2 size-4" /> Go Back
            </Button>
          </div>
        </section>
      </Container>
    );

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Container>
      <section>
        <div className="absolute inset-0 -z-20 bg-background" />
        <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-87.5 rounded-full bg-primary/8 dark:bg-primary/12 blur-[140px] -z-10" />
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-10"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground border border-border/60 hover:border-primary/30 hover:bg-primary/5 rounded-full px-4 py-2 transition-all duration-300 group"
            >
              <HiArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              Back to Projects
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="relative mb-8"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
                      ⭐ Featured
                    </span>
                  )}
                  <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                    Published
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.04em] leading-[0.95] text-white mb-2">
                  {project.title}
                </h1>
                <p className="text-sm text-white/50">{formattedDate}</p>
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          >
            <MetaCard
              icon={<HiExternalLink className="size-4" />}
              label="Live Demo"
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate block"
              >
                View Live Site
              </a>
            </MetaCard>
            <MetaCard
              icon={<FaGithub className="size-4" />}
              label="Source Code"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate block"
              >
                View on GitHub
              </a>
            </MetaCard>
            <MetaCard
              icon={
                <span className="text-sm font-black">
                  {project.tech.length}
                </span>
              }
              label="Technologies"
            >
              <span>{project.tech.length} in stack</span>
            </MetaCard>
            <MetaCard
              icon={
                <span className="text-sm font-black">
                  {project.features.length}
                </span>
              }
              label="Features"
            >
              <span>{project.features.length} key features</span>
            </MetaCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl p-6 sm:p-8 border-l-4 border-l-primary">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-primary mb-4">
                About this project
              </p>
              <p className="text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground relative z-10">
                {project.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mb-12"
          >
            <SectionHeading number="01" title="Tech Stack" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {project.tech.map((tech, i) => {
                const Icon = iconMap[tech.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.4 + i * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl px-3 py-3 transition-all duration-300 hover:border-primary/35 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/8 group"
                  >
                    <div className="flex items-center justify-center size-8 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      {Icon && <Icon className="size-4" />}
                    </div>
                    <span className="font-medium text-foreground truncate text-xs sm:text-sm">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mb-14"
          >
            <SectionHeading number="02" title="Key Features" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/50 dark:bg-card/30 px-4 py-3.5 transition-all duration-300 hover:border-primary/25 hover:bg-primary/5 group"
                >
                  <div className="mt-0.5 flex items-center justify-center size-5 rounded-md bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <div className="size-2 rounded-full bg-primary group-hover:shadow-[0_0_8px_rgba(139,92,246,0.9)] transition-shadow duration-300" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-6">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mb-14"
          >
            <div className="flex flex-wrap gap-3 items-center justify-center rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-2xl p-5">
              <Button
                asChild
                className="h-11 px-7 rounded-2xl text-sm shadow-lg shadow-primary/20 flex-1 sm:flex-none"
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <HiExternalLink className="size-4" />
                  Live Demo
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-11 px-7 rounded-2xl border-border/70 bg-background/70 dark:bg-background/40 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/10 text-sm flex-1 sm:flex-none"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <FaGithub className="size-4" />
                  View Source
                </a>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border/60" />
              <p className="text-xs text-muted-foreground/60 hidden sm:block">
                Published {formattedDate}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={7}
          >
            <div className="relative overflow-hidden rounded-4xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-2xl p-8 sm:p-14 text-center shadow-xl shadow-primary/5">
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-40 rounded-full bg-chart-3/10 blur-3xl" />
              <div className="relative z-10">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
                  Interested in this work?
                </p>
                <h3 className="text-2xl sm:text-4xl font-black tracking-3 leading-[0.95] text-foreground mb-5">
                  Let's build something
                  <span className="block bg-linear-to-r from-primary via-primary to-chart-3 bg-clip-text text-transparent">
                    remarkable together
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto leading-7">
                  Available for freelance backend projects, API architecture
                  reviews, and full-stack collaborations.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button className="h-12 px-8 rounded-2xl text-sm shadow-lg shadow-primary/20">
                    <a href="/#contact" className="flex items-center gap-2">
                      Get In Touch
                      <HiArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="h-12 px-8 rounded-2xl border-border/70 bg-background/70 dark:bg-background/40 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/10 text-sm"
                  >
                    View All Projects
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

export default ProjectDetailPage;
