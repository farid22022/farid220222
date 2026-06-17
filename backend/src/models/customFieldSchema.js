import mongoose from "mongoose";

export const customFieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["text", "textarea", "image", "gallery"],
      default: "text"
    },
    value: { type: mongoose.Schema.Types.Mixed, default: "" }
  },
  { _id: false }
);
