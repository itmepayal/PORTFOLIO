import mongoose, { Schema, model, models } from "mongoose";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

export interface ISkill {
  title: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "mobile"
    | "language"
    | "tool"
    | "cloud"
    | "other";

  icon: string;
  level: number;
  featured: boolean;
  order: number;
}

/* ====================================================== */
/* SCHEMA */
/* ====================================================== */

const skillSchema = new Schema<ISkill>(
  {
    /* ====================================================== */
    /* TITLE */
    /* ====================================================== */

    title: {
      type: String,

      required: [true, "Skill title is required"],

      trim: true,

      maxlength: [40, "Title cannot exceed 40 characters"],
    },

    /* ====================================================== */
    /* CATEGORY */
    /* ====================================================== */

    category: {
      type: String,

      enum: [
        "frontend",
        "backend",
        "database",
        "devops",
        "mobile",
        "language",
        "tool",
        "cloud",
        "other",
      ],

      default: "other",
    },

    /* ====================================================== */
    /* ICON */
    /* ====================================================== */

    icon: {
      type: String,

      required: [true, "Icon is required"],

      trim: true,
    },

    /* ====================================================== */
    /* LEVEL */
    /* ====================================================== */

    level: {
      type: Number,

      required: true,

      min: [1, "Minimum level is 1"],

      max: [100, "Maximum level is 100"],

      default: 80,
    },

    /* ====================================================== */
    /* FEATURED */
    /* ====================================================== */

    featured: {
      type: Boolean,

      default: false,
    },

    /* ====================================================== */
    /* ORDER */
    /* ====================================================== */

    order: {
      type: Number,

      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/* ====================================================== */
/* INDEXES */
/* ====================================================== */

skillSchema.index({
  category: 1,
});

skillSchema.index({
  featured: 1,
});

skillSchema.index({
  order: 1,
});

/* ====================================================== */
/* MODEL */
/* ====================================================== */

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
