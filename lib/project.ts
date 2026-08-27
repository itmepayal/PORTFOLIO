import {
  projectWorkTypes,
  type ProjectCategory,
  type ProjectWorkType,
} from "@/models/shared/enums";

export { projectWorkTypes, type ProjectWorkType };

export const statusCategories = ["Published", "Draft"] as const;

export type StatusCategory = (typeof statusCategories)[number];

export type ProjectTech = {
  name: string;
  icon: string;
};

export type ProjectFormValues = {
  title: string;
  description: string;
  status: StatusCategory;
  live: string;
  github: string;
  category: ProjectCategory;
  workType: ProjectWorkType;
  company: string;
  features: string[];
  techs: ProjectTech[];
};

export const emptyProjectFormValues: ProjectFormValues = {
  title: "",
  description: "",
  status: "Draft",
  live: "",
  github: "",
  category: "fullstack",
  workType: "self",
  company: "",
  features: [],
  techs: [],
};

export function calculateProjectFormProgress(values: ProjectFormValues): number {
  let completed = 0;
  if (values.title) completed++;
  if (values.description.length >= 20) completed++;
  if (values.live) completed++;
  if (values.github) completed++;
  if (values.features.length > 0) completed++;
  if (values.techs.length > 0) completed++;
  if (values.workType === "company" && values.company.trim()) completed++;
  return Math.round((completed / 7) * 100);
}

export function getProjectFormValidationError(
  values: ProjectFormValues,
): string | null {
  if (!values.title.trim()) return "Project title is required";
  if (values.description.trim().length < 20) {
    return "Description must be at least 20 characters";
  }
  if (!values.live.trim()) return "Live URL is required";
  if (!values.github.trim()) return "GitHub URL is required";
  if (values.features.length === 0) {
    return "Please add at least one feature";
  }
  if (values.techs.length === 0) {
    return "Please add at least one technology";
  }
  return validateProjectWorkType(values.workType, values.company);
}

export function buildProjectFormPayload(values: ProjectFormValues) {
  return {
    title: values.title,
    description: values.description,
    category: values.category,
    workType: values.workType,
    company: values.workType === "company" ? values.company.trim() : "",
    isPublished: values.status === "Published",
    live: values.live,
    github: values.github,
    features: values.features,
    tech: values.techs,
  };
}

export const projectWorkTypeLabels: Record<ProjectWorkType, string> = {
  company: "Company",
  freelance: "Freelance",
  self: "Self",
};

export function getProjectWorkTypeLabel(workType?: string): string {
  if (workType && isProjectWorkType(workType)) {
    return projectWorkTypeLabels[workType];
  }

  return projectWorkTypeLabels.self;
}

export function isProjectWorkType(value: string): value is ProjectWorkType {
  return projectWorkTypes.includes(value as ProjectWorkType);
}

export function validateProjectWorkType(
  workType: unknown,
  company: unknown,
): string | null {
  if (workType === undefined || workType === null || workType === "") {
    return null;
  }

  if (typeof workType !== "string" || !isProjectWorkType(workType)) {
    return "Work type must be company, freelance, or self";
  }

  if (workType === "company" && !String(company ?? "").trim()) {
    return "Company name is required for company projects";
  }

  return null;
}

export function getProjectOrganizationLabel(workType?: string): string {
  if (workType === "company") return "Company";
  return "Organization";
}

export function getProjectOrganizationDisplay(project: {
  workType?: string;
  company?: string;
}): string {
  const workType = project.workType;
  const company = project.company?.trim();

  if (workType === "company") {
    return company || "—";
  }
  if (workType === "freelance") {
    return company || "Freelance / Independent";
  }
  return "Personal project";
}

export function sanitizeProjectPayload<T extends Record<string, unknown>>(
  body: T,
): T {
  const workType = body.workType;

  if (workType === "company") {
    return body;
  }

  if ("company" in body) {
    return { ...body, company: "" };
  }

  return body;
}
