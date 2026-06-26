const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const siteUrl = process.env.SITE_URL
  ? process.env.SITE_URL.replace(/\/$/, "")
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`
    : "https://YOUR-SITE-URL";

const files = ["index.html", "Villa Estelita.html", "robots.txt", "sitemap.xml"];

files.forEach((file) => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8").split("https://YOUR-SITE-URL").join(siteUrl);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated site URL in ${file} → ${siteUrl}`);
});
