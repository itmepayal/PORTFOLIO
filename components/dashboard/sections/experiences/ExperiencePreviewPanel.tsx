import { PreviewPanel } from "@/components/dashboard/preview/PreviewPanel";
import { PreviewBadge } from "@/components/dashboard/preview/PreviewBadge";
import { PreviewStatRow } from "@/components/dashboard/preview/PreviewStatRow";
import { PreviewStatCard } from "@/components/dashboard/preview/PreviewStatCard";
import type { ExperienceFormValues } from "@/hooks/use-experience-form";
import {
  Activity,
  BadgeCheck,
  Building2,
  Globe,
  LayoutDashboard,
  Layers3,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";

type ExperiencePreviewPanelProps = {
  values: ExperienceFormValues;
  formProgress: number;
  loading: boolean;
  onSubmit: () => void;
  mode: "create" | "edit";
};

export const ExperiencePreviewPanel = ({
  values,
  formProgress,
  loading,
  onSubmit,
  mode,
}: ExperiencePreviewPanelProps) => (
  <PreviewPanel
    icon={<LayoutDashboard className="h-5 w-5" />}
    title="Live Preview"
    description="Real-time Experience preview"
    onSubmit={onSubmit}
    loading={loading}
    submitLabel={mode === "create" ? "Publish Experience" : "Update Experience"}
    submitLoadingLabel={mode === "create" ? "Creating..." : "Updating..."}
    submitIcon={Sparkles}
  >
    <div>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
        {values.company || "Company Name"}
      </h2>
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {values.position || "Position Title"}
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <PreviewBadge variant="primary">
        {values.current ? "Currently Working" : "Past Experience"}
      </PreviewBadge>
      <PreviewBadge>
        {values.startDate || "Start"} →{" "}
        {values.current ? "Present" : values.endDate || "End"}
      </PreviewBadge>
      {values.featured && <PreviewBadge variant="featured">Featured</PreviewBadge>}
    </div>

    <div className="border border-border bg-background/40 p-4">
      <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
        Description
      </p>
      <p className="text-sm leading-6 text-foreground line-clamp-4">
        {values.description || "No description added yet..."}
      </p>
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
        label="Duration"
        value={`${values.startDate || "Start"} — ${values.current ? "Present" : values.endDate || "End"}`}
        valueClassName="font-semibold text-sm text-foreground"
      />
      <PreviewStatRow
        icon={Star}
        label="Featured"
        value={values.featured ? "Yes" : "No"}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <PreviewStatCard
        icon={Layers3}
        label="Tech Stack"
        value={values.technologies.length}
      />
      <PreviewStatCard
        icon={Rocket}
        label="Responsibilities"
        value={values.responsibilities.length}
      />
    </div>

    <div className="space-y-3 border border-border bg-background/40 p-4">
      <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
        <Globe className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">
          {values.companyWebsite || "No website added"}
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
        <Building2 className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">{values.company || "Company not set"}</span>
      </div>
    </div>
  </PreviewPanel>
);
