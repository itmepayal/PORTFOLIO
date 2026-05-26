"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  Pencil,
  Trash2,
  Brain,
  Sparkles,
  Trophy,
  BarChart3,
  Target,
  Loader2,
  Star,
  Activity,
  BadgeCheck,
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

    order?: number;
  };

  view?: "grid" | "list";

  onDelete?: (id: string) => void;
}

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const DSACard = ({
  dsa,

  view = "grid",

  onDelete,
}: DSACardProps) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const isList = view === "list";

  /* ====================================================== */
  /* DELETE DSA */
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
        throw new Error(data.message || "Failed to delete DSA");
      }

      toast.success("DSA entry deleted successfully");

      onDelete?.(dsa._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ====================================================== */
  /* EDIT DSA */
  /* ====================================================== */

  const handleEdit = () => {
    if (!dsa._id) return;

    router.push(`/dashboard/dsa/edit/${dsa._id}`);
  };

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

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -6,
      }}
      className="h-full"
    >
      <Card
        className="
          group
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-border/50
          bg-background/80
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-primary/30
          hover:shadow-2xl
          hover:shadow-primary/10
        "
      >
        {/* ====================================================== */}
        {/* BACKGROUND GLOW */}
        {/* ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-linear-to-br
              from-primary/5
              via-transparent
              to-primary/5
            "
          />

          <div
            className="
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-primary/10
              blur-3xl
            "
          />
        </div>

        <CardContent
          className={`
            relative
            z-10
            p-6
            md:p-7

            ${
              isList
                ? "flex flex-col gap-8 xl:flex-row"
                : "flex h-full flex-col"
            }
          `}
        >
          {/* ====================================================== */}
          {/* CONTENT */}
          {/* ====================================================== */}

          <div className={`${isList ? "flex-1" : "flex flex-1 flex-col"}`}>
            {/* ====================================================== */}
            {/* HEADER */}
            {/* ====================================================== */}

            <div className="flex items-start justify-between gap-4">
              {/* LEFT */}

              <div className="min-w-0 flex-1">
                {/* BADGES */}

                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {/* CATEGORY */}

                  <Badge
                    className={`
                      h-8
                      rounded-full
                      border
                      px-3
                      capitalize

                      ${categoryStyles[dsa.category]}
                    `}
                  >
                    <Brain className="mr-1.5 h-3.5 w-3.5" />

                    {dsa.category}
                  </Badge>

                  {/* PROGRESS */}

                  <Badge
                    variant="outline"
                    className="
                      h-8
                      rounded-full
                      border-border/60
                      px-3
                    "
                  >
                    <Activity className="mr-1.5 h-3.5 w-3.5" />

                    {dsa.progress}
                  </Badge>

                  {/* FEATURED */}

                  {dsa.featured && (
                    <Badge
                      className="
                        h-8
                        rounded-full
                        border-0
                        bg-primary/10
                        px-3
                        text-primary
                      "
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* TITLE */}

                <h2
                  className="
                    wrap-break-word
                    text-2xl
                    font-bold
                    tracking-tight
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    md:text-3xl
                  "
                >
                  {dsa.title}
                </h2>

                {/* SUBTITLE */}

                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-primary
                  "
                >
                  {dsa.subtitle}
                </p>

                {/* DESCRIPTION */}

                <p
                  className={`
                    mt-4
                    wrap-break-word
                    text-sm
                    leading-7
                    text-muted-foreground
                    md:text-[15px]

                    ${isList ? "max-w-4xl line-clamp-3" : "line-clamp-4"}
                  `}
                >
                  {dsa.desc}
                </p>
              </div>

              {/* ====================================================== */}
              {/* ACTIONS */}
              {/* ====================================================== */}

              <div className="flex shrink-0 items-center gap-2">
                {/* EDIT */}

                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleEdit}
                  className="
                    h-10
                    w-10
                    rounded-2xl
                    border-border/60
                    bg-background/60
                    backdrop-blur
                  "
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* DELETE */}

                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="
                    h-10
                    w-10
                    rounded-2xl
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

            {/* ====================================================== */}
            {/* BODY */}
            {/* ====================================================== */}

            <div
              className={`
                mt-8

                ${isList ? "grid gap-6 lg:grid-cols-3" : "space-y-6 flex-1"}
              `}
            >
              {/* ====================================================== */}
              {/* PROBLEMS SOLVED */}
              {/* ====================================================== */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Trophy
                    className="
                      h-4
                      w-4
                      text-primary
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >
                    Problems Solved
                  </span>
                </div>

                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {dsa.problemsSolved}
                </h3>
              </div>

              {/* ====================================================== */}
              {/* PROGRESS */}
              {/* ====================================================== */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Target
                    className="
                      h-4
                      w-4
                      text-primary
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >
                    Progress
                  </span>
                </div>

                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {dsa.progress}
                </h3>

                <div
                  className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-muted
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-primary
                    "
                    style={{
                      width: dsa.progress,
                    }}
                  />
                </div>
              </div>

              {/* ====================================================== */}
              {/* ORDER */}
              {/* ====================================================== */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >
                  <BarChart3
                    className="
                      h-4
                      w-4
                      text-primary
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >
                    Display Order
                  </span>
                </div>

                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  #{dsa.order || 0}
                </h3>
              </div>
            </div>

            {/* ====================================================== */}
            {/* FOOTER */}
            {/* ====================================================== */}

            <div
              className={`
                mt-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-border/50
                pt-6
              `}
            >
              {/* STATUS */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "
              >
                <BadgeCheck
                  className="
                    h-4
                    w-4
                    text-emerald-500
                  "
                />
                Active DSA Entry
              </div>

              {/* FEATURE */}

              <div className="flex items-center gap-2">
                <Star
                  className={`
                    h-4
                    w-4

                    ${
                      dsa.featured
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  `}
                />

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {dsa.featured ? "Featured Entry" : "Standard Entry"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DSACard;
