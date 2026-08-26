"use client";

import { Brain } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/EmptyState";

interface EmptySkillProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptySkills = ({
  title = "No skills found",
  description = "Try adjusting your search or category filters to find matching skills.",
  onReset,
}: EmptySkillProps) => (
  <EmptyState
    icon={Brain}
    title={title}
    description={description}
    onReset={onReset}
    secondaryAction={{
      label: "Create Skill",
      href: "/dashboard/skills/create",
    }}
    tags={["Frontend", "Backend", "Featured"]}
  />
);

export default EmptySkills;
