import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";
import { linkImageMetadata, unlinkImageMetadata } from "../utils/imageMetadata.js";
import { normalizeImageUrl } from "../utils/imageValidation.js";
import { normalizeArray } from "../utils/normalizePayload.js";
import { slugify } from "../utils/slugify.js";

function normalizeCertificatePayload(body) {
  return {
    ...body,
    certificateImage: normalizeImageUrl(body.certificateImage, "Certificate image"),
    skills: normalizeArray(body.skills),
    expiryDate: body.expiryDate || null,
    slug: body.slug || (body.title ? slugify(body.title) : undefined)
  };
}

export async function getCertificateBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    let cert = await Certificate.findOne({ slug });
    if (!cert && mongoose.Types.ObjectId.isValid(slug)) {
      cert = await Certificate.findById(slug);
    }
    if (!cert) {
      res.status(404);
      throw new Error("Certificate not found");
    }
    res.json(cert);
  } catch (error) {
    next(error);
  }
}

export async function getCertificateById(req, res, next) {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }
    res.json(certificate);
  } catch (error) {
    next(error);
  }
}

export async function getCertificates(req, res, next) {
  try {
    const { search = "", category } = req.query;
    const filter = {};
    if (search) filter.$or = [{ title: new RegExp(search, "i") }, { issuer: new RegExp(search, "i") }];
    if (category) filter.category = category;

    const certificates = await Certificate.find(filter).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedCertificates(req, res, next) {
  try {
    const certificates = await Certificate.find({ featured: true }).sort({ issueDate: -1 }).limit(6);
    res.json(certificates);
  } catch (error) {
    next(error);
  }
}

export async function createCertificate(req, res, next) {
  try {
    const certificate = await Certificate.create(normalizeCertificatePayload(req.body));
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "certificate",
      entityId: certificate._id,
      urls: [certificate.certificateImage]
    });
    res.status(201).json(certificate);
  } catch (error) {
    next(error);
  }
}

export async function updateCertificate(req, res, next) {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, normalizeCertificatePayload(req.body), {
      new: true,
      runValidators: true
    });
    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "certificate",
      entityId: certificate._id,
      urls: [certificate.certificateImage]
    });
    res.json(certificate);
  } catch (error) {
    next(error);
  }
}

export async function deleteCertificate(req, res, next) {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }
    await unlinkImageMetadata({ owner: req.admin._id, entityType: "certificate", entityId: certificate._id });
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    next(error);
  }
}
