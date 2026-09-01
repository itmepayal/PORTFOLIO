/**
 * Step-by-step guide for Google Search Console + Safe Browsing review.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://itspayal.in";
const domain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

console.log(`
Google Search Console + Safe Browsing setup for ${siteUrl}
${"=".repeat(60)}

PART 1 — Fix Vercel domain redirect (do this first)
---------------------------------------------------
1. Open https://vercel.com/dashboard
2. Select your portfolio project
3. Go to Settings → Domains
4. For itspayal.in:
   - Click the three dots (⋯) → Set as Primary Domain
5. For www.itspayal.in:
   - Click the three dots (⋯) → Redirect to itspayal.in
6. Deploy → Redeploy latest production build
7. Verify: npm run verify:domain

Expected result:
  itspayal.in      → serves the site (200)
  www.itspayal.in  → redirects to itspayal.in (301/308)


PART 2 — Add property in Google Search Console
----------------------------------------------
1. Open https://search.google.com/search-console
2. Click "Add property"
3. Choose "URL prefix" and enter: ${siteUrl}
4. Pick ONE verification method:


OPTION A — DNS TXT (recommended, no redeploy needed)
----------------------------------------------------
1. Search Console shows a TXT record like:
   google-site-verification=XXXXXXXXXXXXXXXX
2. Go to GoDaddy → My Products → itspayal.in → DNS
3. Add record:
   Type:  TXT
   Name:  @
   Value: google-site-verification=XXXXXXXXXXXXXXXX
   TTL:   1 Hour (or default)
4. Save, wait 5–30 minutes, click Verify in Search Console


OPTION B — HTML meta tag (requires Vercel env + redeploy)
---------------------------------------------------------
1. Search Console shows a meta tag content value (letters/numbers only)
2. In Vercel → Settings → Environment Variables → Production, add:
   GOOGLE_SITE_VERIFICATION=your-content-value-here
3. Redeploy production
4. Verify the tag is live:
   curl -s ${siteUrl} | grep google-site-verification
5. Click Verify in Search Console


PART 3 — Submit sitemap
-----------------------
1. In Search Console → Sitemaps
2. Enter: sitemap.xml
3. Submit
4. Full URL: ${siteUrl}/sitemap.xml


PART 4 — Request Safe Browsing review (fix Chrome "Dangerous site")
-------------------------------------------------------------------
1. In Search Console → Security & Manual Actions → Security issues
2. If issues are listed, fix them first
3. Click "Request Review"
4. Explain: "This is my personal backend engineer portfolio deployed on Vercel.
   No malware or phishing. Domain was recently connected."
5. Wait 2–7 days for Google to clear the flag

Also check:
  https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(siteUrl)}


PART 5 — Post-setup checks
--------------------------
npm run verify:domain
npm run verify:seo
curl -I ${siteUrl}
curl -I ${siteUrl}/sitemap.xml
curl -I ${siteUrl}/robots.txt

Rich results test:
  https://search.google.com/test/rich-results?url=${encodeURIComponent(siteUrl)}
`);
