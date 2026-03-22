/**
 * Resolves paths under `public/` when `NEXT_PUBLIC_ASSET_BASE_URL` is set.
 * - Public CDN/S3 URL: `https://…` (bucket must allow anonymous GET).
 * - Private bucket: `/api/public-assets` — same-origin proxy (`src/app/api/public-assets`) uses server credentials.
 * Upload `public/` so keys match `/backgrounds/...`, `/images/...`, `/f1.mp4`.
 *
 * When unset, returns the same root-relative path (Next serves `public/` locally).
 */
/** Decode percent-encoding repeatedly so we never double-encode (%20 → %2520). */
function decodePathForEncoding(path: string): string {
  let s = path;
  for (let i = 0; i < 4; i++) {
    try {
      const next = decodeURI(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  return s;
}

export function publicAssetUrl(path: string): string {
  if (!path) return path;
  const t = path.trim();
  if (/^https?:\/\//i.test(t)) return t;

  const normalized = t.startsWith("/") ? t : `/${t}`;
  const base =
    typeof process.env.NEXT_PUBLIC_ASSET_BASE_URL === "string"
      ? process.env.NEXT_PUBLIC_ASSET_BASE_URL.trim().replace(/\/$/, "")
      : "";

  const once = decodePathForEncoding(normalized);
  if (!base) return encodeURI(once);
  return encodeURI(`${base}${once}`);
}
