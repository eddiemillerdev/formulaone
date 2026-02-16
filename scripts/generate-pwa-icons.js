/**
 * Generates PWA icons (icon-192.png, icon-512.png) from public/icons/favicon.svg.
 * Requires: bun add -d sharp  (or npm install --save-dev sharp)
 * Run: bun run scripts/generate-pwa-icons.js  (or node scripts/generate-pwa-icons.js)
 */
const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "public", "icons");
const inputSvg = path.join(iconsDir, "favicon.svg");
const sizes = [192, 512];

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.warn("Optional: install sharp to generate PWA icons: bun add -d sharp");
    process.exit(0);
    return;
  }

  if (!fs.existsSync(inputSvg)) {
    console.warn("Input not found:", inputSvg);
    process.exit(1);
  }

  const svg = fs.readFileSync(inputSvg);
  for (const size of sizes) {
    const outPath = path.join(iconsDir, `icon-${size}.png`);
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log("Wrote", outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
