"use client";

import { TbLayoutGrid, TbList } from "react-icons/tb";
import { ViewToggle } from "@/components/dashboard/ui/ViewToggle";

interface ProjectsViewToolbarProps {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

export const ProjectsViewToolbar = ({
  viewMode,
  onChange,
}: ProjectsViewToolbarProps) => (
  <ViewToggle
    value={viewMode}
    onChange={onChange}
    options={[
      { value: "grid", label: "Grid", icon: TbLayoutGrid },
      { value: "list", label: "List", icon: TbList },
    ]}
  />
);
