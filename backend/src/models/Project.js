import mongoose from "mongoose";
import { slugify } from "../utils/slugify.js";
import { imageUrlField } from "../utils/imageValidation.js";
import { customFieldSchema } from "./customFieldSchema.js";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: imageUrlField,
    gallery: [imageUrlField],
    customFields: [customFieldSchema],
    technologies: [{ type: String }],
    category: { type: String, default: "Web App" },
    projectType: { type: String, default: "Full Stack" },
    aiDomain: { type: String, default: "" },
    problemStatement: { type: String, default: "" },
    keyFeatures: [{ type: String }],
    mlTechniques: [{ type: String }],
    modelArchitectures: [{ type: String }],
    datasetName: { type: String, default: "" },
    datasetUrl: { type: String, default: "" },
    notebookUrl: { type: String, default: "" },
    modelUrl: { type: String, default: "" },
    paperUrl: { type: String, default: "" },
    demoVideoUrl: { type: String, default: "" },
    accuracy: { type: String, default: "" },
    metrics: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "published" }
  },
  { timestamps: true }
);

projectSchema.pre("validate", function buildSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export default mongoose.model("Project", projectSchema);
