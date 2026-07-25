import express from "express";
import { getThemePreference, updateThemePreference } from "../controllers/preferenceController.js";
import { optionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/theme", optionalAuth, getThemePreference);
router.put("/theme", protect, updateThemePreference);

export default router;
