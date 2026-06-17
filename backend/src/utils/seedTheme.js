import Theme from "../models/Theme.js";

export async function seedTheme() {
  const existing = await Theme.findOne();
  if (existing) return existing;

  return Theme.create({
    siteName: "Md. Farid Hossen Rehad",
    primaryColor: "#ff3030",
    secondaryColor: "#ff8a50",
    accentColor: "#ff3434",
    backgroundColor: "#000004",
    textColor: "#f8fafc",
    gradientOne: "#ff3030",
    gradientTwo: "#ff8a50",
    fontFamily: "Manrope",
    earthSceneEnabled: true,
    earthScale: 0.68,
    earthScrollZoom: 0.72,
    earthHorizontalDrift: 1,
    earthRotationSpeed: 1,
    earthGlowIntensity: 0.68,
    earthOpacity: 0.72,
    earthMotionFluidity: 0.08
  });
}
