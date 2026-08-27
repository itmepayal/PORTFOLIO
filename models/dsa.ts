import { Schema, model, models, Document } from "mongoose";
import type { DSACategory } from "./shared/enums";
import { dsaCategories } from "./shared/enums";
import { userIdField } from "./shared/fields";

export interface IDSA extends Document {
  userId?: Schema.Types.ObjectId;
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: DSACategory;
  problemsSolved: number;
  featured: boolean;
  order: number;
}

const dsaSchema = new Schema<IDSA>(
  {
    userId: userIdField,

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [20, "Title cannot exceed 20 characters"],
    },

    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      trim: true,
      maxlength: [100, "Subtitle cannot exceed 100 characters"],
    },

    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [300, "Description cannot exceed 300 characters"],
    },

    progress: {
      type: String,
      required: [true, "Progress is required"],
      validate: {
        validator: function (value: string) {
          return /^([0-9]|[1-9][0-9]|100)%$/.test(value);
        },
        message: "Progress must be between 0% and 100%",
      },
    },

    category: {
      type: String,
      enum: dsaCategories,
      default: "custom",
    },

    problemsSolved: {
      type: Number,
      required: true,
      min: [0, "Problems solved cannot be negative"],
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

dsaSchema.index({ category: 1 });
dsaSchema.index({ featured: 1 });
dsaSchema.index({ order: 1 });
dsaSchema.index({ userId: 1 });

const DSA = models.DSA || model<IDSA>("DSA", dsaSchema);

export default DSA;
