import { Schema, model, models } from "mongoose";

/* ====================================================== */
/* TECH STACK SCHEMA */
/* ====================================================== */

const techSchema = new Schema(
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
  {
    _id: false,
  },
);

/* ====================================================== */
/* PROJECT SCHEMA */
/* ====================================================== */

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 20,
      maxlength: 1000,
    },

    tech: {
      type: [techSchema],
      default: [],
    },

    features: {
      type: [String],
      validate: {
        validator: function (arr: string[]) {
          return arr.length > 0;
        },
        message: "At least one feature is required",
      },
    },

    github: {
      type: String,
      required: true,
      trim: true,
    },

    live: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["backend", "fullstack", "frontend", "mobile", "api"],
      default: "fullstack",
    },

    workType: {
      type: String,
      enum: ["company", "freelance", "self"],
      default: "self",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.pre("validate", function () {
  if (this.workType === "company" && !this.company?.trim()) {
    this.invalidate("company", "Company name is required for company projects");
  }

  if (this.workType !== "company" && this.company) {
    this.company = "";
  }
});

/* ====================================================== */
/* INDEXES */
/* ====================================================== */

projectSchema.index({ workType: 1 });

projectSchema.index({
  title: "text",
  description: "text",
});

/* ====================================================== */
/* MODEL */
/* ====================================================== */

const Project = models.Project || model("Project", projectSchema);

export default Project;
