import { randomInt } from "node:crypto";
import TextShare from "../models/TextShare.js";

const CODE_LENGTH = 6;
const EXPIRES_IN_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function normalizeCode(code = "") {
  return String(code).replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function generateCode() {
  return String(randomInt(0, 10 ** CODE_LENGTH)).padStart(CODE_LENGTH, "0");
}

export async function createTextShare(req, res, next) {
  try {
    const text = String(req.body.text || "").trim();

    if (!text) {
      res.status(400);
      throw new Error("Text is required");
    }

    if (text.length > 12000) {
      res.status(400);
      throw new Error("Text must be 12000 characters or less");
    }

    let share;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      try {
        const expiresAt = new Date(Date.now() + EXPIRES_IN_MS);
        share = await TextShare.create({ code: generateCode(), text, expiresAt });
        break;
      } catch (error) {
        if (error.code !== 11000 || attempt === MAX_ATTEMPTS - 1) throw error;
      }
    }

    res.status(201).json({
      code: share.code,
      expiresAt: share.expiresAt,
      ttlSeconds: Math.floor((share.expiresAt.getTime() - Date.now()) / 1000)
    });
  } catch (error) {
    next(error);
  }
}

export async function getTextShare(req, res, next) {
  try {
    const code = normalizeCode(req.params.code);

    if (!code) {
      res.status(400);
      throw new Error("OTP code is required");
    }

    const share = await TextShare.findOne({ code });

    if (!share) {
      res.status(404);
      throw new Error("Shared text not found");
    }

    if (share.expiresAt <= new Date()) {
      await TextShare.deleteOne({ _id: share._id });
      res.status(410);
      throw new Error("This OTP code has expired");
    }

    res.json({
      code: share.code,
      text: share.text,
      expiresAt: share.expiresAt,
      ttlSeconds: Math.floor((share.expiresAt.getTime() - Date.now()) / 1000)
    });
  } catch (error) {
    next(error);
  }
}
