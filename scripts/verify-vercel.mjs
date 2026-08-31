/**
 * Vercel + GoDaddy domain deployment checklist for itspayal.in
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const requiredFiles = [
  "vercel.json",
  "lib/site.ts",
  "lib/seo.ts",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/manifest.ts",
  "app/opengraph-image.tsx",
];

const vercelEnvVars = [
  "NEXT_PUBLIC_SITE_URL=https://itspayal.in",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRE_DATE=7d",
];

console.log("Vercel + GoDaddy (itspayal.in) deployment check\n");

let ok = true;

for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(root, file));
  console.log(`${exists ? "✓" : "✗"} ${file}`);
  if (!exists) ok = false;
}

const pkg = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);

if (pkg.scripts?.build?.includes("next build")) {
  console.log("✓ package.json build script");
} else {
  console.log("✗ package.json missing next build script");
  ok = false;
}

console.log("\nSet in Vercel → Project → Settings → Environment Variables (Production):");
vercelEnvVars.forEach((v) => console.log(`  ${v}`));

console.log("\nGoDaddy DNS (domain itspayal.in pointed to Vercel):");
console.log("  A     @    →  76.76.21.21");
console.log("  CNAME www  →  cname.vercel-dns.com");
console.log("  (Or use Vercel nameservers if domain transferred)");

console.log("\nVercel → Project → Settings → Domains:");
console.log("  Add: itspayal.in");
console.log("  Add: www.itspayal.in (redirects to apex via vercel.json)");

console.log("\nAfter deploy, verify:");
console.log("  https://itspayal.in");
console.log("  https://itspayal.in/sitemap.xml");
console.log("  https://itspayal.in/robots.txt");

process.exit(ok ? 0 : 1);
