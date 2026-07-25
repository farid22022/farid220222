import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

async function resolveAdmin(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "change-this-secret");
  return Admin.findById(decoded.id).select("-password");
}

export async function protect(req, res, next) {
  try {
    const admin = await resolveAdmin(req);
    if (!admin) {
      res.status(401);
      throw new Error("Not authorized");
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) res.status(401);
    next(error);
  }
}

export async function optionalAuth(req, res, next) {
  try {
    req.admin = await resolveAdmin(req);
  } catch {
    req.admin = null;
  }
  next();
}
