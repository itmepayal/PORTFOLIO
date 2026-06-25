"use client";

import { toast } from "sonner";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Sparkles,
  Layers3,
  Star,
  Activity,
  BadgeCheck,
  Rocket,
  LayoutDashboard,
} from "lucide-react";
import FormField from "@/components/form/FormField";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormSelect from "@/components/form/FormSelect";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/PageContainer";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";

export const dsaCategories = [
  "leetcode",
  "striver",
  "codeforces",
  "gfg",
  "custom",
] as const;

export type DSACategory = (typeof dsaCategories)[number];

const CreateDSA = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState("0%");
  const [category, setCategory] = useState<DSACategory>("custom");
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const formProgress = useMemo(() => {
    let done = 0;

    if (title.trim()) done++;
    if (subtitle.trim()) done++;
    if (desc.trim()) done++;
    if (progress.trim()) done++;
    if (category) done++;
    if (problemsSolved > 0) done++;
    if (order >= 0) done++;

    return Math.round((done / 7) * 100);
  }, [title, subtitle, desc, progress, category, problemsSolved, order]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!subtitle.trim()) {
        toast.error("Subtitle is required");
        return;
      }

      if (!desc.trim()) {
        toast.error("Description is required");
        return;
      }

      const payload = {
        title,
        subtitle,
        desc,
        progress,
        category,
        problemsSolved,
        featured,
        order,
      };

      const response = await fetch("/api/dsa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create DSA profile");
      }

      toast.success("DSA profile created successfully");

      setTitle("");
      setSubtitle("");
      setDesc("");
      setProgress("0%");
      setCategory("custom");
      setProblemsSolved(0);
      setFeatured(false);
      setOrder(0);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create DSA Profile"
        description="Track your problem-solving journey and coding achievements"
        icon={<FolderKanban className="h-8 w-8" />}
        backHref="/dashboard/dsa"
        progress={formProgress}
      />
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FormCard
            title="DSA Details"
            description="Manage and update your coding profiles, problem-solving progress, and achievements"
            icon={<Layers3 className="h-5 w-5" />}
          >
            {/* Basic Info Section */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Enter your DSA profile details"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="LeetCode Journey"
                />
                <FormField
                  label="Subtitle"
                  value={subtitle}
                  onChange={setSubtitle}
                  placeholder="Solving DSA problems daily"
                />
              </div>
              <FormField
                label="Description"
                value={desc}
                onChange={setDesc}
                placeholder="Describe your coding journey..."
              />
            </div>

            {/* Stats & Config Section */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
              <FormSectionHeader
                title="Statistics & Configuration"
                description="Manage your DSA progress and platform details"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Progress"
                  value={progress}
                  onChange={setProgress}
                  placeholder="75%"
                />
                <FormField
                  label="Problems Solved"
                  value={String(problemsSolved)}
                  onChange={(value) => setProblemsSolved(Number(value) || 0)}
                  placeholder="500"
                  type="number"
                />
                <FormField
                  label="Display Order"
                  value={String(order)}
                  onChange={(value) => setOrder(Number(value) || 0)}
                  placeholder="1"
                  type="number"
                />
                <FormSelect
                  label="Category"
                  value={category}
                  onValueChange={(value) => setCategory(value as DSACategory)}
                  options={[...dsaCategories]}
                />
              </div>
            </div>

            <FormFeatureToggle
              title="Featured Entry"
              description="Highlight this DSA profile"
              value={featured}
              onChange={setFeatured}
            />
          </FormCard>
        </motion.div>

        {/* Preview Panel — matches CreateSkill exactly */}
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
                title="Live Preview"
                description="Real-time DSA profile preview"
              />
            </div>

            <div className="space-y-8 px-6">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                    {title || "DSA Profile"}
                  </h2>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                    {subtitle || "Your coding journey"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-primary">
                  {progress} Progress
                </span>
                <span className="border border-border bg-muted px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-muted-foreground">
                  {category}
                </span>
                {featured && (
                  <span className="border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-yellow-500">
                    Featured
                  </span>
                )}
              </div>

              <div className="border border-border bg-background/40 p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm leading-6 text-foreground">
                  {desc || "Your DSA profile description will appear here."}
                </p>
              </div>

              {/* Stat rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Progress
                    </span>
                  </div>
                  <span className="bg-linear-to-br from-primary to-chart-3 bg-clip-text font-bold text-transparent">
                    {progress}
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Category
                    </span>
                  </div>
                  <span className="font-semibold capitalize text-foreground">
                    {category}
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Featured
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Problems Solved
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {problemsSolved}
                  </h3>
                </div>

                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Display Order
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {order}
                  </h3>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <PreviewFooter
                onClick={handleSubmit}
                loading={loading}
                icon={<Sparkles className="h-4 w-4" />}
                label="Publish DSA"
                loadingLabel="Creating..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default CreateDSA;
