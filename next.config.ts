// @ts-ignore - Using experimental features
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache components
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Enable React Compiler
  reactCompiler: true,

  experimental: {
    // @ts-ignore - Experimental Turbopack configuration
    turbopackFileSystemCacheForDev: true,
  },

  // PostHog rewrites
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
