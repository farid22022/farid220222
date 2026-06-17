import mongoose from "mongoose";
import { slugify } from "../utils/slugify.js";
import { customFieldSchema } from "./customFieldSchema.js";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    gallery: [{ type: String }],
    customFields: [customFieldSchema],
    category: { type: String, default: "Engineering" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

blogSchema.pre("validate", function buildSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export default mongoose.model("Blog", blogSchema);
