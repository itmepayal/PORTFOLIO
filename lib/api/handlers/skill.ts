import Skill from "@/models/skills";
import { createEntityCrudHandlers } from "@/lib/api/crud";

export const skillCrud = createEntityCrudHandlers(Skill, {
  entityName: "Skill",
  entityKey: "skill",
  invalidIdMessage: "Invalid skill ID",
  updateMessage: "Skill updated successfully",
  deleteMessage: "Skill deleted successfully",
});
