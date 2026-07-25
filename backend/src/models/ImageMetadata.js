import mongoose from "mongoose";
import { isValidImageUrl } from "../utils/imageValidation.js";

const imageMetadataSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true, index: true },
    provider: { type: String, enum: ["imgbb"], default: "imgbb", required: true },
    providerId: { type: String, required: true, index: true },
    url: {
      type: String,
      required: true,
      trim: true,
      validate: { validator: (value) => isValidImageUrl(value, { allowEmpty: false }), message: "Invalid image URL" }
    },
    deleteUrl: { type: String, default: "", trim: true },
    thumbUrl: { type: String, default: "", trim: true },
    mediumUrl: { type: String, default: "", trim: true },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    bytes: { type: Number, min: 0 },
    mimeType: { type: String, default: "" },
    originalName: { type: String, default: "" },
    field: { type: String, default: "image", trim: true },
    entityType: { type: String, default: "unassigned", index: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, default: null, index: true },
    status: { type: String, enum: ["active", "orphaned", "deleted"], default: "active" }
  },
  { timestamps: true }
);

imageMetadataSchema.index({ provider: 1, providerId: 1 }, { unique: true });

export default mongoose.model("ImageMetadata", imageMetadataSchema);
