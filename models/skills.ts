import { Schema, model, models, Document } from "mongoose";
import type { SkillCategory } from "./shared/enums";
import { skillCategories } from "./shared/enums";
import { userIdField } from "./shared/fields";

export interface ISkill extends Document {
  userId?: Schema.Types.ObjectId;
  title: string;
  category: SkillCategory;
  icon: string;
  level: number;
  featured: boolean;
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    userId: userIdField,

    title: {
      type: String,
      required: [true, "Skill title is required"],
      trim: true,
      maxlength: [40, "Title cannot exceed 40 characters"],
    },

    category: {
      type: String,
      enum: skillCategories,
      default: "other",
    },

    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },

    level: {
      type: Number,
      required: true,
      min: [1, "Minimum level is 1"],
      max: [100, "Maximum level is 100"],
      default: 80,
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

skillSchema.index({ category: 1 });
skillSchema.index({ featured: 1 });
skillSchema.index({ order: 1 });
skillSchema.index({ userId: 1 });

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
