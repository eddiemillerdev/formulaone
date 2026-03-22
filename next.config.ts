import type { NextConfig } from "next";

/**
 * Public API: use server-side proxy at `src/app/api/f1experiences/[[...path]]/route.ts`
 * (API_BASE_URL) so the browser stays same-origin — no CORS. Do not set NEXT_PUBLIC_API_BASE_URL
 * for production unless you also configure CORS on the API.
 */
function assetHostRemotePattern():
  | { protocol: "http" | "https"; hostname: string; pathname: string }
  | null {
  const raw = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return {
      protocol: u.protocol === "http:" ? "http" : "https",
      hostname: u.hostname,
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const extraPattern = assetHostRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.quintevents.com", pathname: "/**" },
      ...(extraPattern ? [extraPattern] : []),
    ],
  },
};

export default nextConfig;
