import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema(
  {
    /* ====================================================== */
    /* CONTACT INFO */
    /* ====================================================== */

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

    /* ====================================================== */
    /* MESSAGE */
    /* ====================================================== */

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    /* ====================================================== */
    /* STATUS */
    /* ====================================================== */

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
  },
  {
    timestamps: true,
  },
);

/* ====================================================== */
/* INDEXES */
/* ====================================================== */

enquirySchema.index({ email: 1 });

enquirySchema.index({ isRead: 1 });

enquirySchema.index({ createdAt: -1 });

const Enquiry = models.Enquiry || model("Enquiry", enquirySchema);

export default Enquiry;
