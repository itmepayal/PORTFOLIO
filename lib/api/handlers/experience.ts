import Experience from "@/models/experience";
import { createEntityCrudHandlers } from "@/lib/api/crud";

export const experienceCrud = createEntityCrudHandlers(Experience, {
  entityName: "Experience",
  entityKey: "experience",
  invalidIdMessage: "Invalid experience ID",
  updateMessage: "Experience updated successfully",
  deleteMessage: "Experience deleted successfully",
});
