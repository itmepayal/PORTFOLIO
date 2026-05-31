"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Loader2,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  Globe,
  BadgeCheck,
  Briefcase,
  Star,
  Code2,
  Layers3,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExperienceCardProps {
  experience: {
    _id?: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    description: string;
    responsibilities: string[];
    technologies: string[];
    companyLogo?: string;
    companyWebsite?: string;
    featured?: boolean;
    order?: number;
  };
  view?: "grid" | "list";
  onDelete?: (id: string) => void;
}

const ExperienceCard = ({
  experience,
  view = "grid",
  onDelete,
}: ExperienceCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const isList = view === "list";
  const handleEdit = () => {
    if (experience._id) {
      router.push(`/dashboard/experiences/edit/${experience._id}`);
    }
  };
  const handleDelete = async () => {
    if (!experience._id) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?",
    );
    if (!confirmed) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/experience/${experience._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete experience");
      }
      toast.success("Experience deleted successfully");
      onDelete?.(experience._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <CardContent
          className={`relative z-10 p-6 md:p-7 ${
            isList ? "flex flex-col gap-8 xl:flex-row" : "flex h-full flex-col"
          }`}
        >
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                {experience.companyLogo ? (
                  <Image
                    src={experience.companyLogo}
                    alt={experience.company}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-3xl border object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                )}

                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="outline">
                      <Briefcase className="mr-1 h-3 w-3" />
                      Experience
                    </Badge>

                    {experience.featured && (
                      <Badge className="bg-primary/10 text-primary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold md:text-2xl">
                    {experience.position}
                  </h2>

                  <p className="mt-1 text-lg font-medium text-primary">
                    {experience.company}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={handleEdit}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              <div className="rounded-3xl border p-5">
                <MapPin className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Location</p>
                <h3 className="font-bold">{experience.location}</h3>
              </div>

              <div className="rounded-3xl border p-5">
                <Calendar className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Duration</p>
                <h3 className="font-bold">{experience.startDate}</h3>
                <p className="text-sm text-muted-foreground">
                  → {experience.current ? "Present" : experience.endDate}
                </p>
              </div>

              <div className="rounded-3xl border p-5">
                <Code2 className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Order</p>
                <h3 className="font-bold">#{experience.order || 0}</h3>
              </div>

              <div className="rounded-3xl border p-5">
                <Layers3 className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Technologies</p>
                <h3 className="font-bold">
                  {experience.technologies?.length || 0}
                </h3>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold">Description</h3>
              <p className="leading-7 text-muted-foreground">
                {experience.description}
              </p>
            </div>

            {experience.responsibilities?.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-semibold">Responsibilities</h3>
                <div className="space-y-3">
                  {experience.responsibilities.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.technologies?.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-semibold">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="flex items-center gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                Active Experience
              </div>

              <div className="flex items-center gap-3">
                {experience.companyWebsite && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={experience.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}

                <Star
                  className={
                    experience.featured
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
