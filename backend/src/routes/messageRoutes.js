import express from "express";
import { createMessage, deleteMessage, getMessages, markRead } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteMessage);

export default router;
