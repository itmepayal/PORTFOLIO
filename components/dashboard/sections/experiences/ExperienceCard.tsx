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
  Sparkles,
  Layers3,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

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
    if (experience._id)
      router.push(`/dashboard/experiences/edit/${experience._id}`);
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
      if (!response.ok)
        throw new Error(data.message || "Failed to delete experience");
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
          <div className="flex items-center gap-4">
            {experience.companyLogo ? (
              <Image
                src={experience.companyLogo}
                alt={experience.company}
                width={48}
                height={48}
                className="h-12 w-12 border border-border object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center border border-border bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest ${
                  experience.current
                    ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
                    : "border-border bg-muted text-muted-foreground"
                }`}
              >
                <Calendar className="h-3 w-3" />
                {experience.current ? "Current" : "Past"}
              </span>
              {experience.featured && (
                <span className="inline-flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-yellow-500">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>
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
            {experience.position}
          </h2>
          <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.05em] text-primary">
            {experience.company}
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              {experience.location}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              <Calendar className="h-3 w-3 text-primary" />
              {experience.startDate} —{" "}
              {experience.current ? "Present" : experience.endDate}
            </span>
          </div>
          <p className="mt-3 text-sm font-light leading-7 text-muted-foreground line-clamp-3">
            {experience.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {experience.responsibilities?.length > 0 && (
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                Responsibilities
              </p>
              <div className="space-y-2">
                {experience.responsibilities.slice(0, 4).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 border border-border bg-background/40 px-3 py-2"
                  >
                    <div className="h-1.5 w-1.5 shrink-0 bg-primary" />
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {experience.technologies?.length > 0 && (
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                <Layers3 className="h-3.5 w-3.5 text-primary" />
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-background/40 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          {experience.companyWebsite && (
            <a
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center justify-center gap-2.5 bg-linear-to-br from-primary to-secondary-foreground px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              Visit Website
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
