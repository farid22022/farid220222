import Blog from "../models/Blog.js";
import { collectImageUrls, linkImageMetadata, unlinkImageMetadata } from "../utils/imageMetadata.js";
import { normalizeImageUrl, normalizeImageUrls } from "../utils/imageValidation.js";
import { normalizeArray, normalizeCustomFields } from "../utils/normalizePayload.js";
import { slugify } from "../utils/slugify.js";

function normalizeBlogPayload(body) {
  return {
    ...body,
    coverImage: normalizeImageUrl(body.coverImage, "Blog cover image"),
    tags: normalizeArray(body.tags),
    gallery: normalizeImageUrls(body.gallery, "Blog gallery"),
    customFields: normalizeCustomFields(body.customFields)
  };
}

export async function getBlogById(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
}

export async function getBlogs(req, res, next) {
  try {
    const { search = "", category, published } = req.query;
    const filter = {};
    if (search) filter.$or = [{ title: new RegExp(search, "i") }, { excerpt: new RegExp(search, "i") }];
    if (category) filter.category = category;
    if (published !== undefined) filter.published = published === "true";

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedBlogs(req, res, next) {
  try {
    const blogs = await Blog.find({ featured: true, published: true }).sort({ createdAt: -1 }).limit(6);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(req, res, next) {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
}

export async function createBlog(req, res, next) {
  try {
    const blog = await Blog.create(normalizeBlogPayload({
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.title)
    }));
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "blog",
      entityId: blog._id,
      urls: collectImageUrls(blog, ["coverImage", "gallery"])
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(req, res, next) {
  try {
    const payload = normalizeBlogPayload(req.body);
    if (payload.slug || payload.title) payload.slug = slugify(payload.slug || payload.title);

    const blog = await Blog.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "blog",
      entityId: blog._id,
      urls: collectImageUrls(blog, ["coverImage", "gallery"])
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    await unlinkImageMetadata({ owner: req.admin._id, entityType: "blog", entityId: blog._id });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
}
