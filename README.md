# Payal Yadav — Backend Engineer Portfolio

Production portfolio for **Payal Yadav** — Backend Engineer. Built with **Next.js 16**, **MongoDB**, and a custom CMS dashboard. Deployed on **Vercel** with custom domain **itspayal.in** (GoDaddy DNS).

| | |
|---|---|
| **Live site** | [https://itspayal.in](https://itspayal.in) |
| **GitHub** | [github.com/itmepayal/PORTFOLIO](https://github.com/itmepayal/PORTFOLIO) |
| **Hosting** | Vercel |
| **Domain** | GoDaddy → `itspayal.in` |

---

## What this project does

- **Public portfolio** — projects, experience, skills, GitHub activity, DSA stats, contact form
- **Admin CMS** — JWT-protected dashboard to manage all content
- **REST API** — Next.js App Router API routes + MongoDB
- **SEO** — metadata, JSON-LD, sitemap, robots, Open Graph, favicons
- **LeetCode sync** — auto-update DSA progress from LeetCode profile

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, shadcn / Radix UI |
| Animation | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (`jose`) + bcrypt |
| Forms | React Hook Form + Zod |
| Hosting | **Vercel** |
| Domain | **GoDaddy** (`itspayal.in`) |

---

## Project structure

```
PORTFOLIO/
├── app/
│   ├── api/              # REST API routes
│   ├── dashboard/        # CMS admin panel
│   ├── auth/             # Login & register
│   ├── projects/[id]/    # Project detail + SEO
│   ├── experiences/[id]/ # Experience detail + SEO
│   ├── sitemap.ts        # Dynamic sitemap.xml
│   ├── robots.ts         # robots.txt
│   ├── manifest.ts       # PWA manifest
│   ├── opengraph-image.tsx
│   ├── icon.tsx / apple-icon.tsx
│   └── layout.tsx        # Root metadata + JSON-LD
├── components/
│   ├── sections/         # Home, Projects, Skills, Contact…
│   ├── dashboard/        # CMS forms, cards, previews
│   └── seo/              # JsonLd component
├── lib/
│   ├── site.ts           # Site constants + getSiteUrl()
│   ├── seo.ts            # Metadata & schema builders
│   └── api/              # CRUD handlers, auth
├── models/               # Mongoose schemas
├── middleware.ts         # JWT route protection
├── vercel.json           # www redirect, security headers
└── next.config.ts        # Image domains, Vercel optimization
```

---

## Local development

### Prerequisites

- Node.js 18.17+
- MongoDB Atlas cluster (or local MongoDB)

### Setup

```bash
git clone https://github.com/itmepayal/PORTFOLIO.git
cd PORTFOLIO
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio
JWT_SECRET=your-local-dev-secret-min-32-chars
JWT_EXPIRE_DATE=7d
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)  
Dashboard: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

Optional demo data:

```bash
npm run seed:demo
```

---

## Deploy: Vercel + GoDaddy domain

This project is designed for **Vercel hosting** with **GoDaddy domain DNS** pointing to Vercel.

### Architecture

```
User → itspayal.in (GoDaddy DNS) → Vercel Edge → Next.js App → MongoDB Atlas
```

### Step 1 — Deploy on Vercel

1. Push code to GitHub: `github.com/itmepayal/PORTFOLIO`
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (set in `vercel.json`)
5. Deploy

### Step 2 — Environment variables (Vercel)

**Vercel → Project → Settings → Environment Variables → Production:**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://itspayal.in` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret (32+ chars) |
| `JWT_EXPIRE_DATE` | `7d` |
| `LEETCODE_USERNAME` | Optional |
| `LEETCODE_PROGRESS_GOAL` | `500` (optional) |
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML tag token (optional) |

Redeploy after adding env vars.

### Step 3 — Connect GoDaddy domain

**In Vercel → Project → Settings → Domains:**

1. Add `itspayal.in` and set it as **Primary domain**
2. Add `www.itspayal.in` and set it to **Redirect to** `itspayal.in`
3. Redeploy production after changing domain settings

> If `itspayal.in` redirects to `www` instead, fix this in Vercel Domains (not just `vercel.json`). Run `npm run verify:domain` to confirm.

**In GoDaddy → DNS for itspayal.in:**

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Or use Vercel nameservers if GoDaddy allows transfer.

DNS propagation: 15 minutes – 48 hours.

### Step 4 — Verify deployment

```bash
npm run verify:vercel
npm run verify:domain
npm run verify:seo
```

Live checks:

- [https://itspayal.in](https://itspayal.in)
- [https://itspayal.in/sitemap.xml](https://itspayal.in/sitemap.xml)
- [https://itspayal.in/robots.txt](https://itspayal.in/robots.txt)
- [https://itspayal.in/api/public/stats](https://itspayal.in/api/public/stats)

---

## SEO

| Feature | Implementation |
|---------|----------------|
| Page titles & descriptions | `lib/seo.ts` → `buildRootMetadata()` |
| Canonical URLs | `https://itspayal.in` via `NEXT_PUBLIC_SITE_URL` |
| Open Graph + Twitter cards | Root + per-page metadata |
| JSON-LD structured data | Person, WebSite, ProfessionalService, CreativeWork |
| Dynamic sitemap | `/sitemap.xml` — homepage + projects + experiences |
| robots.txt | Blocks `/dashboard`, `/auth`, `/api` |
| Favicons | SVG + PNG + Apple touch icon |
| OG image | `/opengraph-image` (1200×630) |
| www redirect | `www.itspayal.in` → `itspayal.in` (`vercel.json` + `next.config.ts`) |
| Search Console verification | `GOOGLE_SITE_VERIFICATION` env var in `lib/seo.ts` |

### Google Search Console

Run the full setup guide:

```bash
npm run setup:search-console
```

1. Add property: `https://itspayal.in`
2. Verify via **DNS TXT** (GoDaddy, recommended) or `GOOGLE_SITE_VERIFICATION` env var
3. Submit sitemap: `https://itspayal.in/sitemap.xml`
4. If Chrome shows **Dangerous site**, go to **Security & Manual Actions** → request a review
5. Test: [Google Rich Results](https://search.google.com/test/rich-results)

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run seed:demo` | Seed sample data |
| `npm run verify:vercel` | Vercel + GoDaddy deploy checklist |
| `npm run verify:domain` | Check www ↔ apex redirect chain |
| `npm run setup:search-console` | Search Console + Safe Browsing guide |
| `npm run verify:seo` | SEO files + post-deploy URLs |

---

## MongoDB Atlas setup

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Database Access** → create user
3. **Network Access** → allow `0.0.0.0/0` (required for Vercel serverless)
4. **Connect** → copy connection string → set as `MONGODB_URI` in Vercel

Test connection locally:

```bash
node --env-file=.env.local scripts/test-mongodb-connection.mjs
```

---

## Security

- JWT middleware protects `/dashboard` routes
- API write operations require authentication
- Unpublished projects hidden from public users
- `/dashboard`, `/auth`, `/api` excluded from search indexing
- Security headers via `vercel.json`

---

## Resume

Add PDF at `public/pdf/PAYAL_YADAV.pdf` or set:

```env
NEXT_PUBLIC_RESUME_URL=https://itspayal.in/pdf/PAYAL_YADAV.pdf
```

---

## Contact

**Payal Yadav** — Backend Engineer

- Website: [itspayal.in](https://itspayal.in)
- Email: [itme.payalyadav@gmail.com](mailto:itme.payalyadav@gmail.com)
- GitHub: [@itmepayal](https://github.com/itmepayal)
- LinkedIn: [payal-yadav-dev](https://www.linkedin.com/in/payal-yadav-dev)

---

Personal portfolio project. All rights reserved.
