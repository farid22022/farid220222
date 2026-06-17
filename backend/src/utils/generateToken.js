import jwt from "jsonwebtoken";

export function generateToken(adminId) {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET || "change-this-secret", {
    expiresIn: "7d"
  });
}
