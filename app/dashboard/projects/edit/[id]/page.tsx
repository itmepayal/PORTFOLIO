"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Sparkles,
  Layers3,
  Globe,
  Star,
  Activity,
  BadgeCheck,
  Rocket,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/page";
import FormCard from "@/components/form/FormCard";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormField from "@/components/form/FormField";
import FormTextarea from "@/components/form/FormTextarea";
import FormSelect from "@/components/form/FormSelect";
import FormChipInput from "@/components/form/FormChipInput";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

export const statusCategories = ["Published", "Draft"] as const;

export const projectCategories = [
  "backend",
  "fullstack",
  "frontend",
  "mobile",
  "api",
  "other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type StatusCategory = (typeof statusCategories)[number];
/* ====================================================== */
/* TECH ICONS */
/* ====================================================== */

const techIcons: Record<string, string> = {
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",

  nextjs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",

  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",

  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",

  nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",

  express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",

  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",

  mysql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",

  docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",

  redux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",

  tailwind:
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
};

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const EditProject = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusCategory>("Draft");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [category, setCategory] = useState("fullstack");
  const [techs, setTechs] = useState<
    {
      name: string;
      icon: string;
    }[]
  >([]);

  /* ====================================================== */
  /* GET PROJECT */
  /* ====================================================== */

  useEffect(() => {
    if (!id) return;
    const getProject = async () => {
      try {
        setPageLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        const project = data.project;
        setTitle(project.title || "");
        setDescription(project.description || "");
        setStatus(project.isPublished ? "Published" : "Draft");
        setLive(project.live || "");
        setGithub(project.github || "");
        setCategory(project.category || "fullstack");
        setFeatures(project.features || []);
        setTechs(project.tech || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setPageLoading(false);
      }
    };

    getProject();
  }, [id]);

  /* ====================================================== */
  /* PROGRESS */
  /* ====================================================== */

  const progress = useMemo(() => {
    let completed = 0;
    if (title) completed++;
    if (description.length >= 20) completed++;
    if (live) completed++;
    if (github) completed++;
    if (features.length > 0) completed++;
    if (techs.length > 0) completed++;
    return Math.round((completed / 6) * 100);
  }, [title, description, live, github, features, techs]);

  /* ====================================================== */
  /* ADD TECH */
  /* ====================================================== */

  const addTech = () => {
    if (!techInput.trim()) return;
    const value = techInput.trim();
    const exists = techs.some(
      (item) => item.name.toLowerCase() === value.toLowerCase(),
    );
    if (exists) {
      toast.error("Technology already exists");
      return;
    }
    const icon =
      techIcons[value.toLowerCase()] ||
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg";
    setTechs((prev) => [
      ...prev,
      {
        name: value,
        icon,
      },
    ]);
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setTechs((prev) => prev.filter((item) => item.name !== tech));
  };

  /* ====================================================== */
  /* ADD FEATURE */
  /* ====================================================== */

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const value = featureInput.trim();
    if (features.includes(value)) {
      toast.error("Feature already exists");
      return;
    }
    setFeatures((prev) => [...prev, value]);
    setFeatureInput("");
  };

  const removeFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((item) => item !== feature));
  };

  /* ====================================================== */
  /* UPDATE PROJECT */
  /* ====================================================== */

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (!title.trim()) {
        toast.error("Project title is required");
        return;
      }
      if (description.trim().length < 20) {
        toast.error("Description must be at least 20 characters");
        return;
      }
      if (!live.trim()) {
        toast.error("Live URL is required");
        return;
      }
      if (!github.trim()) {
        toast.error("GitHub URL is required");
        return;
      }
      if (features.length === 0) {
        toast.error("Please add at least one feature");
        return;
      }
      if (techs.length === 0) {
        toast.error("Please add at least one technology");
        return;
      }
      const payload = {
        title,
        description,
        category,
        isPublished: status === "Published",
        live,
        github,
        features,
        tech: techs,
      };
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Project updated successfully");
      router.push("/dashboard/projects");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ====================================================== */
  /* LOADING */
  /* ====================================================== */
  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary w-16 h-16" />
      </div>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit Project"
        description="Modify project information, technology stack, links, and project highlights"
        icon={<FolderKanban className="h-8 w-8" />}
        backHref="/dashboard/projects"
        progress={progress}
      />
      {/* ====================================================== */}
      {/* MAIN GRID */}
      {/* ====================================================== */}
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FormCard
            title="Project Details"
            description="Add and manage your project information"
            icon={<Layers3 className="h-5 w-5" />}
          >
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Provide your professional experience details"
              />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormField
                  label="Title"
                  value={title}
                  placeholder="TaskFlow AI"
                  onChange={setTitle}
                />
                <FormTextarea
                  label="Description"
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe your project, features, architecture, and key functionalities..."
                  className="md:col-span-2"
                />
              </div>
            </div>
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Project Configuration"
                description="Manage project category and publishing state"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Category"
                  value={category}
                  onValueChange={(value) =>
                    setCategory(value as ProjectCategory)
                  }
                  options={[...projectCategories]}
                />
                <FormSelect
                  label="Status"
                  value={status}
                  onValueChange={(value) => setStatus(value as StatusCategory)}
                  options={[...statusCategories]}
                />
              </div>
            </div>
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Project Links"
                description="Add deployment and source code URLs"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Live URL"
                  value={live}
                  placeholder="https://yourproject.com"
                  onChange={setLive}
                />
                <FormField
                  label="GitHub URL"
                  value={github}
                  onChange={setGithub}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Project Features"
                description="Add key functionalities and highlights of your project"
              />

              <FormChipInput
                title="Project Features"
                description="Add key functionalities and highlights of your project"
                value={features}
                inputValue={featureInput}
                setInputValue={setFeatureInput}
                onAdd={addFeature}
                onRemove={removeFeature}
                placeholder="Authentication, Dashboard, Payments..."
              />
            </div>

            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Technology Stack"
                description="Add technologies used to build this project"
              />

              <FormChipInput
                title="Technology Stack"
                description="Add technologies used to build this project"
                value={techs.map((item) => item.name)}
                inputValue={techInput}
                setInputValue={setTechInput}
                onAdd={addTech}
                onRemove={removeTech}
                placeholder="React, Next.js, Node.js..."
              />
            </div>
          </FormCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card className="sticky top-6 rounded-4xl border-border/50 bg-background/70 backdrop-blur-xl">
            <PreviewHeader
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Project Preview"
              description="Live project overview"
            />

            <CardContent className="space-y-8">
              {/* Title & Description */}
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {title || "Untitled Project"}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
                  {description ||
                    "Project description preview will appear here."}
                </p>
              </div>

              {/* Category & Status */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-primary/10 text-primary">
                  {category || "Category"}
                </span>

                <span
                  className={`px-3 py-1 rounded-xl text-xs font-medium ${
                    status === "Published"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Meta Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm">Completion</span>
                  </div>

                  <span className="font-semibold">{progress}%</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Status</span>
                  </div>

                  <span className="font-semibold">{status}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Features
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">{features.length}</h3>
                </div>

                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Tech Stack
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">{techs.length}</h3>
                </div>
              </div>

              {/* Links */}
              <div className="rounded-2xl border border-border/50 bg-background/40 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>{live || "No live URL added"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FolderKanban className="h-4 w-4 text-primary" />
                  <span>{github || "No GitHub URL added"}</span>
                </div>
              </div>
            </CardContent>

            <PreviewFooter
              onClick={handleUpdate}
              loading={loading}
              icon={<Sparkles className="h-4 w-4" />}
              label="Publish Project"
              loadingLabel="Editing..."
            />
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditProject;
