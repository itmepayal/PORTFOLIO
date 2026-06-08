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

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

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

/* ====================================================== */
/* CATEGORY COLORS */
/* ====================================================== */

const categoryStyles = {
  leetcode:
    "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",

  striver:
    "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",

  codeforces:
    "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",

  gfg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",

  custom: "bg-muted text-muted-foreground border-border/50",
};

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const DSACard = ({ dsa, onDelete }: DSACardProps) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  /* ====================================================== */
  /* EDIT */
  /* ====================================================== */

  const handleEdit = () => {
    if (!dsa._id) return;

    router.push(`/dashboard/dsa/edit/${dsa._id}`);
  };

  /* ====================================================== */
  /* DELETE */
  /* ====================================================== */

  const handleDelete = async () => {
    if (!dsa._id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this DSA entry?",
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/dsa/${dsa._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete DSA entry");
      }

      toast.success("DSA entry deleted successfully");

      onDelete?.(dsa._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
    >
      <Card className=" group overflow-hidden rounded-3xl border border-border/50 bg-transperent backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={` border capitalize ${categoryStyles[dsa.category]}`}
              >
                <Brain className="mr-1 h-3.5 w-3.5" />
                {dsa.category}
              </Badge>
              {dsa.featured && (
                <Badge
                  className="
                    border-0
                    bg-primary/10
                    text-primary
                  "
                >
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleEdit}
                className="
                  h-10
                  w-10
                  rounded-xl
                "
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="
                  h-10
                  w-10
                  rounded-xl
                "
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              transition-colors
              duration-300
              group-hover:text-primary
            "
          >
            {dsa.title}
          </h2>
          <p className="mt-2 font-medium text-primary">{dsa.subtitle}</p>
          <p
            className="
              mt-5
              text-sm
              leading-7
              line-clamp-4
              text-muted-foreground
            "
          >
            {dsa.desc}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="
                rounded-2xl
                border
                border-border/50
                bg-muted/30
                p-5
              "
            >
              <div className="mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Problems Solved
                </span>
              </div>
              <h3 className="text-3xl font-black">{dsa.problemsSolved}</h3>
            </div>
            <div
              className="
                rounded-2xl
                border
                border-border/50
                bg-muted/30
                p-5
              "
            >
              <div className="mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Progress</span>
              </div>
              <h3 className="text-3xl font-black">{dsa.progress}</h3>
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Learning Progress</span>
              <span className="font-medium">{dsa.progress}</span>
            </div>
            <div
              className="
                h-2.5
                overflow-hidden
                rounded-full
                bg-muted
              "
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: dsa.progress,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className="
                  h-full
                  rounded-full
                  bg-primary
                "
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DSACard;
