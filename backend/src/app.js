import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import textShareRoutes from "./routes/textShareRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://faridcseku.web.app",
  "https://faridcseku.firebaseapp.com",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
]);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "farid-portfolio-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/text-shares", textShareRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/messages", messageRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
