import express from "express";
import {
  createStory,
  deleteStory,
  getFeaturedStories,
  getStories,
  updateStory
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/featured", getFeaturedStories);
router.post("/", protect, createStory);
router.put("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);

export default router;
