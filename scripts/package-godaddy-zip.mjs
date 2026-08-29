/**
 * Creates dist/godaddy-deploy.zip for GoDaddy Node.js Hosting upload.
 * Excludes node_modules, .next, .git, and local env files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const zipPath = path.join(distDir, "godaddy-deploy.zip");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// zip from project root; exclude heavy/generated folders
execSync(
  [
    "zip",
    "-r",
    zipPath,
    ".",
    "-x",
    "node_modules/*",
    "-x",
    "node_modules/**/*",
    "-x",
    ".next/*",
    "-x",
    ".next/**/*",
    "-x",
    ".git/*",
    "-x",
    ".git/**/*",
    "-x",
    "dist/*",
    "-x",
    "dist/**/*",
    "-x",
    "*.log",
    "-x",
    ".env",
    "-x",
    ".env.local",
    "-x",
    ".env.*",
  ].join(" "),
  { cwd: root, stdio: "inherit" },
);

const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(2);
console.log(`\nCreated ${zipPath} (${sizeMb} MB)`);
console.log("Upload this ZIP in GoDaddy → Node.js Hosting → Upload ZIP");
console.log("Do NOT include node_modules — GoDaddy installs dependencies automatically.");
