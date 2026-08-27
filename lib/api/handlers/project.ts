import {
  sanitizeProjectPayload,
  validateProjectWorkType,
} from "@/lib/project";
import Project from "@/models/project";
import { createEntityCrudHandlers } from "@/lib/api/crud";

export const projectCrud = createEntityCrudHandlers(Project, {
  entityName: "Project",
  entityKey: "project",
  invalidIdMessage: "Invalid project ID",
  updateMessage: "Project updated successfully",
  deleteMessage: "Project deleted successfully",
});

export async function updateProject(
  id: string,
  body: Record<string, unknown>,
) {
  return projectCrud.updateById(id, body, async ({ existing, body }) => {
    const nextWorkType =
      body.workType !== undefined ? body.workType : existing.workType;
    const nextCompany =
      body.company !== undefined ? body.company : existing.company;
    const validationError = validateProjectWorkType(nextWorkType, nextCompany);

    if (validationError) {
      throw new Error(validationError);
    }

    return sanitizeProjectPayload({
      ...body,
      workType: nextWorkType,
      company: nextCompany,
    });
  });
}
