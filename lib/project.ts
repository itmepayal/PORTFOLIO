export const projectWorkTypes = ["company", "freelance", "self"] as const;

export type ProjectWorkType = (typeof projectWorkTypes)[number];

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
