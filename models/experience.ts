import { Schema, model, models } from "mongoose";
import { userIdField } from "./shared/fields";

const experienceSchema = new Schema(
  {
    userId: userIdField,

    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      default: "Present",
    },

    current: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: [
      {
        type: String,
      },
    ],

    technologies: [
      {
        type: String,
      },
    ],

    companyLogo: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
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

experienceSchema.index({ userId: 1 });
experienceSchema.index({ order: 1 });

const Experience = models.Experience || model("Experience", experienceSchema);

export default Experience;
