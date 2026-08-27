import { Schema } from "mongoose";

export const userIdField = {
  type: Schema.Types.ObjectId,
  ref: "User",
  index: true,
};
