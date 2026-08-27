import { PreviewPanel } from "@/components/dashboard/preview/PreviewPanel";
import { PreviewBadge } from "@/components/dashboard/preview/PreviewBadge";
import { PreviewStatRow } from "@/components/dashboard/preview/PreviewStatRow";
import { PreviewStatCard } from "@/components/dashboard/preview/PreviewStatCard";
import type { DsaFormValues } from "@/hooks/use-dsa-form";
import {
  Activity,
  BadgeCheck,
  LayoutDashboard,
  Layers3,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";

type DsaPreviewPanelProps = {
  values: DsaFormValues;
  loading: boolean;
  onSubmit: () => void;
  mode: "create" | "edit";
};

export const DsaPreviewPanel = ({
  values,
  loading,
  onSubmit,
  mode,
}: DsaPreviewPanelProps) => (
  <PreviewPanel
    icon={<LayoutDashboard className="h-5 w-5" />}
    title="Live Preview"
    description="Real-time DSA profile preview"
    onSubmit={onSubmit}
    loading={loading}
    submitLabel={mode === "create" ? "Publish DSA" : "Update DSA"}
    submitLoadingLabel={mode === "create" ? "Creating..." : "Updating..."}
    submitIcon={Sparkles}
  >
    <div>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
        {values.title || "DSA Profile"}
      </h2>
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {values.subtitle || "Your coding journey"}
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <PreviewBadge variant="primary">{values.progress} Progress</PreviewBadge>
      <PreviewBadge>{values.category}</PreviewBadge>
      {values.featured && <PreviewBadge variant="featured">Featured</PreviewBadge>}
    </div>

    <div className="border border-border bg-background/40 p-4">
      <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
        Description
      </p>
      <p className="text-sm leading-6 text-foreground">
        {values.desc || "Your DSA profile description will appear here."}
      </p>
    </div>

    <div className="space-y-3">
      <PreviewStatRow
        icon={Activity}
        label="Progress"
        value={values.progress}
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
      <PreviewStatCard icon={Rocket} label="Problems Solved" value={values.problemsSolved} />
      <PreviewStatCard icon={Layers3} label="Display Order" value={values.order} />
    </div>
  </PreviewPanel>
);
