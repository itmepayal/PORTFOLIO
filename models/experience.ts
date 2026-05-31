import mongoose, { Schema, model, models } from "mongoose";

const experienceSchema = new Schema(
  {
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

const Experience = models.Experience || model("Experience", experienceSchema);

export default Experience;
