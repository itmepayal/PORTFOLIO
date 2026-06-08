"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Loader2,
  Building2,
  MapPin,
  Calendar,
  Globe,
  BadgeCheck,
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
  onDelete?: (id: string) => void;
}

const ExperienceCard = ({ experience, onDelete }: ExperienceCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
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
      const response = await fetch(`/api/experiences/${experience._id}`, {
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
      <Card className="overflow-hidden border bg-background transition-all hover:shadow-lg rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              {experience.companyLogo ? (
                <Image
                  src={experience.companyLogo}
                  alt={experience.company}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl border object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold">{experience.position}</h2>

                  {experience.featured && <Badge>Featured</Badge>}
                </div>

                <p className="font-medium text-primary">{experience.company}</p>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {experience.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {experience.startDate} -{" "}
                    {experience.current ? "Present" : experience.endDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-muted-foreground leading-7 line-clamp-3">
              {experience.description}
            </p>
          </div>

          {experience.responsibilities?.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 font-semibold">Responsibilities</h3>

              <ul className="space-y-2">
                {experience.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.technologies?.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 font-semibold">Technologies</h3>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              Order: #{experience.order || 0}
            </div>

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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
