/**
 * Resize/compress images under public/backgrounds (or --root) and write mirrored thumbnails.
 *
 * From formulaone/:
 *   bun run optimize-images -- --dry-run
 *   bun run optimize-images -- --in-place --backup
 *   bun run optimize-images -- --root public/images/sponsors --in-place
 *
 * Without --in-place:
 *   - Full-size optimized copies → public/<name>-optimized/
 *   - Thumbnails → public/<name>-thumbs/
 */
const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("Install sharp: bun add -d sharp");
  process.exit(1);
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function parseArgs(argv) {
  const out = {
    root: path.join("public", "backgrounds"),
    maxWidth: 1920,
    thumbWidth: 480,
    quality: 80,
    thumbQuality: 72,
    inPlace: false,
    backup: false,
    dryRun: false,
    skipThumbs: false,
    maxFiles: 0,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--in-place") out.inPlace = true;
    else if (a === "--backup") out.backup = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--skip-thumbs") out.skipThumbs = true;
    else if (a === "--root" && argv[i + 1]) out.root = argv[++i];
    else if (a === "--max-width" && argv[i + 1]) out.maxWidth = Number(argv[++i]);
    else if (a === "--thumb-width" && argv[i + 1]) out.thumbWidth = Number(argv[++i]);
    else if (a === "--quality" && argv[i + 1]) out.quality = Number(argv[++i]);
    else if (a === "--thumb-quality" && argv[i + 1]) out.thumbQuality = Number(argv[++i]);
    else if (a === "--max-files" && argv[i + 1]) out.maxFiles = Number(argv[++i]);
  }
  return out;
}

function walkFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === "node_modules") continue;
      walkFiles(p, files);
    } else if (IMAGE_EXT.has(path.extname(name.name).toLowerCase())) {
      files.push(p);
    }
  }
  return files;
}

function formatKb(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

async function main() {
  const opts = parseArgs(process.argv);
  const cwd = process.cwd();
  const rootAbs = path.isAbsolute(opts.root) ? opts.root : path.join(cwd, opts.root);

  if (!fs.existsSync(rootAbs)) {
    console.error("Root not found:", rootAbs);
    process.exit(1);
  }

  const baseName = path.basename(rootAbs);
  const parentDir = path.dirname(rootAbs);
  const fullOutRoot = opts.inPlace ? rootAbs : path.join(parentDir, `${baseName}-optimized`);
  const thumbRoot = path.join(parentDir, `${baseName}-thumbs`);

  let files = walkFiles(rootAbs);
  if (opts.maxFiles > 0) files = files.slice(0, opts.maxFiles);
  console.log(`Processing ${files.length} image(s) under ${rootAbs}\n`);

  if (opts.dryRun) {
    let total = 0;
    for (const absPath of files) {
      const rel = path.relative(rootAbs, absPath);
      const st = fs.statSync(absPath);
      total += st.size;
      console.log(`[dry-run] ${rel}  ${formatKb(st.size)}`);
    }
    console.log(`\nTotal: ${formatKb(total)} — would resize (max width ${opts.maxWidth}px, q=${opts.quality})`);
    if (!opts.skipThumbs && opts.thumbWidth > 0) {
      console.log(
        `+ thumbnails (${opts.thumbWidth}px, q=${opts.thumbQuality}) → ${path.join(parentDir, `${baseName}-thumbs`)}`,
      );
    }
    if (!opts.inPlace) {
      console.log(`+ optimized full-size → ${path.join(parentDir, `${baseName}-optimized`)}`);
    }
    console.log("\nRun without --dry-run to process (slow on large folders). Use --max-files N to test.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let written = 0;

  for (const absPath of files) {
    const rel = path.relative(rootAbs, absPath);
    const input = fs.readFileSync(absPath);
    const before = input.length;
    totalBefore += before;

    const meta = await sharp(input, { failOn: "none" }).rotate().metadata();
    const hasAlpha = Boolean(meta.hasAlpha);

    let fullBuf;
    let outRel;
    if (hasAlpha) {
      let p = sharp(input, { failOn: "none" }).rotate();
      if (meta.width && meta.width > opts.maxWidth) {
        p = p.resize({ width: opts.maxWidth, withoutEnlargement: true });
      }
      fullBuf = await p.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
      outRel = rel.replace(/\.(jpe?g|webp)$/i, ".png");
      if (!outRel.endsWith(".png")) outRel = rel;
    } else {
      let p = sharp(input, { failOn: "none" }).rotate();
      if (meta.width && meta.width > opts.maxWidth) {
        p = p.resize({ width: opts.maxWidth, withoutEnlargement: true });
      }
      fullBuf = await p.jpeg({ quality: opts.quality, mozjpeg: true }).toBuffer();
      outRel = rel.replace(/\.(png|webp)$/i, ".jpg");
      if (!/\.(jpe?g)$/i.test(outRel)) {
        outRel = rel.replace(/\.[^.]+$/, ".jpg");
      }
    }

    const afterFull = fullBuf.length;
    totalAfter += afterFull;

    const fullDest = opts.inPlace
      ? path.join(rootAbs, outRel)
      : path.join(fullOutRoot, outRel);

    let thumbBuf = null;
    let thumbDest = null;
    if (!opts.skipThumbs && opts.thumbWidth > 0) {
      thumbBuf = await sharp(input, { failOn: "none" })
        .rotate()
        .resize({ width: opts.thumbWidth, withoutEnlargement: true })
        .jpeg({ quality: opts.thumbQuality, mozjpeg: true })
        .toBuffer();
      const thumbRel = rel.replace(/\.[^.]+$/, ".jpg");
      thumbDest = path.join(thumbRoot, thumbRel);
    }

    if (opts.inPlace && opts.backup) {
      const bak = absPath + ".bak";
      fs.copyFileSync(absPath, bak);
    }

    fs.mkdirSync(path.dirname(fullDest), { recursive: true });
    fs.writeFileSync(fullDest, fullBuf);
    written++;

    if (opts.inPlace && path.resolve(fullDest) !== path.resolve(absPath)) {
      try {
        fs.unlinkSync(absPath);
      } catch {
        /* ignore */
      }
    }

    console.log(`full ${rel}  ${formatKb(before)} → ${formatKb(afterFull)}  (${path.basename(fullDest)})`);

    if (thumbBuf && thumbDest) {
      fs.mkdirSync(path.dirname(thumbDest), { recursive: true });
      fs.writeFileSync(thumbDest, thumbBuf);
      written++;
      console.log(`thumb ${rel}  → ${path.relative(cwd, thumbDest)} (${formatKb(thumbBuf.length)})`);
    }
  }

  const saved = totalBefore - totalAfter;
  console.log(`\nWrote ${written} file(s). Full-size total: ${formatKb(totalBefore)} → ${formatKb(totalAfter)} (saved ~${formatKb(Math.max(0, saved))}).`);

  if (!opts.inPlace) {
    console.log(`\nOptimized: ${fullOutRoot}`);
    if (!opts.skipThumbs) console.log(`Thumbs:     ${thumbRoot}`);
    console.log(
      "\nReview outputs, then replace the original folder or point the app at -optimized / -thumbs if you switch paths.",
    );
  } else if (opts.backup) {
    console.log("\nOriginals copied to *.bak next to each file. Delete .bak when satisfied.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
