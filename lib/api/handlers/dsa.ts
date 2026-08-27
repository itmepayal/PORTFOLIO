import DSA from "@/models/dsa";
import { createEntityCrudHandlers } from "@/lib/api/crud";

export const dsaCrud = createEntityCrudHandlers(DSA, {
  entityName: "DSA",
  entityKey: "dsa",
  invalidIdMessage: "Invalid DSA ID",
  updateMessage: "DSA updated successfully",
  deleteMessage: "DSA deleted successfully",
});
