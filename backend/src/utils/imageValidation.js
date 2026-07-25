const allowedImageProtocols = new Set(["http:", "https:"]);

export function isValidImageUrl(value, { allowEmpty = true } = {}) {
  if (value === undefined || value === null || value === "") return allowEmpty;
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value.trim());
    return allowedImageProtocols.has(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function normalizeImageUrl(value, fieldName = "image") {
  const url = String(value || "").trim();
  if (!url) return "";
  if (!isValidImageUrl(url, { allowEmpty: false })) {
    const error = new Error(`${fieldName} must be a valid HTTP or HTTPS image URL`);
    error.statusCode = 400;
    throw error;
  }
  return url;
}

export function normalizeImageUrls(value, fieldName = "images") {
  const values = Array.isArray(value)
    ? value
    : String(value || "")
        .split(",")
        .map((item) => item.trim());

  return [...new Set(values.filter(Boolean).map((url) => normalizeImageUrl(url, fieldName)))];
}

export const imageUrlField = {
  type: String,
  default: "",
  trim: true,
  validate: {
    validator: (value) => isValidImageUrl(value),
    message: "Image URL must use HTTP or HTTPS"
  }
};
