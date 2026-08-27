/**
 * Next.js Turbopack sometimes resolves modules from the parent folder
 * (Portfolio/) instead of PORTFOLIO/. Link critical CSS packages there.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const parentRoot = path.resolve(projectRoot, "..");
const parentNodeModules = path.join(parentRoot, "node_modules");
const projectNodeModules = path.join(projectRoot, "node_modules");

const packagesToLink = ["tailwindcss", "@tailwindcss", "tw-animate-css"];

if (!fs.existsSync(projectNodeModules)) {
  console.warn("link-parent-modules: project node_modules missing, run npm install");
  process.exit(0);
}

if (!fs.existsSync(parentNodeModules)) {
  fs.mkdirSync(parentNodeModules, { recursive: true });
}

for (const pkg of packagesToLink) {
  const source = path.join(projectNodeModules, pkg);
  const target = path.join(parentNodeModules, pkg);

  if (!fs.existsSync(source)) continue;

  if (fs.existsSync(target)) {
    continue;
  }

  const type = fs.lstatSync(source).isDirectory() ? "dir" : "file";
  fs.symlinkSync(source, target, type);
  console.log(`Linked ${pkg} -> parent node_modules`);
}
