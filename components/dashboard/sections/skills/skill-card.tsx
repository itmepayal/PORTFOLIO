"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Brain,
  Sparkles,
  BarChart3,
  Target,
  Loader2,
  Star,
  Activity,
  BadgeCheck,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

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

  view?: "grid" | "list";

  onDelete?: (id: string) => void;
}

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const SkillsCard = ({ skill, view = "grid", onDelete }: SkillsCardProps) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const isList = view === "list";

  /* ====================================================== */
  /* DELETE SKILL */
  /* ====================================================== */

  const handleDelete = async () => {
    if (!skill._id) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/skills/${skill._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete skill");
      }

      toast.success("Skill deleted successfully");

      onDelete?.(skill._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ====================================================== */
  /* EDIT SKILL */
  /* ====================================================== */

  const handleEdit = () => {
    if (!skill._id) return;

    router.push(`/dashboard/skills/edit/${skill._id}`);
  };

  /* ====================================================== */
  /* CATEGORY COLORS */
  /* ====================================================== */

  const categoryStyles = {
    frontend:
      "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",

    backend:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",

    database:
      "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",

    devops:
      "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",

    mobile:
      "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/20",

    language:
      "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",

    tool: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",

    cloud:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",

    other: "bg-muted text-muted-foreground border-border/50",
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
          <div className={`${isList ? "flex-1" : "flex flex-1 flex-col"}`}>
            {/* ====================================================== */}
            {/* HEADER */}
            {/* ====================================================== */}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* BADGES */}

                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <Badge
                    className={`
                      h-8
                      rounded-full
                      border
                      px-3
                      capitalize

                      ${categoryStyles[skill.category]}
                    `}
                  >
                    <Brain className="mr-1.5 h-3.5 w-3.5" />

                    {skill.category}
                  </Badge>

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
                    {skill.level}%
                  </Badge>

                  {skill.featured && (
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
                  {skill.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-muted-foreground
                    md:text-[15px]
                  "
                >
                  Professional{" "}
                  <span className="font-medium capitalize">
                    {skill.category}
                  </span>{" "}
                  skill with a proficiency level of{" "}
                  <span className="font-semibold text-primary">
                    {skill.level}%
                  </span>
                  .
                </p>
              </div>

              {/* ====================================================== */}
              {/* ACTIONS */}
              {/* ====================================================== */}

              <div className="flex shrink-0 items-center gap-2">
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

                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting}
                  onClick={() => setOpenDeleteModal(true)}
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
              {/* LEVEL */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">
                    Skill Level
                  </span>
                </div>

                <h3 className="text-3xl font-bold">{skill.level}%</h3>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-primary
                    "
                    style={{
                      width: `${skill.level}%`,
                    }}
                  />
                </div>
              </div>

              {/* CATEGORY */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                </div>

                <h3 className="text-xl font-bold capitalize">
                  {skill.category}
                </h3>
              </div>

              {/* ORDER */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">
                    Display Order
                  </span>
                </div>

                <h3 className="text-3xl font-bold">#{skill.order || 0}</h3>
              </div>

              {/* ICON */}

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">Icon</span>
                </div>

                <h3 className="break-all text-lg font-bold">{skill.icon}</h3>
              </div>
            </div>

            {/* ====================================================== */}
            {/* FOOTER */}
            {/* ====================================================== */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-border/50
                pt-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "
              >
                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                Active Skill
              </div>

              <div className="flex items-center gap-2">
                <Star
                  className={`
                    h-4
                    w-4

                    ${
                      skill.featured
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  `}
                />

                <span className="text-sm font-medium">
                  {skill.featured ? "Featured Skill" : "Standard Skill"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{skill.title}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SkillsCard;
