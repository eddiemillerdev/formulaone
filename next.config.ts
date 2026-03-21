import type { NextConfig } from "next";

/**
 * Public API: use server-side proxy at `src/app/api/f1experiences/[[...path]]/route.ts`
 * (API_BASE_URL) so the browser stays same-origin — no CORS. Do not set NEXT_PUBLIC_API_BASE_URL
 * for production unless you also configure CORS on the API.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.quintevents.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
