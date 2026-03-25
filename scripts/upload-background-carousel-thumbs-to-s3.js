#!/usr/bin/env node
/**
 * Upload only race carousel thumbnails: `1.jpg`, `2.jpg`, `3.jpg` under
 * `public/backgrounds-thumbs/{raceId}/` (same ids as races-mapping). Same env and flags as
 * upload-public-to-s3.js, with its own manifest (separate from full-size
 * `upload-background-carousel-to-s3.js`).
 *
 * Incremental uploads: a JSON manifest stores sha256 per relative path.
 *
 * Required (or use ~/.aws/credentials + IAM role):
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_REGION          (e.g. eu-west-1)
 *   AWS_S3_BUCKET
 *
 * Optional:
 *   AWS_S3_PREFIX       Key prefix, e.g. "assets/" → keys become assets/backgrounds/...
 *   AWS_S3_ENDPOINT     Custom S3 API URL, e.g. https://eu-central-1.s3.enzonix.com
 *   AWS_S3_MANIFEST     Path to manifest JSON (default: scripts/public-s3-manifest.json)
 *
 * Flags:
 *   --dry-run           No uploads, no manifest write
 *   --force             Upload all files (ignore manifest hashes)
 *   --verbose           Log each skipped file
 *   --quiet             No per-file lines (only summary and errors)
 *   --assume-synced     Hash all files and write manifest only (no S3 uploads). Use once if the bucket
 *                       already matches public/ and you want incremental uploads from here on.
 *   --prefix <p>        Override AWS_S3_PREFIX for this run
 *
 * Usage (from formulaone/):
 *   bun run upload-background-carousel-thumbs-s3 -- --dry-run
 *   bun run upload-background-carousel-thumbs-s3
 *   AWS_S3_UPLOAD_CONCURRENCY=48 bun run upload-background-carousel-thumbs-s3
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const MANIFEST_VERSION = 1;
const DEFAULT_MANIFEST_PATH = path.join(__dirname, "public-s3-manifest-background-carousel-thumbs.json");
const DEFAULT_UPLOAD_LOG = path.join(__dirname, "public-s3-upload-background-carousel-thumbs.log");
const DEFAULT_UPLOAD_CONCURRENCY = 32;

function uploadConcurrency(parsed) {
  if (parsed.concurrency != null && !Number.isNaN(parsed.concurrency)) {
    return Math.max(1, Math.min(256, parsed.concurrency));
  }
  const env = parseInt(process.env.AWS_S3_UPLOAD_CONCURRENCY || "", 10);
  if (!Number.isNaN(env) && env > 0) return Math.max(1, Math.min(256, env));
  return DEFAULT_UPLOAD_CONCURRENCY;
}

function appendUploadLog(line) {
  const logPath = process.env.AWS_S3_UPLOAD_LOG?.trim() || DEFAULT_UPLOAD_LOG;
  try {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${line}\n`, "utf8");
  } catch (e) {
    console.warn("Could not write upload log:", e.message || e);
  }
}

/** Load formulaone/.env when running `node` directly (Bun loads .env automatically). */
function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadEnvFile();

function normalizeS3Endpoint(raw) {
  const s = raw?.trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s.replace(/\/$/, "");
  return `https://${s.replace(/\/$/, "")}`;
}

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SKIP_NAMES = new Set([".DS_Store", "Thumbs.db", ".gitkeep"]);

/** Relative path uses forward slashes. `backgrounds-thumbs/` carousel slots only. */
function isCarouselSlotFile(rel) {
  const n = rel.replace(/\\/g, "/");
  if (!n.startsWith("backgrounds-thumbs/")) return false;
  return /\/(1|2|3)\.(jpg|jpeg|webp)$/i.test(n);
}

function parseArgs(argv) {
  const out = {
    dryRun: false,
    force: false,
    verbose: false,
    quiet: false,
    assumeSynced: false,
    concurrency: null,
    prefix: process.env.AWS_S3_PREFIX || "",
    manifestPath: process.env.AWS_S3_MANIFEST?.trim() || DEFAULT_MANIFEST_PATH,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--dry-run") out.dryRun = true;
    else if (argv[i] === "--force") out.force = true;
    else if (argv[i] === "--verbose") out.verbose = true;
    else if (argv[i] === "--quiet") out.quiet = true;
    else if (argv[i] === "--assume-synced") out.assumeSynced = true;
    else if (argv[i] === "--concurrency" && argv[i + 1]) {
      out.concurrency = parseInt(argv[++i], 10);
    } else if (argv[i] === "--prefix" && argv[i + 1]) {
      out.prefix = argv[++i];
    } else if (argv[i] === "--manifest" && argv[i + 1]) {
      out.manifestPath = path.resolve(argv[++i]);
    }
  }
  let p = out.prefix.trim();
  if (p && !p.endsWith("/")) p += "/";
  out.prefix = p;
  return out;
}

function walkFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.error("Missing directory:", dir);
    process.exit(1);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(p, files);
    else if (!SKIP_NAMES.has(entry.name)) files.push(p);
  }
  return files;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".pdf": "application/pdf",
    ".xml": "application/xml",
    ".txt": "text/plain; charset=utf-8",
    ".webmanifest": "application/manifest+json",
  };
  return map[ext] || "application/octet-stream";
}

function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) break;
      results[i] = await fn(items[i], i);
    }
  }
  const n = Math.min(limit, Math.max(1, items.length));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

function readManifest(manifestPath) {
  try {
    const raw = fs.readFileSync(manifestPath, "utf8");
    const data = JSON.parse(raw);
    if (data.version !== MANIFEST_VERSION || typeof data.files !== "object" || data.files === null) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeManifestAtomic(manifestPath, payload) {
  const dir = path.dirname(manifestPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const tmp = `${manifestPath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2) + "\n", "utf8");
  fs.renameSync(tmp, manifestPath);
}

async function main() {
  const parsed = parseArgs(process.argv);
  const { dryRun, force, verbose, quiet, assumeSynced, prefix } = parsed;
  const manifestPath = path.resolve(parsed.manifestPath);
  const conc = uploadConcurrency(parsed);
  const logPath = path.resolve(process.env.AWS_S3_UPLOAD_LOG?.trim() || DEFAULT_UPLOAD_LOG);

  const bucket = process.env.AWS_S3_BUCKET?.trim();
  const region = process.env.AWS_REGION?.trim() || "eu-west-1";

  if (assumeSynced && dryRun) {
    console.error("Use either --assume-synced or --dry-run, not both.");
    process.exit(1);
  }
  if (assumeSynced && force) {
    console.error("Use either --assume-synced or --force, not both.");
    process.exit(1);
  }

  const allFiles = walkFiles(PUBLIC_DIR);
  const files = allFiles.filter((abs) => {
    const rel = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
    return isCarouselSlotFile(rel);
  });
  const publicLabel = path.relative(process.cwd(), PUBLIC_DIR) || "public";
  console.log(
    `Found ${files.length} carousel thumb file(s) (1/2/3 under backgrounds-thumbs/) of ${allFiles.length} total under ${publicLabel}`,
  );
  if (prefix) console.log(`Key prefix: "${prefix}"`);
  console.log(`Concurrency: ${conc}`);
  console.log(`Manifest: ${manifestPath}${dryRun ? " (not written in dry-run)" : ""}`);
  console.log(`Upload log: ${logPath}`);

  if (!dryRun && !assumeSynced && !bucket) {
    console.error("Set AWS_S3_BUCKET (or use --dry-run / --assume-synced).");
    process.exit(1);
  }

  if (!dryRun && !assumeSynced && !process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY) {
    console.warn(
      "No AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in env; using default credential chain (~/.aws/credentials, IAM role, etc.).",
    );
  }

  const endpoint = normalizeS3Endpoint(process.env.AWS_S3_ENDPOINT);

  if (assumeSynced) {
    const relTasks = files.map((abs) => {
      const rel = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
      return { abs, rel };
    });
    const hashes = await mapLimit(relTasks, conc, async ({ abs, rel }) => ({
      rel,
      sha256: await sha256File(abs),
    }));
    const payload = {
      version: MANIFEST_VERSION,
      updatedAt: new Date().toISOString(),
      bucket: bucket || "",
      prefix,
      endpoint: endpoint || "",
      region,
      files: {},
    };
    for (const row of hashes) {
      payload.files[row.rel] = {
        sha256: row.sha256,
        uploadedAt: new Date().toISOString(),
      };
    }
    writeManifestAtomic(manifestPath, payload);
    appendUploadLog(
      `assume-synced files=${hashes.length} manifest=${manifestPath}`,
    );
    console.log(
      `\nWrote manifest for ${hashes.length} file(s) (no uploads). Next run will upload only new/changed files.`,
    );
    return;
  }

  const client = new S3Client({
    region,
    ...(endpoint
      ? {
          endpoint,
          forcePathStyle: true,
        }
      : {}),
  });

  const prev = force ? null : readManifest(manifestPath);
  if (prev && (prev.prefix !== prefix || prev.bucket !== bucket)) {
    console.warn(
      "Manifest prefix/bucket differs from this run; ignoring stored hashes (use --force or delete manifest).",
    );
  }
  const effectivePrev =
    prev && !force && prev.prefix === prefix && prev.bucket === bucket ? prev : null;

  const tasks = files.map((abs) => {
    const rel = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
    const Key = prefix + rel;
    return { abs, rel, Key };
  });

  const hashes = await mapLimit(tasks, conc, async ({ abs }) => sha256File(abs));

  const withHash = tasks.map((t, i) => ({ ...t, sha256: hashes[i] }));

  let toUpload = [];
  let skipped = 0;
  for (const row of withHash) {
    const prevHash = effectivePrev?.files?.[row.rel]?.sha256;
    if (!force && prevHash === row.sha256) {
      skipped++;
      if (verbose && !quiet) console.log(`SKIP ${row.rel} (unchanged)`);
    } else {
      toUpload.push(row);
    }
  }

  console.log(
    `To upload: ${toUpload.length}, skip (unchanged): ${skipped}${force ? " (--force)" : ""}`,
  );

  let ok = 0;
  let fail = 0;
  const uploadedOk = new Set();

  await mapLimit(toUpload, conc, async ({ abs, rel, Key, sha256 }) => {
    const ContentType = contentType(abs);
    if (dryRun) {
      if (!quiet) {
        console.log(`[dry-run] ${rel}  →  s3://${bucket || "<bucket>"}/${Key}  (${ContentType})`);
      }
      ok++;
      return;
    }
    try {
      const Body = fs.readFileSync(abs);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key,
          Body,
          ContentType,
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );
      uploadedOk.add(rel);
      ok++;
      if (!quiet) console.log(`OK ${rel}`);
    } catch (e) {
      fail++;
      console.error(`FAIL ${rel}:`, e.message || e);
    }
  });

  if (dryRun) {
    console.log(`\nDone (dry-run). Would upload ${toUpload.length} file(s).`);
    appendUploadLog(
      `dry-run would_upload=${toUpload.length} skip=${skipped} manifest=${manifestPath}`,
    );
    return;
  }

  const payload = {
    version: MANIFEST_VERSION,
    updatedAt: new Date().toISOString(),
    bucket: bucket || "",
    prefix,
    endpoint: endpoint || "",
    region,
    files: {},
  };

  for (const row of withHash) {
    const prevEntry = effectivePrev?.files?.[row.rel];
    const neededUpload = toUpload.some((u) => u.rel === row.rel);

    if (!neededUpload) {
      payload.files[row.rel] = {
        sha256: row.sha256,
        uploadedAt: prevEntry?.uploadedAt || new Date().toISOString(),
      };
    } else if (uploadedOk.has(row.rel)) {
      payload.files[row.rel] = {
        sha256: row.sha256,
        uploadedAt: new Date().toISOString(),
      };
    } else if (prevEntry) {
      payload.files[row.rel] = { ...prevEntry };
    }
  }

  writeManifestAtomic(manifestPath, payload);
  appendUploadLog(
    `upload ok=${ok} fail=${fail} skipped=${skipped} manifest=${manifestPath}`,
  );

  if (fail > 0) {
    console.log(
      `\nDone. ${ok} uploaded, ${fail} failed — manifest saved (successful uploads recorded; retry failed files).`,
    );
    process.exit(1);
  }

  console.log(`\nDone. ${ok} uploaded, ${skipped} skipped (unchanged). Manifest saved.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
