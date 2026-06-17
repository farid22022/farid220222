import express from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  getFeaturedCertificates,
  updateCertificate
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertificates);
router.get("/featured", getFeaturedCertificates);
router.post("/", protect, createCertificate);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

export default router;
