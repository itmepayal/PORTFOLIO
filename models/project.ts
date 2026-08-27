import { Schema, model, models } from "mongoose";
import { projectCategories, projectWorkTypes } from "./shared/enums";
import { techSnapshotSchema } from "./shared/techSchema";
import { userIdField } from "./shared/fields";

const projectSchema = new Schema(
  {
    userId: userIdField,

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
      type: [techSnapshotSchema],
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
      enum: projectCategories,
      default: "fullstack",
    },

    workType: {
      type: String,
      enum: projectWorkTypes,
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

projectSchema.index({ workType: 1 });
projectSchema.index({ userId: 1 });
projectSchema.index({
  title: "text",
  description: "text",
});

const Project = models.Project || model("Project", projectSchema);

export default Project;
