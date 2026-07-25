const customFieldTypes = new Set(["text", "textarea", "image", "gallery"]);

export function normalizeArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMaybeJson(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function normalizeCustomFields(value) {
  const fields = parseMaybeJson(value);
  if (!Array.isArray(fields)) return [];

  return fields
    .map((field) => {
      const type = customFieldTypes.has(field?.type) ? field.type : "text";
      const label = String(field?.label || "").trim();
      const rawValue = field?.value;
      let normalizedValue;
      if (type === "gallery") normalizedValue = normalizeImageUrls(rawValue, `${label || "Custom field"} gallery`);
      else if (type === "image") normalizedValue = normalizeImageUrl(rawValue, label || "Custom field image");
      else normalizedValue = String(rawValue || "").trim();

      return {
        label,
        type,
        value: normalizedValue
      };
    })
    .filter((field) => {
      if (!field.label) return false;
      if (field.type === "gallery") return field.value.length > 0;
      return Boolean(field.value);
    });
}
import { normalizeImageUrl, normalizeImageUrls } from "./imageValidation.js";
