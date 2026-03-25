/**
 * Resolves paths under `public/` via `NEXT_PUBLIC_ASSET_BASE_URL` when set.
 * - Public CDN/S3 URL: `https://…` (bucket must allow anonymous GET).
 * - Private bucket: `/api/public-assets` — same-origin proxy (`src/app/api/public-assets`) uses server credentials.
 * Upload `public/` so keys match `/backgrounds/{raceId}/...`, `/images/...`, `/f1.mp4`.
 *
 * In **development**, when unset, returns root-relative paths (Next serves `public/` locally).
 * In **production**, when unset, defaults to `/api/public-assets` so deploys do not silently
 * request `/backgrounds/...` (those files are often not on the server — large assets live on S3).
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

function resolvedAssetBase(): string {
  const raw = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw.trim().replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "/api/public-assets";
  }
  return "";
}

export function publicAssetUrl(path: string): string {
  if (!path) return path;
  const t = path.trim();
  if (/^https?:\/\//i.test(t)) return t;

  const normalized = t.startsWith("/") ? t : `/${t}`;
  const base = resolvedAssetBase();

  const once = decodePathForEncoding(normalized);
  if (!base) return encodeURI(once);
  return encodeURI(`${base}${once}`);
}

/**
 * Root-relative URL only — always served from this app’s `public/` folder by Next.
 * Use for assets that are not uploaded to S3/CDN (e.g. `/2027/race-flags/...`).
 * Does not apply `NEXT_PUBLIC_ASSET_BASE_URL`.
 */
export function publicLocalPath(path: string): string {
  if (!path) return path;
  const t = path.trim();
  if (/^https?:\/\//i.test(t)) return t;
  const normalized = t.startsWith("/") ? t : `/${t}`;
  return encodeURI(decodePathForEncoding(normalized));
}
