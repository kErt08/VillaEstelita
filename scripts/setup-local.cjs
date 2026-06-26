const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "secret", "supabase-config.js");
const dest = path.join(root, "js", "supabase-config.js");

if (!fs.existsSync(src)) {
  console.error("Missing secret/supabase-config.js — add your Supabase keys there first.");
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log("Copied secret/supabase-config.js → js/supabase-config.js for local testing.");
