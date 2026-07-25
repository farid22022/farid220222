import express from "express";
import {
  createStory,
  deleteStory,
  getFeaturedStories,
  getStoryById,
  getStories,
  updateStory
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/featured", getFeaturedStories);
router.get("/id/:id", protect, getStoryById);
router.post("/", protect, createStory);
router.put("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);

export default router;
