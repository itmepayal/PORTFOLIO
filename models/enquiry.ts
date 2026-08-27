import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    replied: {
      type: Boolean,
      default: false,
    },

    repliedAt: {
      type: Date,
      default: null,
    },

    repliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

enquirySchema.index({ email: 1 });
enquirySchema.index({ isRead: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ repliedBy: 1 });

const Enquiry = models.Enquiry || model("Enquiry", enquirySchema);

export default Enquiry;
