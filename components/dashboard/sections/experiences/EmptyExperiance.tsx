"use client";

import { BriefcaseBusiness } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/EmptyState";

interface EmptyExperianceProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyExperiance = ({
  title = "No experiences found",
  description = "Try adjusting your search or filters to find matching work experiences.",
  onReset,
}: EmptyExperianceProps) => (
  <EmptyState
    icon={BriefcaseBusiness}
    title={title}
    description={description}
    onReset={onReset}
    secondaryAction={{
      label: "Add Experience",
      href: "/dashboard/experiences/create",
    }}
    tags={["Featured", "Current Role", "Technologies"]}
  />
);

export default EmptyExperiance;
