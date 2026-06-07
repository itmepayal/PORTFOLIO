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
  onDelete?: (id: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
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

  const handleEdit = () => {
    if (!project._id) return;
    router.push(`/dashboard/projects/edit/${project._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <CardContent className="relative z-10 flex h-full flex-col gap-6 p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`
                  h-8 rounded-full px-3 text-xs font-semibold border-0
                  ${
                    project.isPublished
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  }
                `}
              >
                {project.isPublished ? (
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                )}
                {project.isPublished ? "Published" : "Draft"}
              </Badge>
              <Badge
                variant="outline"
                className="h-8 rounded-full border-border/60 px-3 capitalize"
              >
                <FolderKanban className="mr-1.5 h-3.5 w-3.5" />
                {project.category}
              </Badge>
              {project.featured && (
                <Badge className="h-8 rounded-full border-0 bg-primary/10 px-3 text-primary">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleEdit}
                className="h-10 w-10 rounded-2xl bg-background/60"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                disabled={deleting}
                onClick={handleDelete}
                className="h-10 w-10 rounded-2xl"
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-7 line-clamp-4">
              {project.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech?.slice(0, 8).map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-lg border border-border/50 bg-muted/40 px-3 py-1.5 text-xs"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Key Features</h3>
              <div className="space-y-2">
                {project.features?.slice(0, 4).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 px-3 py-2"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-4">
            <Button asChild variant="outline" className="h-11 rounded-2xl">
              <a href={project.github} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
            <Button asChild className="h-11 rounded-2xl">
              <a href={project.live} target="_blank">
                <ArrowUpRight className="mr-2 h-4 w-4" />
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
