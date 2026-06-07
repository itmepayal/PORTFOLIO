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
import { DashboardStats } from "../skeletons/DashboardStats";

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
      <div className="relative overflow-hidden rounded-4xl border border-border/50 bg-card/60 p-8 backdrop-blur-xl">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur">
              <LayoutDashboard className="h-4 w-4" />
              <span>Portfolio Dashboard</span>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Welcome Back 👋
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Manage projects, experiences, skills, enquiries, and monitor your
              portfolio performance from one powerful dashboard.
            </p>
          </div>

          <div className="min-w-70 rounded-3xl border border-border/50 bg-background/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Portfolio Completion
              </p>
              <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                +12%
              </div>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-black">{completion}%</span>
              <ArrowUpRight className="mb-2 h-5 w-5 text-green-500" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Great progress! Complete a few more sections to reach 100%.
            </p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-primary/70"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <DashboardStats key={index} />
            ))
          : stats.map((item) => {
              const Icon =
                iconMap[item.icon as keyof typeof iconMap] || FolderKanban;
              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-border/50 bg-card/50 px-5 py-8 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <h3 className="mt-2 text-3xl font-black">{item.value}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="rounded-4xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">
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
                className=" group rounded-3xl border border-border/50 bg-background/50 p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="rounded-xl bg-primary/10 p-2 text-primary opacity-0 transition-all group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-4 font-semibold">{action.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
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
