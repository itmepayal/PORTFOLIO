import { iconMap } from "@/components/dashboard/sections/dsa/data";
import { PreviewPanel } from "@/components/dashboard/preview/PreviewPanel";
import { PreviewBadge } from "@/components/dashboard/preview/PreviewBadge";
import { PreviewStatRow } from "@/components/dashboard/preview/PreviewStatRow";
import { PreviewStatCard } from "@/components/dashboard/preview/PreviewStatCard";
import type { SkillFormValues } from "@/hooks/use-skill-form";
import {
  Activity,
  BadgeCheck,
  LayoutDashboard,
  Layers3,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";
import { FaCode } from "react-icons/fa";

type SkillPreviewPanelProps = {
  values: SkillFormValues;
  formProgress: number;
  loading: boolean;
  onSubmit: () => void;
  mode: "create" | "edit";
};

export const SkillPreviewPanel = ({
  values,
  formProgress,
  loading,
  onSubmit,
  mode,
}: SkillPreviewPanelProps) => {
  const DynamicIcon = iconMap[values.icon as keyof typeof iconMap] || FaCode;

  return (
    <PreviewPanel
      icon={<LayoutDashboard className="h-5 w-5" />}
      title="Live Preview"
      description="Real-time skill preview"
      onSubmit={onSubmit}
      loading={loading}
      submitLabel={mode === "create" ? "Publish Skill" : "Update Skill"}
      submitLoadingLabel={mode === "create" ? "Creating..." : "Updating..."}
      submitIcon={Sparkles}
    >
      <div>
        <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
          {values.title || "Skill Name"}
        </h2>
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          {values.category}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <PreviewBadge variant="primary">
          {values.level || "0"}% Proficiency
        </PreviewBadge>
        <PreviewBadge>{values.category}</PreviewBadge>
        {values.featured && <PreviewBadge variant="featured">Featured</PreviewBadge>}
      </div>

      <div className="space-y-3">
        <PreviewStatRow
          icon={Activity}
          label="Completion"
          value={`${formProgress}%`}
          valueClassName="bg-linear-to-br from-primary to-chart-3 bg-clip-text font-bold text-transparent"
        />
        <PreviewStatRow
          icon={BadgeCheck}
          label="Category"
          value={values.category}
          valueClassName="font-semibold capitalize text-foreground"
        />
        <PreviewStatRow
          icon={Star}
          label="Featured"
          value={values.featured ? "Yes" : "No"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PreviewStatCard
          icon={Rocket}
          label="Skill Level"
          value={`${values.level || "0"}%`}
        />
        <PreviewStatCard icon={Layers3} label="Display Order" value={values.order} />
      </div>

      <div className="border border-border bg-background/40 p-4">
        <div className="flex items-center gap-3">
          <DynamicIcon className="h-5 w-5 text-primary" />
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
              Selected Icon
            </p>
            <p className="font-semibold text-foreground">
              {values.icon || "No Icon Selected"}
            </p>
          </div>
        </div>
      </div>
    </PreviewPanel>
  );
};
