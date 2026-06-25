"use client";
import { toast } from "sonner";
import { useMemo, useState, useEffect } from "react";
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
  Code,
} from "lucide-react";
import { useParams } from "next/navigation";
import { iconMap } from "@/components/dashboard/sections/dsa/data";
import FormField from "@/components/form/FormField";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormSelect from "@/components/form/FormSelect";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/page";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";

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

const EditSkill = () => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const DynamicIcon = iconMap[icon as keyof typeof iconMap] || Code;

  const progress = useMemo(() => {
    let done = 0;

    if (title.trim()) done++;
    if (icon.trim()) done++;
    if (level) done++;
    if (category) done++;
    if (order >= 0) done++;

    return Math.round((done / 5) * 100);
  }, [title, icon, level, category, order]);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getSkill = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        const skill = data.skill;
        setTitle(skill.title);
        setIcon(skill.icon);
        setLevel(skill.level);
        setCategory(skill.category);
        setFeatured(skill.featured);
        setOrder(skill.order);
        setIsFetching(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (id) {
      getSkill();
    }
  }, [id]);

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
      const response = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to edit skill");
      }
      toast.success("Skill edited successfully");
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

  if (isFetching) {
    return (
      <PageContainer>
        <div className="flex min-h-100 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin border-2 border-border border-t-primary" />
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Loading Skill...
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit Skill"
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
            <div className="border border-border bg-card/30 p-6 space-y-6">
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

            <div className="border border-border bg-card/30 p-6 space-y-6">
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
          <div className="sticky top-6 overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
            <div className="p-6">
              <PreviewHeader
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="Live Preview"
                description="Real-time Experience preview"
              />
            </div>

            <div className="space-y-8 px-6">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                    {title || "Skill Name"}
                  </h2>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                    {category}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-primary">
                  {level}% Proficiency
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

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Skill Level
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {level}%
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

              {/* Icon */}
              <div className="border border-border bg-background/40 p-4">
                <div className="flex items-center gap-3">
                  <DynamicIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Selected Icon
                    </p>
                    <p className="font-semibold text-foreground">
                      {icon || "No Icon Selected"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <PreviewFooter
                onClick={handleSubmit}
                loading={loading}
                icon={<Sparkles className="h-4 w-4" />}
                label="Update Skill"
                loadingLabel="Updating..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditSkill;
