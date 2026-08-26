"use client";

import { TbLayoutGrid, TbTimeline } from "react-icons/tb";
import { ViewToggle } from "@/components/dashboard/ui/ViewToggle";

export type ExperienceViewMode = "tabs" | "timeline";

interface ExperienceViewToggleProps {
  value: ExperienceViewMode;
  onChange: (value: ExperienceViewMode) => void;
}

export const ExperienceViewToggle = ({
  value,
  onChange,
}: ExperienceViewToggleProps) => (
  <ViewToggle
    value={value}
    onChange={onChange}
    options={[
      { value: "tabs", label: "Tabs", icon: TbLayoutGrid },
      { value: "timeline", label: "Timeline", icon: TbTimeline },
    ]}
  />
);
