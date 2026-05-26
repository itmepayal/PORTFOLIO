import mongoose, { Schema, model, models } from "mongoose";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

export interface IDSA {
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: "leetcode" | "striver" | "codeforces" | "gfg" | "custom";
  problemsSolved: number;
  featured: boolean;
  order: number;
}

/* ====================================================== */
/* SCHEMA */
/* ====================================================== */

const dsaSchema = new Schema<IDSA>(
  {
    /* ====================================================== */
    /* TITLE */
    /* ====================================================== */

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [20, "Title cannot exceed 20 characters"],
    },

    /* ====================================================== */
    /* SUBTITLE */
    /* ====================================================== */

    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      trim: true,
      maxlength: [100, "Subtitle cannot exceed 100 characters"],
    },

    /* ====================================================== */
    /* DESCRIPTION */
    /* ====================================================== */

    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [300, "Description cannot exceed 300 characters"],
    },

    /* ====================================================== */
    /* PROGRESS */
    /* ====================================================== */

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

    /* ====================================================== */
    /* CATEGORY */
    /* ====================================================== */

    category: {
      type: String,

      enum: ["leetcode", "striver", "codeforces", "gfg", "custom"],

      default: "custom",
    },

    /* ====================================================== */
    /* PROBLEMS SOLVED */
    /* ====================================================== */

    problemsSolved: {
      type: Number,

      required: true,

      min: [0, "Problems solved cannot be negative"],

      default: 0,
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

dsaSchema.index({
  category: 1,
});

dsaSchema.index({
  featured: 1,
});

dsaSchema.index({
  order: 1,
});

/* ====================================================== */
/* MODEL */
/* ====================================================== */

const DSA = models.DSA || model<IDSA>("DSA", dsaSchema);

export default DSA;
