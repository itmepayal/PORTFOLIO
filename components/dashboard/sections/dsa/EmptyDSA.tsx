"use client";

import { Brain } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/EmptyState";

interface EmptyDSAProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyDSA = ({
  title = "No DSA records found",
  description = "Try adjusting your search or category filters to find matching DSA entries.",
  onReset,
}: EmptyDSAProps) => (
  <EmptyState
    icon={Brain}
    title={title}
    description={description}
    onReset={onReset}
    secondaryAction={{
      label: "Create DSA Record",
      href: "/dashboard/dsa/create",
    }}
    tags={["LeetCode", "Striver", "Featured"]}
  />
);

export default EmptyDSA;
