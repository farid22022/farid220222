import Certificate from "../models/Certificate.js";

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
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    next(error);
  }
}

export async function updateCertificate(req, res, next) {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }
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
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    next(error);
  }
}
