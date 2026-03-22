#!/usr/bin/env node
/**
 * Normalize Unicode in all paths under public/ so URLs and S3 keys are stable:
 * - NFC (precomposed) — fixes macOS NFD "São" vs "São" vs combining marks on ü, é
 * - São → Sao (ASCII) in any path segment
 *
 * Run from formulaone/ after copying images or generating thumbs:
 *   node scripts/normalize-public-filenames.js
 *   bun run normalize-public-names
 *
 * Uses temp renames so APFS does not block NFC-only renames.
 */
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function safeBasename(name) {
  let n = name.normalize("NFC");
  n = n.replace(/São/g, "Sao").replace(/são/g, "sao");
  return n;
}

function collect(root, out = []) {
  if (!fs.existsSync(root)) return out;
  for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, ent.name);
    if (ent.isDirectory()) collect(full, out);
    out.push(full);
  }
  return out;
}

function main() {
  const all = collect(PUBLIC_DIR);
  all.sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);

  let count = 0;
  for (const full of all) {
    const dir = path.dirname(full);
    const base = path.basename(full);
    if (base.startsWith(".uc-tmp-")) continue;
    const next = safeBasename(base);
    if (next === base) continue;
    const tmp = path.join(dir, `.uc-tmp-${process.pid}-${Math.random().toString(36).slice(2)}`);
    fs.renameSync(full, tmp);
    fs.renameSync(tmp, path.join(dir, next));
    console.log(`${base} → ${next}`);
    count++;
  }
  if (count) {
    console.log(`Done. Renamed ${count} path(s).`);
  } else {
    console.log(
      "OK — no changes needed. All names are already NFC + ASCII São→Sao (or there are no files under public/).",
    );
  }
}

main();
