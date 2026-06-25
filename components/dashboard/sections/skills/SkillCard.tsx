"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Brain,
  Sparkles,
  Loader2,
  Star,
  Activity,
  BadgeCheck,
  Target,
} from "lucide-react";
import { toast } from "sonner";

interface SkillsCardProps {
  skill: {
    _id?: string;
    title: string;
    category:
      | "frontend"
      | "backend"
      | "database"
      | "devops"
      | "mobile"
      | "language"
      | "tool"
      | "cloud"
      | "other";
    icon: string;
    level: number;
    featured?: boolean;
    order?: number;
  };
  onDelete?: (id: string) => void;
}

const categoryStyles: Record<string, string> = {
  frontend: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  backend: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  database: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  devops: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  mobile: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  language: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  tool: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  cloud: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  other: "border-border bg-muted text-muted-foreground",
};

const SkillsCard = ({ skill, onDelete }: SkillsCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!skill._id) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${skill.title}"?`,
    );
    if (!confirmDelete) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/skills/${skill._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete skill");
      toast.success("Skill deleted successfully");
      onDelete?.(skill._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!skill._id) return;
    router.push(`/dashboard/skills/edit/${skill._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative h-full overflow-hidden border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60"
    >
      {/* Corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-1 flex h-full flex-col gap-6 p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest ${categoryStyles[skill.category]}`}
            >
              <Brain className="h-3 w-3" />
              {skill.category}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-border bg-muted px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <Activity className="h-3 w-3" />
              {skill.level}%
            </span>
            {skill.featured && (
              <span className="inline-flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-yellow-500">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>
          {/* Action buttons */}
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleEdit}
              className="flex h-9 w-9 items-center justify-center border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              disabled={deleting}
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center border border-red-500/30 bg-red-500/10 text-red-500 transition-colors hover:border-red-500/60 hover:bg-red-500/20 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary md:text-3xl">
            {skill.title}
          </h2>
          <p className="mt-3 text-sm font-light leading-7 text-muted-foreground">
            Professional{" "}
            <span className="font-medium capitalize">{skill.category}</span>{" "}
            skill with{" "}
            <span className="font-semibold text-primary">{skill.level}%</span>{" "}
            proficiency.
          </p>
        </div>

        {/* Skill level bar */}
        <div className="border border-border bg-background/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-primary" />
              Skill Level
            </div>
            <span className="font-mono text-[0.75rem] font-bold text-foreground">
              {skill.level}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2">
          <span className="border border-border bg-background/40 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground">
            Order #{skill.order || 0}
          </span>
          <span className="border border-border bg-background/40 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground">
            {skill.icon}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-chart-3" />
            Active Skill
          </div>
          <div className="flex items-center gap-2">
            <Star
              className={`h-3.5 w-3.5 ${
                skill.featured
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
            <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              {skill.featured ? "Featured" : "Standard"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsCard;
