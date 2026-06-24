"use client";

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

const ACCENT_LINES = [
  "linear-gradient(90deg, var(--color-primary), var(--color-accent2))",
  "linear-gradient(90deg, var(--color-cyan), var(--color-primary))",
  "linear-gradient(90deg, var(--color-green), var(--color-cyan))",
  "linear-gradient(90deg, var(--color-orange), #f59e0b)",
  "linear-gradient(90deg, var(--color-accent2), var(--color-orange))",
  "linear-gradient(90deg, #f43f5e, var(--color-orange))",
];

const clipPath = "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)";

const SectionHeader = ({ index, title }: { index: string; title: string }) => (
  <div className="mb-6 flex items-end gap-4">
    <div>
      <div className="mb-1 font-mono text-[0.68rem] tracking-[0.15em] text-primary">
        {index}
      </div>
      <h2 className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] leading-[1.1] text-foreground">
        {title}
      </h2>
    </div>
    <div className="mb-1.5 h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
  </div>
);

const StatBlock = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="relative overflow-hidden border border-border bg-card px-5 py-4 transition-colors duration-200 hover:bg-card-h">
    <div className="truncate font-mono text-sm font-medium text-foreground">
      {value}
    </div>
    <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </div>
  </div>
);

const Loading = () => (
  <div className="min-h-screen bg-background px-[5%] pb-16 pt-28">
    <div className="mx-auto max-w-300 animate-pulse space-y-6">
      <div className="h-8 w-40 border border-border bg-card" />
      <div className="h-80 w-full border border-border bg-card" />
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-card" />
        ))}
      </div>
      <div className="h-32 border border-border bg-card" />
    </div>
  </div>
);

const NotFoundState = ({ onBack }: { onBack: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-[5%]">
    <div className="max-w-sm space-y-5 text-center">
      <div className="font-mono text-[0.68rem] tracking-[0.2em] text-primary">
        ERROR · 404
      </div>
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
        Project not found
      </h2>
      <p className="text-sm font-light text-muted-foreground">
        This project doesn&apos;t exist or has been removed.
      </p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[0.78rem] tracking-[0.05em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        <HiArrowLeft className="size-3.5" />
        Go Back
      </button>
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

  if (loading) return <Loading />;
  if (error || !project) return <NotFoundState onBack={() => router.back()} />;

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  const accentLine =
    ACCENT_LINES[
      Math.abs(
        project._id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0),
      ) % ACCENT_LINES.length
    ];

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="px-[5%]">
        <div className="mx-auto max-w-300">
          <button
            onClick={() => router.push("/")}
            className="group mb-8 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            <HiArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Home
          </button>
        </div>
      </div>

      <section className="px-[5%]">
        <div className="relative mx-auto max-w-300 border border-border bg-card">
          <div
            className="absolute left-0 right-0 top-0 h-0.5"
            style={{ background: accentLine }}
          />
          <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-cyan">
                {project.category}
              </span>
              {project.featured && (
                <span className="border border-orange/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-orange">
                  ★ Featured
                </span>
              )}
              <span className="border border-green/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-green">
                Published
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 font-mono text-[0.7rem] text-white/55">
              {formattedDate}
            </p>
          </div>
        </div>
      </section>

      <section className="px-[5%] pt-px">
        <div className="mx-auto max-w-300">
          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            <StatBlock
              label="Live demo"
              value={
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors hover:text-cyan"
                >
                  View site ↗
                </a>
              }
            />
            <StatBlock
              label="Source code"
              value={
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors hover:text-cyan"
                >
                  GitHub ↗
                </a>
              }
            />
            <StatBlock label="Technologies" value={project.tech.length} />
            <StatBlock label="Key features" value={project.features.length} />
          </div>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="mx-auto max-w-300">
          <div className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-primary to-accent2" />
            <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
              About this project
            </div>
            <p className="text-sm font-light leading-7 text-muted-foreground sm:text-[0.95rem] sm:leading-[1.85rem]">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface px-[5%] py-12">
        <div className="mx-auto max-w-300">
          <SectionHeader index="01 — STACK" title="Tech Stack" />
          <div className="flex flex-wrap gap-px border border-border bg-border">
            {project.tech.map((tech, i) => {
              const Icon = iconMap[tech.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group flex max-w-[calc(50%-1px)] flex-1 basis-37.5 items-center gap-2.5 bg-card px-3.5 py-3 transition-colors duration-200 hover:bg-card-h sm:max-w-[calc(20%-1px)]"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center text-primary">
                    {Icon && <Icon className="size-4" />}
                  </div>
                  <span className="truncate font-mono text-[0.72rem] text-dimmed">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="mx-auto max-w-300">
          <SectionHeader index="02 — FEATURES" title="Key Features" />
          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.025 }}
                className="flex items-start gap-3 bg-card px-4 py-4 transition-colors duration-200 hover:bg-card-h"
              >
                <span className="mt-1 shrink-0 font-mono text-[0.7rem] text-primary">
                  ▸
                </span>
                <span className="text-[0.85rem] leading-relaxed text-muted-foreground">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-[5%] py-12">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-center gap-3 border border-border bg-card p-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-linear-to-br from-primary to-accent2 px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 sm:flex-none"
            style={{ clipPath }}
          >
            <HiExternalLink className="size-4" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:flex-none"
          >
            <FaGithub className="size-4" />
            View Source
          </a>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <p className="hidden font-mono text-[0.68rem] text-muted-foreground sm:block">
            Published {formattedDate}
          </p>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="relative mx-auto max-w-300 overflow-hidden border border-border bg-card p-8 text-center sm:p-14">
          <div
            className="absolute -top-[40%] right-[-15%] h-105 w-105 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 16%, transparent), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
              Interested in this work?
            </div>
            <h3 className="mb-4 text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl">
              Let&apos;s build
              <br />
              <span className="bg-linear-to-r from-primary via-accent2 to-cyan bg-clip-text text-transparent">
                something great.
              </span>
            </h3>
            <p className="mx-auto mb-8 max-w-md text-sm font-light text-muted-foreground">
              Available for freelance backend projects, API architecture
              reviews, and full-stack collaborations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-linear-to-br from-primary to-accent2 px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                style={{ clipPath }}
              >
                Get in touch
                <HiArrowRight className="size-3.5" />
              </a>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 border border-border px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                View all projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
