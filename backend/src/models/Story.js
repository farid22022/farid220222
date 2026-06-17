import mongoose from "mongoose";
import { customFieldSchema } from "./customFieldSchema.js";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    gallery: [{ type: String }],
    customFields: [customFieldSchema],
    date: { type: Date, required: true },
    type: { type: String, default: "Milestone" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
