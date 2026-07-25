import mongoose from "mongoose";
import { imageUrlField } from "../utils/imageValidation.js";
import { customFieldSchema } from "./customFieldSchema.js";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: imageUrlField,
    gallery: [imageUrlField],
    customFields: [customFieldSchema],
    date: { type: Date, required: true },
    type: { type: String, default: "Milestone" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
