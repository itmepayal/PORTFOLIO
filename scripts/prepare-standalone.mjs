/**
 * Copies static assets into Next.js standalone output for production hosting
 * (GoDaddy Node.js, VPS, etc.). Run after `npm run build`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = path.join(rootDir, ".next/standalone");
const staticSrc = path.join(rootDir, ".next/static");
const staticDest = path.join(standaloneDir, ".next/static");
const publicSrc = path.join(rootDir, "public");
const publicDest = path.join(standaloneDir, "public");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`prepare-standalone: missing ${src}`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(standaloneDir)) {
  console.error(
    "prepare-standalone: .next/standalone not found. Run npm run build first.",
  );
  process.exit(1);
}

copyRecursive(staticSrc, staticDest);
copyRecursive(publicSrc, publicDest);

console.log("prepare-standalone: static + public copied to standalone bundle.");
