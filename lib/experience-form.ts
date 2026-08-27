import { toast } from "sonner";

export type ExperienceFormValues = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo: string;
  companyWebsite: string;
  featured: boolean;
  order: number;
};

export const emptyExperienceValues: ExperienceFormValues = {
  company: "",
  position: "",
  location: "Remote",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  responsibilities: [],
  technologies: [],
  companyLogo: "",
  companyWebsite: "",
  featured: false,
  order: 0,
};

type ChipField = "responsibilities" | "technologies";

export const getExperienceFormProgress = (values: ExperienceFormValues) => {
  let completed = 0;
  if (values.company) completed++;
  if (values.position) completed++;
  if (values.startDate) completed++;
  if (values.description.length >= 20) completed++;
  if (values.responsibilities.length > 0) completed++;
  if (values.technologies.length > 0) completed++;
  return Math.round((completed / 6) * 100);
};

export const validateExperienceForm = (values: ExperienceFormValues) => {
  const checks: [boolean, string][] = [
    [!values.company.trim(), "Company name is required"],
    [!values.position.trim(), "Position is required"],
    [!values.startDate, "Start date is required"],
    [!values.current && !values.endDate, "End date is required"],
    [values.description.trim().length < 20, "Description must be at least 20 characters"],
    [values.responsibilities.length === 0, "Please add at least one responsibility"],
    [values.technologies.length === 0, "Please add at least one technology"],
  ];

  for (const [failed, message] of checks) {
    if (failed) {
      toast.error(message);
      return false;
    }
  }
  return true;
};

export const addExperienceChip = (
  input: string,
  items: string[],
  field: ChipField,
  duplicateMessage: string,
  onAdd: (field: ChipField, next: string[]) => void,
  clearInput: () => void,
) => {
  if (!input.trim()) return;
  const value = input.trim();
  if (items.some((item) => item.toLowerCase() === value.toLowerCase())) {
    toast.error(duplicateMessage);
    return;
  }
  onAdd(field, [...items, value]);
  clearInput();
};

export const mapExperienceToFormValues = (
  experience: Record<string, unknown>,
): ExperienceFormValues => ({
  company: (experience.company as string) || "",
  position: (experience.position as string) || "",
  location: (experience.location as string) || "Remote",
  startDate: (experience.startDate as string) || "",
  endDate: (experience.endDate as string) || "",
  current: (experience.current as boolean) || false,
  description: (experience.description as string) || "",
  responsibilities: (experience.responsibilities as string[]) || [],
  technologies: (experience.technologies as string[]) || [],
  companyLogo: (experience.companyLogo as string) || "",
  companyWebsite: (experience.companyWebsite as string) || "",
  featured: (experience.featured as boolean) || false,
  order: (experience.order as number) || 0,
});
