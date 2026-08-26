import { FolderKanban, CheckCircle2, CircleDashed, Zap } from "lucide-react";

export const filterOptions = ["All", "Published", "Draft"];
export const workTypeFilterOptions = [
  "All Types",
  "Company",
  "Freelance",
  "Self",
] as const;

export const iconMap = { FolderKanban, CheckCircle2, CircleDashed, Zap };

export const workTypeFilterMap: Record<
  (typeof workTypeFilterOptions)[number],
  string | null
> = {
  "All Types": null,
  Company: "company",
  Freelance: "freelance",
  Self: "self",
};
