import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("assets");
const quality = 85;

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const images = await collectImages(assetsDir);
let totalBefore = 0;
let totalAfter = 0;

for (const inputPath of images) {
  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, ".webp");
  const before = (await stat(inputPath)).size;

  await sharp(inputPath)
    .webp({ quality, effort: 4 })
    .toFile(outputPath);

  const after = (await stat(outputPath)).size;
  totalBefore += before;
  totalAfter += after;

  const name = path.relative(assetsDir, inputPath);
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`${name} → ${path.basename(outputPath)} (${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB, -${saved}%)`);
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`
);
