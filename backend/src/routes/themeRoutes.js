import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTheme);
router.put("/", protect, updateTheme);

export default router;
