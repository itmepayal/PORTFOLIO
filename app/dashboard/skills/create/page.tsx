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
import { iconMap } from "@/components/dashboard/sections/dsa/data";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/form/FormField";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormSelect from "@/components/form/FormSelect";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/page";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";
import { FaCode } from "react-icons/fa";

export const skillCategories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "mobile",
  "language",
  "tool",
  "cloud",
  "other",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

const CreateSkill = () => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const DynamicIcon = iconMap[icon as keyof typeof iconMap] || FaCode;

  const progress = useMemo(() => {
    let done = 0;

    if (title.trim()) done++;
    if (icon.trim()) done++;
    if (level) done++;
    if (category) done++;
    if (order >= 0) done++;

    return Math.round((done / 5) * 100);
  }, [title, icon, level, category, order]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title.trim()) {
        toast.error("Skill title is required");
        return;
      }

      if (!icon.trim()) {
        toast.error("Skill icon is required");
        return;
      }

      const payload = {
        title,
        icon,
        level,
        category,
        featured,
        order,
      };

      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create skill");
      }

      toast.success("Skill created successfully");

      setTitle("");
      setIcon("");
      setLevel("");
      setCategory("frontend");
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
        title="Create Skill"
        description="Track your coding progress professionally"
        icon={<FolderKanban className="h-8 w-8" />}
        backHref="/dashboard/skills"
        progress={progress}
      />
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FormCard
            title="Skills Details"
            description="Manage and update your technical skills and technologies"
            icon={<Layers3 className="h-5 w-5" />}
          >
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Enter your experience details"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Skill Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="React.js"
                />
                <FormField
                  label="Icon Name"
                  value={icon}
                  onChange={setIcon}
                  placeholder="FaReact"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Configuration"
                description="Manage your skill settings"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Level"
                  value={level}
                  onChange={setLevel}
                  placeholder="70%"
                />
                <FormSelect
                  label="Category"
                  value={category}
                  onValueChange={(value) => setCategory(value as SkillCategory)}
                  options={[...skillCategories]}
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
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <DynamicIcon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    {title || "Skill Name"}
                  </h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {category}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-primary/10 text-primary">
                  {level}% Proficiency
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
                      Skill Level
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">{level}%</h3>
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
              {/* Icon */}
              <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                <div className="flex items-center gap-3">
                  <DynamicIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Selected Icon
                    </p>
                    <p className="font-semibold">
                      {icon || "No Icon Selected"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <PreviewFooter
              onClick={handleSubmit}
              loading={loading}
              icon={<Sparkles className="h-4 w-4" />}
              label="Publish Skill"
              loadingLabel="Creating..."
            />
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default CreateSkill;
