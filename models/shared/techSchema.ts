import { Schema } from "mongoose";

export const techSnapshotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
