import type { NextConfig } from "next";

// Single env for all API endpoints: set API_BASE_URL in .env (e.g. https://f1experiences.co.uk/api/public)
const API_BASE_URL =
  process.env.API_BASE_URL || "https://f1experiences.co.uk/api/public";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.quintevents.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/f1experiences/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
