import multer from "multer";

const storage = multer.memoryStorage();
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function fileFilter(req, file, cb) {
  if (allowedTypes.has(file.mimetype)) return cb(null, true);
  const error = new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  error.statusCode = 400;
  return cb(error);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 8
  }
});
