#!/usr/bin/env node
/**
 * Renames `public/backgrounds/{Grand Prix name}/` and `public/backgrounds-thumbs/{...}/`
 * to `public/backgrounds/{raceId}/` matching `id` in `src/lib/races-mapping.ts`.
 *
 * Does not touch `Pre-Season Testing`, `pass.jpg`, or other non-mapped folders.
 *
 * Usage (from formulaone/):
 *   node scripts/rename-background-folders-to-race-ids.js
 *   node scripts/rename-background-folders-to-race-ids.js --dry-run
 */

const fs = require("fs");
const path = require("path");

const RENAME_MAP = [
  ["Australian Grand Prix", "australian-gp"],
  ["Chinese Grand Prix", "chinese-gp"],
  ["Japanese Grand Prix", "japanese-gp"],
  ["Bahrain Grand Prix", "bahrain-gp"],
  ["Saudi Arabian Grand Prix", "saudi-arabian-gp"],
  ["Miami Grand Prix", "miami-gp"],
  ["Canadian Grand Prix", "canadian-gp"],
  ["Monaco Grand Prix", "monaco-gp"],
  ["Spanish Grand Prix", "spanish-gp"],
  ["Austrian Grand Prix", "austrian-gp"],
  ["British Grand Prix", "british-gp"],
  ["Belgian Grand Prix", "belgian-gp"],
  ["Hungarian Grand Prix", "hungarian-gp"],
  ["Dutch Grand Prix", "dutch-gp"],
  ["Italian Grand Prix", "italian-gp"],
  ["Madrid Grand Prix", "madrid-gp"],
  ["Azerbaijan Grand Prix", "azerbaijan-gp"],
  ["Singapore Grand Prix", "singapore-gp"],
  ["United States Grand Prix", "us-gp"],
  ["Mexico City Grand Prix", "mexico-city-gp"],
  ["Sao Paulo Grand Prix", "sao-paulo-gp"],
  ["Las Vegas Grand Prix", "las-vegas-gp"],
  ["Qatar Grand Prix", "qatar-gp"],
  ["Abu Dhabi Grand Prix", "abu-dhabi-gp"],
];

const dryRun = process.argv.includes("--dry-run");

function renamePair(baseDir, label) {
  const root = path.join(__dirname, "..", baseDir);
  if (!fs.existsSync(root)) {
    console.warn(`[skip] ${label}: missing ${root}`);
    return;
  }
  for (const [oldName, id] of RENAME_MAP) {
    const from = path.join(root, oldName);
    const to = path.join(root, id);
    if (!fs.existsSync(from)) {
      if (fs.existsSync(to)) {
        console.log(`[ok] ${label}: already ${id}`);
      } else {
        console.warn(`[skip] ${label}: no folder "${oldName}"`);
      }
      continue;
    }
    if (fs.existsSync(to)) {
      console.error(`[error] ${label}: "${id}" exists; remove or merge before renaming "${oldName}"`);
      process.exitCode = 1;
      continue;
    }
    if (dryRun) {
      console.log(`[dry-run] ${path.join(baseDir, oldName)} -> ${path.join(baseDir, id)}`);
    } else {
      fs.renameSync(from, to);
      console.log(`[renamed] ${path.join(baseDir, oldName)} -> ${path.join(baseDir, id)}`);
    }
  }
}

renamePair("public/backgrounds", "backgrounds");
renamePair("public/backgrounds-thumbs", "backgrounds-thumbs");

if (dryRun) {
  console.log("\nDry run only. Run without --dry-run to apply.");
}
