import Admin from "../models/Admin.js";
import { linkImageMetadata } from "../utils/imageMetadata.js";
import { normalizeImageUrl } from "../utils/imageValidation.js";
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

export async function updateProfile(req, res, next) {
  try {
    const payload = {};
    if (req.body.name !== undefined) payload.name = String(req.body.name).trim();
    if (req.body.avatar !== undefined) payload.avatar = normalizeImageUrl(req.body.avatar, "Profile image");

    const admin = await Admin.findByIdAndUpdate(req.admin._id, payload, {
      new: true,
      runValidators: true
    }).select("-password");

    await linkImageMetadata({
      owner: admin._id,
      entityType: "profile",
      entityId: admin._id,
      urls: [admin.avatar]
    });

    res.json({ admin });
  } catch (error) {
    next(error);
  }
}
