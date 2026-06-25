"use client";

import Link from "next/link";
import {
  FolderKanban,
  BriefcaseBusiness,
  Brain,
  MessageSquareMore,
  ArrowUpRight,
  Plus,
  Settings,
  LayoutDashboard,
  Code2,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardStats as DashboardStatsSkeleton } from "../skeletons/DashboardStatsSkeleton";

type DashboardStat = {
  label: string;
  value: number;
  icon: string;
};

const iconMap = {
  FolderKanban,
  BriefcaseBusiness,
  Brain,
  MessageSquareMore,
  Code2,
  Target,
};

export default function DashboardHero() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
          setCompletion(data.completionPercentage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const actions = [
    {
      title: "New Project",
      description: "Create and publish a new project",
      href: "/dashboard/projects/create",
      icon: FolderKanban,
    },
    {
      title: "Add Experience",
      description: "Add a new work experience",
      href: "/dashboard/experiences/create",
      icon: BriefcaseBusiness,
    },
    {
      title: "Add Skill",
      description: "Add and manage your skills",
      href: "/dashboard/skills/create",
      icon: Brain,
    },
    {
      title: "Add DSA Problem",
      description: "Add and manage DSA problems",
      href: "/dashboard/dsa/create",
      icon: Brain,
    },
    {
      title: "View Enquiries",
      description: "Review and respond to client messages",
      href: "/dashboard/enquiries",
      icon: MessageSquareMore,
    },
    {
      title: "Settings",
      description: "Manage application settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <section className="space-y-5">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden border border-border bg-card/40 p-8 backdrop-blur-[18px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-chart-3"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Portfolio Dashboard</span>
            </div>
            <h1 className="mt-5 text-[clamp(1.8rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
              Welcome Back
              <span className="bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent">
                .
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-light text-muted-foreground sm:text-base">
              Manage projects, experiences, skills, enquiries, and monitor your
              portfolio performance from one powerful dashboard.
            </p>
          </div>

          <div className="min-w-70 border border-border bg-background/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground">
                Portfolio Completion
              </p>
              <div className="border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-mono text-[0.62rem] text-chart-3">
                +12%
              </div>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-5xl font-bold text-transparent">
                {completion}%
              </span>
              <ArrowUpRight className="mb-2 h-5 w-5 text-chart-3" />
            </div>
            <p className="mt-2 text-sm font-light text-muted-foreground">
              Great progress! Complete a few more sections to reach 100%.
            </p>
            <div className="mt-5 h-2 overflow-hidden border border-border bg-muted">
              <div
                className="h-full bg-linear-to-r from-primary to-secondary-foreground"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <DashboardStatsSkeleton key={index} />
            ))
          : stats.map((item, index) => {
              const Icon =
                iconMap[item.icon as keyof typeof iconMap] || FolderKanban;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * index,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden border border-border bg-card/40 px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60 hover:-translate-y-1"
                >
                  <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </p>
                      <h3 className="mt-2 bg-linear-to-br from-primary to-chart-3 bg-clip-text text-3xl font-bold text-transparent">
                        {item.value}
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="border border-border bg-card/40 p-6 backdrop-blur-xl">
        <div className="mb-6">
          <div className="mb-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-chart-3">
            Shortcuts
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Quick Actions
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Frequently used dashboard shortcuts
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative overflow-hidden border border-border bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-border bg-card text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="border border-border p-1.5 text-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="relative mt-4 font-semibold text-foreground">
                  {action.title}
                </h3>
                <p className="relative mt-1 font-mono text-[0.72rem] text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
