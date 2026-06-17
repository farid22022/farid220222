import Admin from "../models/Admin.js";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "change-me-now";
  const existing = await Admin.findOne({ email });

  if (existing) {
    const passwordMatches = await existing.matchPassword(password);
    if (!passwordMatches) {
      existing.password = password;
      await existing.save();
    }
    return existing;
  }

  return Admin.create({
    email,
    password,
    name: "Md. Farid Hossen Rehad",
    role: "admin"
  });
}
