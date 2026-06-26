const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outPath = path.join(root, "js", "supabase-config.js");

const url = process.env.VILLA_SUPABASE_URL || process.env.SUPABASE_URL || "";
const anonKey = process.env.VILLA_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

const normalizedUrl = url.replace(/\/$/, "");
const hasConfig =
  normalizedUrl &&
  anonKey &&
  !normalizedUrl.includes("YOUR_PROJECT") &&
  !anonKey.includes("YOUR_ANON") &&
  !anonKey.startsWith("sb_secret_");

const content = hasConfig
  ? `window.VILLA_SUPABASE = {
  url: ${JSON.stringify(normalizedUrl.startsWith("http") ? normalizedUrl : `https://${normalizedUrl}.supabase.co`)},
  anonKey: ${JSON.stringify(anonKey)},
};
`
  : `window.VILLA_SUPABASE = {
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_ANON_PUBLIC_KEY",
};
`;

fs.writeFileSync(outPath, content, "utf8");

if (hasConfig) {
  console.log("Wrote js/supabase-config.js from environment variables.");
} else {
  console.log("No Supabase env vars set — js/supabase-config.js uses placeholders.");
  console.log("For local dev: copy js/supabase-config.example.js → js/supabase-config.js");
}
