import Project from "../models/Project.js";
import { collectImageUrls, linkImageMetadata, unlinkImageMetadata } from "../utils/imageMetadata.js";
import { normalizeImageUrl, normalizeImageUrls } from "../utils/imageValidation.js";
import { normalizeArray, normalizeCustomFields } from "../utils/normalizePayload.js";
import { slugify } from "../utils/slugify.js";

function normalizeProjectPayload(body) {
  return {
    ...body,
    image: normalizeImageUrl(body.image, "Project image"),
    technologies: normalizeArray(body.technologies),
    gallery: normalizeImageUrls(body.gallery, "Project gallery"),
    customFields: normalizeCustomFields(body.customFields),
    keyFeatures: normalizeArray(body.keyFeatures),
    mlTechniques: normalizeArray(body.mlTechniques),
    modelArchitectures: normalizeArray(body.modelArchitectures)
  };
}

export async function getProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
}

export async function getProjects(req, res, next) {
  try {
    const { search = "", category, status, projectType, aiDomain } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { aiDomain: new RegExp(search, "i") },
        { projectType: new RegExp(search, "i") }
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (projectType) filter.projectType = projectType;
    if (aiDomain) filter.aiDomain = aiDomain;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedProjects(req, res, next) {
  try {
    const projects = await Project.find({ featured: true, status: "published" }).sort({ createdAt: -1 }).limit(6);
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

export async function getProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const payload = normalizeProjectPayload({
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.title)
    });
    const project = await Project.create(payload);
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "project",
      entityId: project._id,
      urls: collectImageUrls(project, ["image", "gallery"])
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const payload = normalizeProjectPayload(req.body);
    if (payload.slug || payload.title) payload.slug = slugify(payload.slug || payload.title);

    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "project",
      entityId: project._id,
      urls: collectImageUrls(project, ["image", "gallery"])
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    await unlinkImageMetadata({ owner: req.admin._id, entityType: "project", entityId: project._id });
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
}
