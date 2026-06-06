"use client";

import { toast } from "sonner";
import {
  Layers3,
  LayoutDashboard,
  Activity,
  BadgeCheck,
  Sparkles,
  Star,
  Loader2,
  FolderKanban,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormField from "@/components/form/FormField";
import FormCard from "@/components/form/FormCard";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormSelect from "@/components/form/FormSelect";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/page";
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

const EditDSA = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState("0%");
  const [category, setCategory] = useState<DSACategory>("custom");
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchDSA = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/dsa/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch DSA");
      }
      const dsa = data.dsa;
      setTitle(dsa.title || "");
      setSubtitle(dsa.subtitle || "");
      setDesc(dsa.desc || "");
      setProgress(dsa.progress || "0%");
      setCategory(dsa.category || "custom");
      setProblemsSolved(dsa.problemsSolved || 0);
      setFeatured(dsa.featured || false);
      setOrder(dsa.order || 0);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDSA();
    }
  }, [id]);

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

      if (desc.trim().length < 20) {
        toast.error("Description must be at least 20 characters");
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

      const response = await fetch(`/api/dsa/${id}`, {
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
      toast.success("DSA updated successfully");
      router.push("/dashboard/dsa");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit DSA Profile"
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
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
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

            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
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
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card className="sticky top-6 rounded-4xl border-border/50 bg-background/70 backdrop-blur-xl">
            <PreviewHeader
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Live Preview"
              description="Real-time Experience preview"
            />
            <CardContent className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {title || "DSA Profile"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {subtitle || "Your coding journey overview"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-primary/10 text-primary">
                  {progress}
                </span>

                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-muted capitalize">
                  {category}
                </span>

                {featured && (
                  <span className="px-3 py-1 rounded-xl text-xs font-medium bg-yellow-500/10 text-yellow-500">
                    Featured
                  </span>
                )}
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Description
                </p>

                <p className="text-sm leading-6">
                  {desc || "Your DSA profile description will appear here."}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm">Progress</span>
                  </div>

                  <span className="font-semibold">{progress}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Category</span>
                  </div>

                  <span className="font-semibold capitalize">{category}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm">Featured</span>
                  </div>

                  <span className="font-semibold">
                    {featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Problems Solved
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">{problemsSolved}</h3>
                </div>

                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Display Order
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">{order}</h3>
                </div>
              </div>
            </CardContent>
            <PreviewFooter
              onClick={handleSubmit}
              loading={loading}
              icon={<Sparkles className="h-4 w-4" />}
              label="Publish DSA"
              loadingLabel="Editing..."
            />
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditDSA;
