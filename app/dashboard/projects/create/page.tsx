"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FolderKanban,
  Plus,
  Sparkles,
  X,
  Layers3,
  Globe,
  Star,
  Activity,
  BadgeCheck,
  Rocket,
  LayoutDashboard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export type ProjectStatus = "Published" | "Draft";
const categories = ["backend", "fullstack", "frontend", "mobile", "api"];

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
  const [status, setStatus] = useState<ProjectStatus>("Draft");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categories[0]);

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
      setCategory(categories[0]);
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
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-375
        
        "
      >
        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            mb-8
            overflow-hidden
            rounded-4xl
            border
            border-border/50
            bg-background/70
            p-6
            shadow-[0_10px_50px_rgba(0,0,0,0.08)]
            backdrop-blur-xl
          "
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <Link href="/dashboard/projects">
                <Button variant="outline" className="h-11 rounded-2xl">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-primary/10
                  text-primary
                "
              >
                <FolderKanban className="h-8 w-8" />
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Create Project
                </h2>

                <p className="mt-1 text-muted-foreground">
                  Build premium portfolio projects with professional details
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion</span>

                  <span className="font-semibold">{progress}%</span>
                </div>

                <div className="h-2 w-52 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          {/* ====================================================== */}
          {/* LEFT */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <Card
              className="
                rounded-4xl
                border-border/50
                bg-background/70
                shadow-2xl
                backdrop-blur-xl
              "
            >
              <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary/60 to-primary rounded-t-4xl" />

              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle className="text-xl">Project Details</CardTitle>
                    <CardDescription>
                      Fill all required information professionally
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* ====================================================== */}
                {/* BASIC INFO */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Basic Information
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Enter your project details
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Project Title</Label>

                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="TaskFlow AI"
                      className="
                        h-12
                        rounded-2xl
                        border-border/60
                        bg-background/50
                        shadow-sm
                        transition-all
                        focus-visible:ring-2
                        focus-visible:ring-primary/30
                        hover:border-primary/40
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>

                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write detailed project description..."
                      className="
                        min-h-45
                        rounded-3xl
                        resize-none
                        border-border/60
                        bg-background/50
                        shadow-sm
                      "
                    />

                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {description.length}/500
                      </span>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* CATEGORY */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Project Configuration
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Manage project category and publishing state
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Category</Label>

                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12! rounded-2xl w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {categories.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>

                      <Select
                        value={status}
                        onValueChange={(value: ProjectStatus) =>
                          setStatus(value)
                        }
                      >
                        <SelectTrigger className="h-12! rounded-2xl w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Published">Published</SelectItem>

                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* LINKS */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Project Links
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Add deployment and source code URLs
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Live URL</Label>

                      <div className="relative">
                        <Globe className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />

                        <Input
                          value={live}
                          onChange={(e) => setLive(e.target.value)}
                          placeholder="https://yourproject.com"
                          className="h-12 rounded-2xl pl-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>GitHub URL</Label>

                      <div className="relative">
                        <Globe className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />

                        <Input
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="https://github.com/..."
                          className="h-12 rounded-2xl pl-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* FEATURES */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Features
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Add key project functionalities
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Authentication system..."
                      className="h-12 rounded-2xl"
                    />

                    <Button
                      type="button"
                      onClick={addFeature}
                      className="
                        h-12
                        rounded-2xl
                        px-6
                      "
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  {features.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No features added yet
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="
                            h-11
                            rounded-2xl
                            border
                            border-border/50
                            bg-background
                            px-4
                            text-sm
                            font-medium
                            shadow-sm
                            transition-all
                            hover:shadow-md
                          "
                        >
                          <Star className="mr-2 h-3.5 w-3.5" />

                          {feature}

                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="ml-2"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* ====================================================== */}
                {/* TECH STACK */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Technology Stack
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Add technologies used in this project
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="React, Node.js..."
                      className="h-12 rounded-2xl"
                    />

                    <Button
                      type="button"
                      onClick={addTech}
                      className="
                        h-12
                        rounded-2xl
                        px-6
                      "
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="secondary"
                        className="
                          h-11
                          rounded-2xl
                          border
                          border-border/50
                          bg-background
                          px-4
                          text-sm
                          font-medium
                          shadow-sm
                          transition-all
                          hover:shadow-md
                        "
                      >
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={16}
                          height={16}
                          className="mr-2"
                        />

                        {tech.name}

                        <button
                          type="button"
                          onClick={() => removeTech(tech.name)}
                          className="ml-2"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="space-y-6"
          >
            {/* ====================================================== */}
            {/* PREVIEW */}
            {/* ====================================================== */}

            <Card className="sticky top-6 rounded-4xl border-border/50 bg-background/70 backdrop-blur-xl">
              {/* ====================================================== */}
              {/* HEADER */}
              {/* ====================================================== */}

              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle>Project Preview</CardTitle>
                    <CardDescription>Live project overview</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* ====================================================== */}
                {/* TITLE + DESCRIPTION */}
                {/* ====================================================== */}

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {title || "Untitled Project"}
                  </h2>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {description ||
                      "Project description preview will appear here."}
                  </p>
                </div>

                {/* ====================================================== */}
                {/* TAGS */}
                {/* ====================================================== */}

                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-xl px-3 py-1">
                    {category || "Category"}
                  </Badge>

                  <Badge
                    variant={status === "Published" ? "default" : "secondary"}
                    className="rounded-xl px-3 py-1"
                  >
                    {status}
                  </Badge>
                </div>

                {/* ====================================================== */}
                {/* STATS GRID */}
                {/* ====================================================== */}

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Features
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{features.length}</h3>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Tech Stack
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{techs.length}</h3>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* META INFO */}
                {/* ====================================================== */}

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

                {/* ====================================================== */}
                {/* ACTION
                {/* ====================================================== */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className=" h-12 w-full rounded-2xl font-medium shadow-lg shadow-primary/10"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {loading ? "Creating..." : "Publish Project"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
