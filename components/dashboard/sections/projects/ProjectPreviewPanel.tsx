import { PreviewPanel } from "@/components/dashboard/preview/PreviewPanel";
import { PreviewBadge } from "@/components/dashboard/preview/PreviewBadge";
import { PreviewStatRow } from "@/components/dashboard/preview/PreviewStatRow";
import { PreviewStatCard } from "@/components/dashboard/preview/PreviewStatCard";
import { getProjectWorkTypeLabel } from "@/lib/project";
import type { ProjectFormValues } from "@/lib/project";
import {
  Activity,
  BadgeCheck,
  FolderKanban,
  Globe,
  LayoutDashboard,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";

type ProjectPreviewPanelProps = {
  values: ProjectFormValues;
  formProgress: number;
  loading: boolean;
  onSubmit: () => void;
  mode: "create" | "edit";
};

export const ProjectPreviewPanel = ({
  values,
  formProgress,
  loading,
  onSubmit,
  mode,
}: ProjectPreviewPanelProps) => (
  <PreviewPanel
    icon={<LayoutDashboard className="h-5 w-5" />}
    title="Project Preview"
    description="Live project overview"
    onSubmit={onSubmit}
    loading={loading}
    submitLabel={mode === "create" ? "Publish Project" : "Update Project"}
    submitLoadingLabel={mode === "create" ? "Creating..." : "Updating..."}
    submitIcon={Sparkles}
  >
    <div>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
        {values.title || "Untitled Project"}
      </h2>
      <p className="mt-2 text-sm font-light text-muted-foreground line-clamp-4">
        {values.description || "Project description preview will appear here."}
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <PreviewBadge variant="primary">
        {values.category || "Category"}
      </PreviewBadge>
      <span className="border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-cyan">
        {getProjectWorkTypeLabel(values.workType)}
      </span>
      {values.workType === "company" && values.company && (
        <PreviewBadge>{values.company}</PreviewBadge>
      )}
      <span
        className={`border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest ${
          values.status === "Published"
            ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
            : "border-border bg-muted text-muted-foreground"
        }`}
      >
        {values.status}
      </span>
    </div>

    <div className="space-y-3">
      <PreviewStatRow
        icon={Activity}
        label="Completion"
        value={`${formProgress}%`}
        valueClassName="bg-linear-to-br from-primary to-chart-3 bg-clip-text font-bold text-transparent"
      />
      <PreviewStatRow icon={BadgeCheck} label="Status" value={values.status} />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <PreviewStatCard icon={Star} label="Features" value={values.features.length} />
      <PreviewStatCard icon={Rocket} label="Tech Stack" value={values.techs.length} />
    </div>

    <div className="space-y-3 border border-border bg-background/40 p-4">
      <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
        <Globe className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">{values.live || "No live URL added"}</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
        <FolderKanban className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">{values.github || "No GitHub URL added"}</span>
      </div>
    </div>
  </PreviewPanel>
);
