import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import { seedAdmin } from "../src/utils/seedAdmin.js";
import { seedTheme } from "../src/utils/seedTheme.js";

let ready;

async function prepare() {
  if (!ready) {
    ready = connectDB()
      .then(() => seedAdmin())
      .then(() => seedTheme());
  }

  return ready;
}

export default async function handler(req, res) {
  await prepare();
  return app(req, res);
}
