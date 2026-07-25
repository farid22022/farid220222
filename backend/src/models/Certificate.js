import mongoose from "mongoose";
import { imageUrlField } from "../utils/imageValidation.js";
import { slugify } from "../utils/slugify.js";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true, index: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, default: null },
    credentialId: { type: String, default: "", trim: true },
    credentialUrl: { type: String, default: "" },
    description: { type: String, default: "", trim: true },
    skills: [{ type: String, trim: true }],
    grade: { type: String, default: "", trim: true },
    certificateImage: imageUrlField,
    category: { type: String, default: "Development" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

certificateSchema.pre("validate", function buildSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export default mongoose.model("Certificate", certificateSchema);
