/**
 * Generates PWA icons and splash screens from public/icons/favicon.svg.
 * Requires: bun add -d sharp
 * Run: bun run scripts/generate-pwa-icons.js  or  bun run generate-pwa-icons
 */
const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "public", "icons");
const inputSvg = path.join(iconsDir, "favicon.svg");
const iconSizes = [192, 512];

// Splash: physical pixels (width x height) for apple-touch-startup-image
const splashSizes = [
  { w: 1170, h: 2532 }, // iPhone 14/13
  { w: 1290, h: 2796 }, // iPhone 14 Pro Max
  { w: 1242, h: 2688 }, // iPhone 11 Pro Max / Xs Max
  { w: 750, h: 1334 },  // iPhone 8 / SE
  { w: 2048, h: 2732 }, // iPad Pro 12.9"
];

const SPLASH_BG = { r: 30, g: 29, b: 32 }; // #1e1d20

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

  // Icons
  for (const size of iconSizes) {
    const outPath = path.join(iconsDir, `icon-${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(outPath);
    console.log("Wrote", outPath);
  }

  // Splash screens: full-screen background + centered logo
  const logoSize = 512;
  const logo = await sharp(svg).resize(logoSize, logoSize).png().toBuffer();

  for (const { w, h } of splashSizes) {
    const outPath = path.join(iconsDir, `splash-${w}x${h}.png`);
    const logoW = Math.min(logoSize, Math.round(Math.min(w, h) * 0.35));
    const logoH = logoW;
    const resizedLogo = await sharp(logo).resize(logoW, logoH).toBuffer();
    const left = Math.round((w - logoW) / 2);
    const top = Math.round((h - logoH) / 2);

    const bgBuffer = Buffer.alloc(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      bgBuffer[i * 4 + 0] = SPLASH_BG.r;
      bgBuffer[i * 4 + 1] = SPLASH_BG.g;
      bgBuffer[i * 4 + 2] = SPLASH_BG.b;
      bgBuffer[i * 4 + 3] = 255;
    }

    await sharp(bgBuffer, {
      raw: { width: w, height: h, channels: 4 },
    })
      .composite([{ input: resizedLogo, left, top }])
      .png()
      .toFile(outPath);
    console.log("Wrote", outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
