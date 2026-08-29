/**
 * GoDaddy Node.js Hosting requires a root `main` entry file.
 * Production start uses `npm start` -> `next start` (reads process.env.PORT).
 */
const port = process.env.PORT || "3000";

process.env.PORT = port;
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

require("next/dist/bin/next");
