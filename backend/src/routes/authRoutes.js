import express from "express";
import { login, logout, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

export default router;
