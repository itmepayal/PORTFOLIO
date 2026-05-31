import mongoose, { Schema, model, models, Document } from "mongoose";

/* ============================= */
/* USER TYPES */
/* ============================= */

export type UserRole = "admin" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/* ============================= */
/* SCHEMA */
/* ============================= */

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ============================= */
/* MODEL */
/* ============================= */

const User = models.User || model<IUser>("User", userSchema);

export default User;
