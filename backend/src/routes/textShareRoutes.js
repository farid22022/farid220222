import express from "express";
import { createTextShare, getTextShare } from "../controllers/textShareController.js";

const router = express.Router();

router.post("/", createTextShare);
router.get("/:code", getTextShare);

export default router;
