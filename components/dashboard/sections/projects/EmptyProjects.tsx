"use client";

import { FolderSearch } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/EmptyState";

interface EmptyProjectsProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyProjects = ({
  title = "No projects found",
  description = "Try adjusting your search, filters, or work type to find matching projects.",
  onReset,
}: EmptyProjectsProps) => (
  <EmptyState
    icon={FolderSearch}
    title={title}
    description={description}
    onReset={onReset}
    secondaryAction={{
      label: "Create Project",
      href: "/dashboard/projects/create",
    }}
    tags={["Published", "Draft", "Work Types"]}
  />
);

export default EmptyProjects;
