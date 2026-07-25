import express from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  getCertificateById,
  getCertificateBySlug,
  getFeaturedCertificates,
  updateCertificate
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertificates);
router.get("/featured", getFeaturedCertificates);
router.get("/id/:id", protect, getCertificateById);
router.get("/:slug", getCertificateBySlug);
router.post("/", protect, createCertificate);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

export default router;
