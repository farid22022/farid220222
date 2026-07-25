const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxInputBytes = 8 * 1024 * 1024;
const maxDimension = 1920;

export function validateImageFile(file) {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Choose a JPEG, PNG, WebP, or GIF image");
  }
  if (file.size > maxInputBytes) {
    throw new Error("Images must be 8 MB or smaller");
  }
}

function replaceExtension(name, extension) {
  return `${name.replace(/\.[^/.]+$/, "") || "image"}.${extension}`;
}

export async function optimizeImage(file) {
  validateImageFile(file);
  if (file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  if (scale === 1 && file.size < 900 * 1024 && file.type === "image/webp") {
    bitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true });
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const outputType = file.type === "image/png" ? "image/webp" : file.type;
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) => (value ? resolve(value) : reject(new Error("Could not optimize this image"))),
      outputType,
      0.84
    );
  });

  if (blob.size >= file.size && scale === 1) return file;
  const extension = outputType.split("/")[1] || "webp";
  return new File([blob], replaceExtension(file.name, extension), {
    type: outputType,
    lastModified: file.lastModified
  });
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isRenderableImageUrl(value) {
  if (!value || typeof value !== "string") return false;
  if (value.startsWith("blob:")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
