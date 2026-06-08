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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const handleEdit = () => {
    if (!skill._id) return;

    router.push(`/dashboard/skills/edit/${skill._id}`);
  };

  const categoryStyles = {
    frontend:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",

    backend:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",

    database:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",

    devops:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",

    mobile:
      "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",

    language:
      "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",

    tool: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",

    cloud:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",

    other: "bg-muted text-muted-foreground border-border/50",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
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
            border-border/60
            bg-background
            transition-all
            duration-300
            hover:border-primary/30
            hover:shadow-xl
          "
        >
          <div
            className="
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
          </div>

          <CardContent className="relative z-10 flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge
                    className={`rounded-full border px-3 py-1 capitalize ${categoryStyles[skill.category]}`}
                  >
                    <Brain className="mr-1 h-3.5 w-3.5" />
                    {skill.category}
                  </Badge>

                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    <Activity className="mr-1 h-3.5 w-3.5" />
                    {skill.level}%
                  </Badge>

                  {skill.featured && (
                    <Badge className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                  {skill.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Professional{" "}
                  <span className="font-medium capitalize">
                    {skill.category}
                  </span>{" "}
                  skill with{" "}
                  <span className="font-semibold text-primary">
                    {skill.level}%
                  </span>{" "}
                  proficiency.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleEdit}
                  className="h-9 w-9 rounded-xl"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="h-9 w-9 rounded-xl"
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Skill Level
                  </span>
                </div>

                <span className="text-lg font-bold">{skill.level}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${skill.level}%`,
                  }}
                />
              </div>
            </div>

            <div className="my-5 flex flex-wrap gap-2">
              <Badge variant="secondary">Order #{skill.order || 0}</Badge>
              <Badge variant="outline">{skill.icon}</Badge>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                Active Skill
              </div>

              <div className="flex items-center gap-2">
                <Star
                  className={`h-4 w-4 ${
                    skill.featured
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />

                <span className="text-sm font-medium">
                  {skill.featured ? "Featured" : "Standard"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default SkillsCard;
