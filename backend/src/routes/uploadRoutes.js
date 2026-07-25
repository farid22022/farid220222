import express from "express";
import {
  deleteUploadMetadata,
  getUploads,
  uploadImage,
  uploadMultiple
} from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getUploads);
router.post("/image", protect, upload.single("image"), uploadImage);
router.post("/multiple", protect, upload.array("images", 8), uploadMultiple);
router.delete("/:id", protect, deleteUploadMetadata);

export default router;
