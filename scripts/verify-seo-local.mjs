/**
 * Verifies SEO-related files exist and prints post-deploy URLs for itspayal.in.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://itspayal.in";

const requiredFiles = [
  "lib/seo.ts",
  "lib/site.ts",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/manifest.ts",
  "app/opengraph-image.tsx",
  "app/icon.tsx",
  "app/apple-icon.tsx",
  "public/favicon.svg",
  "components/seo/JsonLd.tsx",
];

let missing = 0;

console.log("SEO file check\n");

for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(root, file));
  console.log(`${exists ? "✓" : "✗"} ${file}`);
  if (!exists) missing++;
}

console.log("\nAfter deploy, verify these URLs:");
const paths = [
  "/",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/opengraph-image",
  "/api/public/stats",
];

for (const p of paths) {
  console.log(`  ${siteUrl}${p}`);
}

console.log("\nGoogle Search Console:");
console.log(`  1. Run: npm run setup:search-console`);
console.log(`  2. Add property: ${siteUrl}`);
console.log(`  3. Verify via DNS TXT (GoDaddy) or GOOGLE_SITE_VERIFICATION env var`);
console.log(`  4. Submit sitemap: ${siteUrl}/sitemap.xml`);
console.log("  5. Request Safe Browsing review if Chrome shows 'Dangerous site'");
console.log("  6. Test rich results: https://search.google.com/test/rich-results\n");

process.exit(missing > 0 ? 1 : 0);
