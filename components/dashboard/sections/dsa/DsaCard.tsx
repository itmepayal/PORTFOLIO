"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Trophy,
  Target,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface DSACardProps {
  dsa: {
    _id?: string;
    title: string;
    subtitle: string;
    desc: string;
    progress: string;
    category: "leetcode" | "striver" | "codeforces" | "gfg" | "custom";
    problemsSolved: number;
    featured?: boolean;
  };
  onDelete?: (id: string) => void;
}

const categoryStyles: Record<string, string> = {
  leetcode: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  striver: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  codeforces: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  gfg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  custom: "border-border bg-muted text-muted-foreground",
};

const DSACard = ({ dsa, onDelete }: DSACardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    if (!dsa._id) return;
    router.push(`/dashboard/dsa/edit/${dsa._id}`);
  };

  const handleDelete = async () => {
    if (!dsa._id) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this DSA entry?",
    );
    if (!confirmDelete) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/dsa/${dsa._id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete DSA entry");
      toast.success("DSA entry deleted successfully");
      onDelete?.(dsa._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const progressNum = parseInt(dsa.progress) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative h-full overflow-hidden border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60"
    >
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-1 flex h-full flex-col gap-6 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest ${categoryStyles[dsa.category]}`}
            >
              <Brain className="h-3 w-3" />
              {dsa.category}
            </span>
            {dsa.featured && (
              <span className="inline-flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-yellow-500">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>
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

        <div>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary md:text-3xl">
            {dsa.title}
          </h2>
          <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.05em] text-primary">
            {dsa.subtitle}
          </p>
          <p className="mt-3 text-sm font-light leading-7 text-muted-foreground line-clamp-3">
            {dsa.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border bg-background/40 p-4">
            <div className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              Problems Solved
            </div>
            <p className="text-3xl font-black text-foreground">
              {dsa.problemsSolved}
            </p>
          </div>
          <div className="border border-border bg-background/40 p-4">
            <div className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-primary" />
              Progress
            </div>
            <p className="text-3xl font-black text-foreground">
              {dsa.progress}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              Learning Progress
            </p>
            <span className="font-mono text-[0.62rem] font-medium text-foreground">
              {dsa.progress}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressNum}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DSACard;
