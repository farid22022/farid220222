import express from "express";
import {
  createProject,
  deleteProject,
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
  updateProject
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
