"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";
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

const CreateProject = () => {
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
  const [category, setCategory] = useState("fullstack");

  const [techs, setTechs] = useState([
    {
      name: "React",
      icon: techIcons.react,
    },

    {
      name: "Next.js",
      icon: techIcons.nextjs,
    },

    {
      name: "TypeScript",
      icon: techIcons.typescript,
    },
  ]);

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
  /* SUBMIT */
  /* ====================================================== */

  const handleSubmit = async () => {
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
        status,
        live,
        github,
        features,
        tech: techs,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Project created successfully");

      setTitle("");
      setDescription("");
      setCategory("fullstack");
      setStatus("Draft");
      setLive("");
      setGithub("");
      setFeatures([]);
      setTechs([]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create Project"
        description="Showcase your work with detailed project information and technology stack"
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
            <div className="border border-border bg-card/30 p-6 space-y-6">
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
            <div className="border border-border bg-card/30 p-6 space-y-6">
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
            <div className="border border-border bg-card/30 p-6 space-y-6">
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
            <div className="border border-border bg-card/30 p-6 space-y-6">
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

            <div className="border border-border bg-card/30 p-6 space-y-6">
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
          <div className="sticky top-6 overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
            <div className="p-6">
              <PreviewHeader
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="Project Preview"
                description="Live project overview"
              />
            </div>

            <div className="space-y-8 px-6">
              {/* Title & Description */}
              <div>
                <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                  {title || "Untitled Project"}
                </h2>

                <p className="mt-2 text-sm font-light text-muted-foreground line-clamp-4">
                  {description ||
                    "Project description preview will appear here."}
                </p>
              </div>

              {/* Category & Status */}
              <div className="flex flex-wrap gap-2">
                <span className="border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-primary">
                  {category || "Category"}
                </span>

                <span
                  className={`border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest ${
                    status === "Published"
                      ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Meta Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Completion
                    </span>
                  </div>

                  <span className="bg-linear-to-br from-primary to-chart-3 bg-clip-text font-bold text-transparent">
                    {progress}%
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Status
                    </span>
                  </div>

                  <span className="font-semibold text-foreground">
                    {status}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Features
                    </span>
                  </div>

                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {features.length}
                  </h3>
                </div>

                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Tech Stack
                    </span>
                  </div>

                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {techs.length}
                  </h3>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-3 border border-border bg-background/40 p-4">
                <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
                  <Globe className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">
                    {live || "No live URL added"}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
                  <FolderKanban className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">
                    {github || "No GitHub URL added"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <PreviewFooter
                onClick={handleSubmit}
                loading={loading}
                icon={<Sparkles className="h-4 w-4" />}
                label="Publish Project"
                loadingLabel="Creating..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default CreateProject;
