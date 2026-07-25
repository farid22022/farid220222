import ImageMetadata from "../models/ImageMetadata.js";

export function collectImageUrls(payload, primaryFields = []) {
  const urls = [];

  primaryFields.forEach((field) => {
    const value = payload?.[field];
    if (Array.isArray(value)) urls.push(...value);
    else if (value) urls.push(value);
  });

  if (Array.isArray(payload?.customFields)) {
    payload.customFields.forEach((field) => {
      if (field?.type === "image" && field.value) urls.push(field.value);
      if (field?.type === "gallery" && Array.isArray(field.value)) urls.push(...field.value);
    });
  }

  return [...new Set(urls.filter(Boolean))];
}

export async function linkImageMetadata({ owner, entityType, entityId, urls }) {
  if (!owner || !entityId) return;
  const uniqueUrls = [...new Set((urls || []).filter(Boolean))];

  await ImageMetadata.updateMany(
    { owner, entityType, entityId, url: { $nin: uniqueUrls } },
    { $set: { entityType: "unassigned", entityId: null, status: "orphaned" } }
  );

  if (!uniqueUrls.length) return;

  await ImageMetadata.updateMany(
    { owner, url: { $in: uniqueUrls } },
    { $set: { entityType, entityId, status: "active" } }
  );
}

export async function unlinkImageMetadata({ owner, entityType, entityId }) {
  if (!owner || !entityId) return;
  await ImageMetadata.updateMany(
    { owner, entityType, entityId },
    { $set: { entityType: "unassigned", entityId: null, status: "orphaned" } }
  );
}
