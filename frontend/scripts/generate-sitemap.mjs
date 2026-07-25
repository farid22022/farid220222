import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://faridcseku.web.app";
const API_URL = process.env.VITE_API_URL || "http://localhost:5000/api";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/projects", priority: "0.8" },
  { path: "/blog", priority: "0.8" },
  { path: "/certificates", priority: "0.7" },
  { path: "/stories", priority: "0.6" },
  { path: "/research", priority: "0.6" },
  { path: "/uses", priority: "0.5" },
  { path: "/links", priority: "0.5" },
  { path: "/contact", priority: "0.7" }
];

async function fetchSlugs(resource, query = "") {
  try {
    const res = await fetch(`${API_URL}/${resource}${query}`);
    if (!res.ok) return [];
    const items = await res.json();
    return Array.isArray(items) ? items.map((item) => item.slug || item._id).filter(Boolean) : [];
  } catch {
    return [];
  }
}

const [projectSlugs, blogSlugs, certificateSlugs] = await Promise.all([
  fetchSlugs("projects", "?status=published"),
  fetchSlugs("blogs"),
  fetchSlugs("certificates")
]);

const dynamicUrls = [
  ...projectSlugs.map((slug) => ({ path: `/projects/${slug}`, priority: "0.6" })),
  ...blogSlugs.map((slug) => ({ path: `/blog/${slug}`, priority: "0.6" })),
  ...certificateSlugs.map((slug) => ({ path: `/certificates/${slug}`, priority: "0.5" }))
];

const allUrls = [...STATIC_ROUTES, ...dynamicUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls
  .map((entry) => `  <url><loc>${SITE_URL}${entry.path}</loc><priority>${entry.priority}</priority></url>`)
  .join("\n")}\n</urlset>\n`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(outPath, xml);

console.log(`sitemap.xml written with ${allUrls.length} URLs (${dynamicUrls.length} dynamic).`);
