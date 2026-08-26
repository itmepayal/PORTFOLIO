"use client";

import { MessageSquareMore } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/EmptyState";

interface EmptyEnquiriesProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyEnquiries = ({
  title = "No enquiries found",
  description = "Try adjusting your search or status filters to find matching enquiries.",
  onReset,
}: EmptyEnquiriesProps) => (
  <EmptyState
    icon={MessageSquareMore}
    title={title}
    description={description}
    onReset={onReset}
    tags={["Unread", "Read", "Replied"]}
  />
);

export default EmptyEnquiries;
