# Payal Yadav — Backend Engineer Portfolio

A production-ready full-stack portfolio built with **Next.js 16**, **MongoDB**, and a **custom CMS dashboard**. It showcases projects, work experience, skills, DSA progress, GitHub activity, and a live contact form — with full SEO, JWT-protected admin routes, and GoDaddy-ready deployment.

**Live:** [https://itspayal.in](https://itspayal.in)  
**Repository:** [github.com/itmepayal/PORTFOLIO](https://github.com/itmepayal/PORTFOLIO)

---

## Overview

| Area | Description |
|------|-------------|
| Public site | Hero, projects, experience, GitHub stats, skills, contact form |
| Admin CMS | Dashboard to manage projects, skills, experience, DSA, and enquiries |
| API layer | Next.js App Router API routes with MongoDB + Mongoose |
| SEO | Metadata, JSON-LD, sitemap, robots, Open Graph, favicons |
| Auth | JWT sessions with middleware-protected dashboard routes |

---

## Features

### Public portfolio
- Responsive, sharp/grid UI with light/dark theme
- Dynamic stats (projects, skills, experience, problems solved)
- Project detail pages with tech stack, features, and links
- Experience timeline with tab and list views
- GitHub contribution heatmap
- Skills grid with category filters and proficiency indicators
- Contact form with enquiry storage in MongoDB

### Custom CMS dashboard
- CRUD for **Projects**, **Skills**, **Experience**, **DSA**, and **Enquiries**
- Live preview panels on create/edit forms
- Pagination, filters, and dashboard stats
- Publish/draft control for projects (`isPublished`)
- Enquiry read/reply tracking

### Backend & integrations
- **MongoDB Atlas** for all content
- **JWT authentication** (`jose` + `bcryptjs`) with route middleware
- **LeetCode auto-sync** — background sync on stats fetch + manual “Sync now” in dashboard
- Public APIs filter unpublished projects for unauthenticated users
- Write APIs (PUT/DELETE) require authenticated session

### SEO & production
- Root metadata, Open Graph, Twitter cards, canonical URLs
- Dynamic `sitemap.xml` and `robots.txt`
- JSON-LD: Person, WebSite, ProfessionalService, CreativeWork, EmployeeRole
- PWA manifest, OG image (1200×630), SVG + PNG favicons
- Dashboard and auth routes set to `noindex`

---

## Tech stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, Radix UI / shadcn |
| Animation | Framer Motion |
| Database | MongoDB + Mongoose |
| Auth | JWT (`jose`, `jsonwebtoken`) + `bcryptjs` |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide, Tabler Icons, React Icons |
| Deployment | GoDaddy Node.js Hosting (standalone build supported) |

---

## Project structure

```
PORTFOLIO/
├── app/                    # Pages, layouts, API routes, SEO routes
│   ├── api/                # REST API (projects, skills, experience, dsa, enquiries, auth)
│   ├── dashboard/          # CMS admin pages
│   ├── auth/               # Login & register
│   ├── projects/[id]/      # Public project detail
│   ├── experiences/[id]/   # Public experience detail
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── sections/           # Home, Projects, Experience, Skills, Contact, etc.
│   ├── dashboard/          # CMS UI (forms, cards, previews)
│   ├── pages/              # Detail page components
│   └── seo/                # JSON-LD helper
├── lib/
│   ├── seo.ts              # Metadata & schema builders
│   ├── site.ts             # Site constants (name, email, keywords)
│   ├── api/                # CRUD handlers & auth helpers
│   └── sync-leetcode-dsa.ts
├── models/                 # Mongoose schemas
├── hooks/                  # Form & sync hooks
├── scripts/                # Deploy, seed, verify utilities
├── public/                 # Static assets (favicon, pdf, logos)
├── middleware.ts           # JWT route protection
├── next.config.ts          # Standalone output, image domains
└── server.js               # GoDaddy entry shim (uses npm start → next start)
```

---

## Data models

| Model | Purpose |
|-------|---------|
| **User** | Admin accounts with hashed passwords and roles |
| **Project** | Title, description, tech, features, links, category, publish status |
| **Skill** | Category, icon, proficiency level (1–100), display order |
| **Experience** | Company, role, dates, responsibilities, technologies |
| **DSA** | Coding progress (LeetCode, Striver, Codeforces, GFG) |
| **Enquiry** | Contact form submissions with read/replied status |

---

## Getting started

### Prerequisites

- **Node.js** 18.17 or higher
- **MongoDB Atlas** cluster (or local MongoDB)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/itmepayal/PORTFOLIO.git
cd PORTFOLIO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio
JWT_SECRET=your-long-random-secret-min-32-chars
JWT_EXPIRE_DATE=7d

# Optional — LeetCode sync
LEETCODE_USERNAME=your-leetcode-username
LEETCODE_PROGRESS_GOAL=500
```

> Never commit `.env.local`. Rotate `JWT_SECRET` and MongoDB credentials if they were ever exposed.

### 4. (Optional) Seed demo data

```bash
npm run seed:demo
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Dashboard: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (webpack) |
| `npm run build` | Production build |
| `npm run build:prod` | Build + prepare standalone bundle |
| `npm run start` | Start production server (`next start`) |
| `npm run start:prod` | Start standalone server |
| `npm run lint` | Run ESLint |
| `npm run seed:demo` | Seed sample projects & experience |
| `npm run verify:godaddy` | Check GoDaddy deploy readiness |
| `npm run verify:seo` | List SEO files and post-deploy URLs |
| `npm run package:godaddy` | Create `dist/godaddy-deploy.zip` |

---

## Production build

```bash
npm run build
npm run start
```

For standalone output (VPS / manual hosting):

```bash
npm run build:prod
npm run start:prod
```

---

## Deploy to GoDaddy (itspayal.in)

This app is **not static** — it requires **Node.js hosting** (API routes + MongoDB).

### Option A — GoDaddy Node.js Hosting (recommended)

1. Go to **GoDaddy → My Products → Node.js Hosting**
2. **Connect GitHub** repo `itmepayal/PORTFOLIO` **or** upload ZIP:
   ```bash
   npm run package:godaddy
   ```
   Upload `dist/godaddy-deploy.zip` (do **not** include `node_modules`)
3. Set environment variables in the hosting panel:

   | Variable | Production value |
   |----------|------------------|
   | `NEXT_PUBLIC_SITE_URL` | `https://itspayal.in` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Long random secret (32+ chars) |
   | `JWT_EXPIRE_DATE` | `7d` |
   | `LEETCODE_USERNAME` | Optional |
   | `LEETCODE_PROGRESS_GOAL` | Optional |

4. Deploy → **Publish** → **Connect domain** `itspayal.in`
5. Verify readiness before upload:
   ```bash
   npm run verify:godaddy
   ```

### Option B — cPanel (Web Hosting)

1. Build locally: `npm run build:prod`
2. Upload project via File Manager
3. cPanel → **Setup Node.js App** → Node 18+, startup `server.js`
4. Set env vars → Run NPM Install → Start App

### MongoDB Atlas setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Network Access → allow `0.0.0.0/0` (or your server IP)
4. Copy connection string into `MONGODB_URI`
5. Test locally:
   ```bash
   node --env-file=.env.local scripts/test-mongodb-connection.mjs
   ```

### Post-deploy checks

```bash
npm run verify:seo
```

Then open in browser:

- `https://itspayal.in`
- `https://itspayal.in/sitemap.xml`
- `https://itspayal.in/robots.txt`
- `https://itspayal.in/api/public/stats`

Submit sitemap in [Google Search Console](https://search.google.com/search-console).

---

## SEO

| Asset | Path |
|-------|------|
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
| Manifest | `/manifest.webmanifest` |
| Open Graph image | `/opengraph-image` |
| Favicon | `/favicon.svg`, `/icon`, `/apple-icon` |

SEO config lives in `lib/seo.ts` and `lib/site.ts`. Production canonical URLs require:

```env
NEXT_PUBLIC_SITE_URL=https://itspayal.in
```

---

## Security notes

- Dashboard and write APIs require JWT authentication
- Unpublished projects are hidden from public API and detail pages
- `/dashboard`, `/auth`, and `/api` are disallowed in `robots.txt`
- Use a strong `JWT_SECRET` in production
- Keep MongoDB credentials only in environment variables

---

## Resume

Place your PDF at:

```
public/pdf/PAYAL_YADAV.pdf
```

Or set an external URL:

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

## License

Personal portfolio project. All rights reserved unless otherwise noted.
