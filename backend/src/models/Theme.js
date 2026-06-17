import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "Md. Farid Hossen Rehad" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    primaryColor: { type: String, default: "#8b5cf6" },
    secondaryColor: { type: String, default: "#06b6d4" },
    accentColor: { type: String, default: "#f43f5e" },
    backgroundColor: { type: String, default: "#05050a" },
    textColor: { type: String, default: "#f8fafc" },
    gradientOne: { type: String, default: "#8b5cf6" },
    gradientTwo: { type: String, default: "#06b6d4" },
    fontFamily: { type: String, default: "Inter" },
    earthSceneEnabled: { type: Boolean, default: true },
    earthScale: { type: Number, default: 0.68, min: 0.35, max: 1.2 },
    earthScrollZoom: { type: Number, default: 0.72, min: 0.2, max: 1.6 },
    earthHorizontalDrift: { type: Number, default: 1, min: 0.2, max: 1.8 },
    earthRotationSpeed: { type: Number, default: 1, min: 0.15, max: 2.5 },
    earthGlowIntensity: { type: Number, default: 0.68, min: 0.1, max: 1.2 },
    earthOpacity: { type: Number, default: 0.72, min: 0.1, max: 1 },
    earthMotionFluidity: { type: Number, default: 0.08, min: 0.02, max: 0.18 }
  },
  { timestamps: true }
);

export default mongoose.model("Theme", themeSchema);
