import { getImgBBApiKey, imgbbUploadUrl, isImgBBConfigured } from "../config/imgbb.js";

function getUploadName(file) {
  const name = file.originalname || "portfolio-image";
  const withoutExtension = name.replace(/\.[^/.]+$/, "");
  const safeName = withoutExtension
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return safeName || "portfolio-image";
}

function getImageUrl(data) {
  return data.display_url || data.image?.url || data.url;
}

function formatUploadResult(data) {
  return {
    url: getImageUrl(data),
    publicId: data.id,
    deleteUrl: data.delete_url,
    width: Number(data.width) || undefined,
    height: Number(data.height) || undefined,
    thumbUrl: data.thumb?.url,
    mediumUrl: data.medium?.url,
    provider: "imgbb"
  };
}

function getImgBBError(payload) {
  if (typeof payload?.error?.message === "string") return payload.error.message;
  if (typeof payload?.error === "string") return payload.error;
  return "ImgBB upload failed";
}

async function uploadBuffer(file) {
  const body = new URLSearchParams({
    image: file.buffer.toString("base64"),
    name: getUploadName(file)
  });

  const imgbbApiKey = getImgBBApiKey();
  const response = await fetch(`${imgbbUploadUrl}?key=${encodeURIComponent(imgbbApiKey)}`, {
    method: "POST",
    body
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("ImgBB upload failed");
  }

  if (!response.ok || !payload?.success || !payload?.data) {
    throw new Error(getImgBBError(payload));
  }

  const result = formatUploadResult(payload.data);
  if (!result.url) throw new Error("ImgBB did not return an image URL");

  return result;
}

export async function uploadImage(req, res, next) {
  try {
    if (!isImgBBConfigured()) {
      res.status(503);
      throw new Error("ImgBB API key is not configured");
    }
    if (!req.file) {
      res.status(400);
      throw new Error("No image file provided");
    }

    const result = await uploadBuffer(req.file);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function uploadMultiple(req, res, next) {
  try {
    if (!isImgBBConfigured()) {
      res.status(503);
      throw new Error("ImgBB API key is not configured");
    }
    if (!req.files?.length) {
      res.status(400);
      throw new Error("No image files provided");
    }

    const uploads = await Promise.all(req.files.map((file) => uploadBuffer(file)));
    res.status(201).json(uploads);
  } catch (error) {
    next(error);
  }
}
