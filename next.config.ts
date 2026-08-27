import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const tailwindPath = path.join(rootDir, "node_modules/tailwindcss");
const tailwindPostcssPath = path.join(
  rootDir,
  "node_modules/@tailwindcss/postcss",
);

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
    resolveAlias: {
      tailwindcss: tailwindPath,
      "@tailwindcss/postcss": tailwindPostcssPath,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.laneway.in" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "res-console.cloudinary.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "www.vectorlogo.zone" },
      { protocol: "https", hostname: "assets.leetcode.com" },
    ],
  },
};

export default nextConfig;
