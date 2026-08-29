/**
 * Validates package.json against GoDaddy Node.js Hosting deploy contract.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const errors = [];
const warnings = [];

const buildDeps = [
  "next",
  "tailwindcss",
  "@tailwindcss/postcss",
  "typescript",
];

if (!pkg.name || !pkg.version) {
  errors.push("package.json must have name and version.");
}

if (!pkg.main) {
  errors.push('package.json must have "main" field.');
} else {
  const mainPath = path.join(root, pkg.main);
  if (!fs.existsSync(mainPath)) {
    errors.push(`main file not found: ${pkg.main}`);
  }
}

if (!pkg.scripts?.build?.trim()) {
  errors.push('scripts.build is required.');
}

if (!pkg.scripts?.start?.trim()) {
  errors.push('scripts.start is required.');
}

for (const dep of buildDeps) {
  if (!pkg.dependencies?.[dep]) {
    errors.push(
      `"${dep}" must be in dependencies (GoDaddy production install skips devDependencies).`,
    );
  }
}

if (!fs.existsSync(path.join(root, "package-lock.json"))) {
  warnings.push("package-lock.json missing — include it for reproducible GoDaddy builds.");
}

console.log("GoDaddy Node.js Hosting readiness check\n");
console.log("Target domain: https://itspayal.in");
console.log("Recommended path: GoDaddy Node.js Hosting (ZIP or GitHub Connect)\n");

if (errors.length === 0) {
  console.log("PASS — package.json meets GoDaddy build requirements.\n");
} else {
  console.log("FAIL — fix these before deploying:\n");
  errors.forEach((e) => console.log(`  ✗ ${e}`));
  console.log("");
}

if (warnings.length > 0) {
  console.log("Warnings:\n");
  warnings.forEach((w) => console.log(`  ! ${w}`));
  console.log("");
}

console.log("Manual steps (GoDaddy dashboard):");
console.log("  1. My Products → Node.js Hosting (or Web Hosting + Setup Node.js App)");
console.log("  2. Connect GitHub repo OR upload dist/godaddy-deploy.zip");
console.log("  3. Set environment variables (see .env.example)");
console.log("  4. Publish → Connect domain itspayal.in\n");

console.log("MongoDB Atlas (required):");
console.log("  1. https://www.mongodb.com/atlas → free cluster");
console.log("  2. Database user + Network Access 0.0.0.0/0");
console.log("  3. Copy MONGODB_URI into GoDaddy env vars\n");

process.exit(errors.length > 0 ? 1 : 0);
