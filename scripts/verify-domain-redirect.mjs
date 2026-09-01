/**
 * Checks itspayal.in redirect chain and reports www ↔ apex issues.
 */
const apex = "https://itspayal.in";
const www = "https://www.itspayal.in";

async function followRedirects(startUrl, maxHops = 8) {
  const chain = [];
  let url = startUrl;

  for (let hop = 0; hop < maxHops; hop++) {
    const response = await fetch(url, { redirect: "manual" });
    const location = response.headers.get("location");
    chain.push({
      url,
      status: response.status,
      location: location ?? null,
    });

    if (!location || response.status < 300 || response.status >= 400) {
      return chain;
    }

    url = new URL(location, url).toString();
  }

  chain.push({ url, status: "LOOP", location: "too many redirects" });
  return chain;
}

function printChain(label, chain) {
  console.log(`\n${label}`);
  for (const hop of chain) {
    const arrow = hop.location ? ` → ${hop.location}` : "";
    console.log(`  ${hop.status}  ${hop.url}${arrow}`);
  }
}

function hasLoop(chain) {
  const urls = chain.map((hop) => hop.url);
  return new Set(urls).size !== urls.length || chain.some((hop) => hop.status === "LOOP");
}

async function main() {
  console.log("Domain redirect check for itspayal.in\n");

  const apexChain = await followRedirects(apex);
  const wwwChain = await followRedirects(www);

  printChain("Apex (itspayal.in):", apexChain);
  printChain("WWW (www.itspayal.in):", wwwChain);

  const apexFinal = apexChain.at(-1);
  const wwwFinal = wwwChain.at(-1);
  const apexOk =
    apexFinal?.status === 200 && apexFinal.url.startsWith(apex);
  const wwwOk =
    wwwFinal?.status === 301 ||
    wwwFinal?.status === 308 ||
    (wwwFinal?.status === 200 && wwwFinal.url.startsWith(apex));
  const loop = hasLoop(apexChain) || hasLoop(wwwChain);

  console.log("\nExpected:");
  console.log("  itspayal.in        → 200 (serves site)");
  console.log("  www.itspayal.in    → 301/308 → itspayal.in");

  if (loop) {
    console.log("\n✗ Redirect loop detected. Fix Vercel domain settings before redeploying.");
    process.exit(1);
  }

  if (apexOk && wwwOk) {
    console.log("\n✓ Redirects look correct.");
    process.exit(0);
  }

  console.log("\n✗ Redirect mismatch detected.");
  console.log("\nFix in Vercel → Project → Settings → Domains:");
  console.log("  1. Set itspayal.in as Primary domain");
  console.log("  2. Set www.itspayal.in to Redirect to itspayal.in");
  console.log("  3. Redeploy production");
  console.log("\nThen run: npm run verify:domain");
  process.exit(1);
}

main().catch((error) => {
  console.error("Failed to check redirects:", error.message);
  process.exit(1);
});
