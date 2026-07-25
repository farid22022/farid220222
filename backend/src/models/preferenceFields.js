import { imageUrlField } from "../utils/imageValidation.js";

export const themePreferenceFields = {
  siteName: { type: String, default: "Md. Farid Hossen Rehad", trim: true },
  logo: imageUrlField,
  favicon: imageUrlField
};
