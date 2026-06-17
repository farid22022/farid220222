import Story from "../models/Story.js";
import { normalizeArray, normalizeCustomFields } from "../utils/normalizePayload.js";

function normalizeStoryPayload(body) {
  return {
    ...body,
    gallery: normalizeArray(body.gallery),
    customFields: normalizeCustomFields(body.customFields)
  };
}

export async function getStories(req, res, next) {
  try {
    const { search = "", type } = req.query;
    const filter = {};
    if (search) filter.$or = [{ title: new RegExp(search, "i") }, { description: new RegExp(search, "i") }];
    if (type) filter.type = type;

    const stories = await Story.find(filter).sort({ date: -1 });
    res.json(stories);
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedStories(req, res, next) {
  try {
    const stories = await Story.find({ featured: true }).sort({ date: -1 }).limit(6);
    res.json(stories);
  } catch (error) {
    next(error);
  }
}

export async function createStory(req, res, next) {
  try {
    const story = await Story.create(normalizeStoryPayload(req.body));
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
}

export async function updateStory(req, res, next) {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, normalizeStoryPayload(req.body), {
      new: true,
      runValidators: true
    });
    if (!story) {
      res.status(404);
      throw new Error("Story not found");
    }
    res.json(story);
  } catch (error) {
    next(error);
  }
}

export async function deleteStory(req, res, next) {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      res.status(404);
      throw new Error("Story not found");
    }
    res.json({ message: "Story deleted" });
  } catch (error) {
    next(error);
  }
}
