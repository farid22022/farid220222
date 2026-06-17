export const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

export function getImgBBApiKey() {
  return process.env.IMGBB_API_KEY || process.env.IMAGEBB_API_KEY || "";
}

export function isImgBBConfigured() {
  return Boolean(getImgBBApiKey());
}
