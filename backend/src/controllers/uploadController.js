import { getImgBBApiKey, imgbbUploadUrl, isImgBBConfigured } from "../config/imgbb.js";
import ImageMetadata from "../models/ImageMetadata.js";

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

function hasValidImageSignature(file) {
  const buffer = file.buffer;
  if (!buffer || buffer.length < 12) return false;

  if (file.mimetype === "image/jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (file.mimetype === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (file.mimetype === "image/gif") return ["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString("ascii"));
  if (file.mimetype === "image/webp") {
    return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
}

async function uploadBuffer(file) {
  if (!hasValidImageSignature(file)) {
    const error = new Error("The selected file is not a valid image");
    error.statusCode = 400;
    throw error;
  }

  const body = new URLSearchParams({
    image: file.buffer.toString("base64"),
    name: getUploadName(file)
  });

  const imgbbApiKey = getImgBBApiKey();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let response;

  try {
    response = await fetch(`${imgbbUploadUrl}?key=${encodeURIComponent(imgbbApiKey)}`, {
      method: "POST",
      body,
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === "AbortError") throw new Error("ImgBB upload timed out");
    throw new Error("Unable to reach ImgBB");
  } finally {
    clearTimeout(timeout);
  }

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

async function persistUpload(result, file, req) {
  const metadata = await ImageMetadata.findOneAndUpdate(
    { provider: "imgbb", providerId: result.publicId },
    {
      owner: req.admin._id,
      provider: "imgbb",
      providerId: result.publicId,
      url: result.url,
      deleteUrl: result.deleteUrl || "",
      thumbUrl: result.thumbUrl || "",
      mediumUrl: result.mediumUrl || "",
      width: result.width,
      height: result.height,
      bytes: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
      field: String(req.body?.field || "image").slice(0, 80),
      status: "active"
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  return { ...result, id: metadata._id, metadataId: metadata._id };
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
    res.status(201).json(await persistUpload(result, req.file, req));
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

    const uploads = await Promise.all(
      req.files.map(async (file) => persistUpload(await uploadBuffer(file), file, req))
    );
    res.status(201).json(uploads);
  } catch (error) {
    next(error);
  }
}

export async function getUploads(req, res, next) {
  try {
    const uploads = await ImageMetadata.find({ owner: req.admin._id, status: { $ne: "deleted" } })
      .sort({ createdAt: -1 });
    res.json(uploads);
  } catch (error) {
    next(error);
  }
}

export async function deleteUploadMetadata(req, res, next) {
  try {
    const upload = await ImageMetadata.findOneAndUpdate(
      { _id: req.params.id, owner: req.admin._id },
      { status: "deleted", entityType: "unassigned", entityId: null },
      { new: true }
    );
    if (!upload) {
      res.status(404);
      throw new Error("Image metadata not found");
    }
    res.json({ message: "Image metadata deleted", id: upload._id });
  } catch (error) {
    next(error);
  }
}
