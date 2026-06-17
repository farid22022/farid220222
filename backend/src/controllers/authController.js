import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email?.toLowerCase() });

    if (!admin || !(await admin.matchPassword(password || ""))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        avatar: admin.avatar,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({ admin: req.admin });
}

export async function logout(req, res) {
  res.json({ message: "Logged out" });
}
