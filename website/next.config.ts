import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  outputFileTracingIncludes: {
    "/*": ["./content/approved/**/*"],
  },
};

export default nextConfig;