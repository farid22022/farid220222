import Message from "../models/Message.js";

export async function createMessage(req, res, next) {
  try {
    const { name, email, message, context } = req.body;
    const doc = await Message.create({ name, email, message, context });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    const doc = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!doc) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
