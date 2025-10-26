// @ts-ignore - Using experimental features
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler
  reactCompiler: true,
  
  experimental: {
    // @ts-ignore - Experimental Turbopack configuration
    turbopackFileSystemCacheForDev: true,
  },
  
  // Cache components
  cacheComponents: true,
};

export default nextConfig;
