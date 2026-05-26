"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  ExternalLink,
  Pencil,
  Trash2,
  FolderKanban,
  Sparkles,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

interface Tech {
  name: string;
  icon: string;
}

interface ProjectCardProps {
  project: {
    _id?: string;
    title: string;
    description: string;
    category: string;
    live: string;
    github: string;
    features: string[];
    tech: Tech[];
    featured?: boolean;
    isPublished?: boolean;
  };

  view?: "grid" | "list";

  onDelete?: (id: string) => void;
}

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const ProjectCard = ({
  project,
  view = "grid",
  onDelete,
}: ProjectCardProps) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const isList = view === "list";

  /* ====================================================== */
  /* DELETE PROJECT */
  /* ====================================================== */

  const handleDelete = async () => {
    if (!project._id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      toast.success("Project deleted successfully");

      onDelete?.(project._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ====================================================== */
  /* EDIT PROJECT */
  /* ====================================================== */

  const handleEdit = () => {
    if (!project._id) return;

    router.push(`/dashboard/projects/edit/${project._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card
        className="
          group
          relative
          h-full
          overflow-hidden
          rounded-4xl
          border
          border-border/50
          bg-background/80
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-primary/20
          hover:shadow-2xl
          hover:shadow-primary/5
        "
      >
        {/* GLOW */}

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
              -top-24
              right-0
              h-48
              w-48
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

            ${
              isList
                ? "flex flex-col gap-8 lg:flex-row"
                : "flex h-full flex-col"
            }
          `}
        >
          {/* LEFT */}

          <div
            className={`${isList ? "min-w-0 flex-1" : "flex flex-1 flex-col"}`}
          >
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">
              {/* LEFT CONTENT */}

              <div className="min-w-0 flex-1 space-y-5">
                {/* BADGES */}

                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    className={`
                      h-9
                      rounded-full
                      border-0
                      px-4
                      text-xs
                      font-semibold
                      shadow-sm

                      ${
                        project.isPublished
                          ? `
                            bg-emerald-500/15
                            text-emerald-600
                            dark:text-emerald-400
                          `
                          : `
                            bg-amber-500/15
                            text-amber-600
                            dark:text-amber-400
                          `
                      }
                    `}
                  >
                    {project.isPublished ? (
                      <CheckCircle2 className="mr-2 h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <Clock3 className="mr-2 h-3.5 w-3.5 shrink-0" />
                    )}

                    {project.isPublished ? "Published" : "Draft"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="
                      h-9
                      rounded-full
                      border-border/60
                      px-4
                      capitalize
                    "
                  >
                    <FolderKanban className="mr-2 h-3.5 w-3.5 shrink-0" />

                    {project.category}
                  </Badge>

                  {project.featured && (
                    <Badge
                      className="
                        h-9
                        rounded-full
                        border-0
                        bg-primary/10
                        px-4
                        text-primary
                      "
                    >
                      <Sparkles className="mr-2 h-3.5 w-3.5 shrink-0" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* TITLE + DESCRIPTION */}

                <div className="space-y-3">
                  <h2
                    className="
                      line-clamp-1
                      wrap-break-word
                      text-2xl
                      font-bold
                      tracking-tight
                      transition-colors
                      duration-300
                      group-hover:text-primary
                    "
                  >
                    {project.title}
                  </h2>

                  <p
                    className={`
                      wrap-break-word
                      text-sm
                      leading-7
                      text-muted-foreground

                      ${isList ? "max-w-4xl line-clamp-2" : "line-clamp-3"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

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

            {/* BODY */}

            <div
              className={`
                mt-8

                ${isList ? "grid gap-8 lg:grid-cols-2" : "space-y-8"}
              `}
            >
              {/* TECH */}

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold">Technology Stack</h3>

                  <span className="shrink-0 text-xs text-muted-foreground">
                    {project.tech?.length || 0} Technologies
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech?.slice(0, 6).map((tech) => (
                    <div
                      key={tech.name}
                      className="
                        rounded-2xl
                        border
                        border-border/50
                        bg-muted/30
                        px-3
                        py-2
                        text-xs
                        font-medium
                      "
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* FEATURES */}

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Key Features</h3>

                <div className="grid gap-2 sm:grid-cols-2">
                  {project.features?.slice(0, 4).map((feature, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-2.5
                        rounded-2xl
                        border
                        border-border/50
                        bg-muted/20
                        px-3
                        py-3
                      "
                    >
                      <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />

                      <span
                        className="
                          line-clamp-1
                          break-all
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className={`
              flex
              gap-3

              ${
                isList
                  ? "lg:w-64 lg:flex-col lg:justify-center"
                  : "mt-8 border-t border-border/50 pt-6"
              }
            `}
          >
            <Button
              asChild
              variant="outline"
              className="
                h-12
                rounded-2xl
              "
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
                Source Code
              </a>
            </Button>

            <Button
              asChild
              className="
                h-12
                rounded-2xl
              "
            >
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight className="mr-2 h-4 w-4 shrink-0" />
                Live Demo
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
