import express from "express";
import { uploadImage, uploadMultiple } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/image", protect, upload.single("image"), uploadImage);
router.post("/multiple", protect, upload.array("images", 8), uploadMultiple);

export default router;
