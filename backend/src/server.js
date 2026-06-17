import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import { seedTheme } from "./utils/seedTheme.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  await seedAdmin();
  await seedTheme();

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

bootstrap();
