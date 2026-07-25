import mongoose from "mongoose";
import { themePreferenceFields } from "./preferenceFields.js";

const themeSchema = new mongoose.Schema(
  themePreferenceFields,
  { timestamps: true }
);

export default mongoose.model("Theme", themeSchema);
