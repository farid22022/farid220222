import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    credentialUrl: { type: String, default: "" },
    certificateImage: { type: String, default: "" },
    category: { type: String, default: "Development" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
