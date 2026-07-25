import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { imageUrlField } from "../utils/imageValidation.js";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, default: "Md. Farid Hossen Rehad" },
    avatar: imageUrlField,
    role: { type: String, default: "admin" }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Admin", adminSchema);
