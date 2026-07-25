import mongoose from "mongoose";
import { themePreferenceFields } from "./preferenceFields.js";

const userThemePreferenceSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
      index: true
    },
    ...themePreferenceFields
  },
  { timestamps: true }
);

export default mongoose.model("UserThemePreference", userThemePreferenceSchema);
