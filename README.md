# 🚀 Payal Yadav — Personal Portfolio

A modern, full-stack personal portfolio website built with **Next.js 16**, **MongoDB**, and **Sanity CMS** — showcasing projects, skills, work experience, and a DSA (Data Structures & Algorithms) progress tracker, with a working contact form backed by a database.

🔗 **Live:** [itme-payal.vercel.app](https://itme-payal.vercel.app/)

---

## ✨ Features

- ⚡ **Next.js 16** (App Router) with React 19 for fast, SEO-friendly rendering
- 🎨 Modern, responsive UI — Tailwind CSS v4, Radix UI / shadcn, Framer Motion animations
- 🗄️ **MongoDB + Mongoose** for dynamic content:
  - Projects showcase
  - Skills with proficiency levels
  - Work experience timeline
  - DSA progress tracker (LeetCode / Striver / Codeforces / GFG)
  - Contact form enquiries
- 📝 **Sanity CMS** integration for content management
- 🔐 **JWT-based authentication** (`jsonwebtoken` + `jose`) with `bcryptjs` password hashing, protected via custom middleware
- 📊 GitHub contributions calendar (`react-github-calendar`)
- 📈 Data visualizations with Recharts
- 📋 Forms with `react-hook-form` + `zod` validation
- 📱 Fully responsive, accessible UI components (Radix UI primitives)
- 🚀 Deployed on **Vercel**

---

## 🛠️ Tech Stack

| Category           | Technology                                |
| ------------------ | ----------------------------------------- |
| Framework          | Next.js 16 (App Router)                   |
| Language           | TypeScript                                |
| UI Library         | React 19                                  |
| Styling            | Tailwind CSS v4, `tw-animate-css`         |
| Components         | Radix UI, shadcn, Base UI, `cmdk`, `vaul` |
| Animation          | Framer Motion                             |
| Database           | MongoDB with Mongoose                     |
| CMS                | Sanity (`next-sanity`)                    |
| Auth               | JWT (`jsonwebtoken`, `jose`) + `bcryptjs` |
| Forms & Validation | React Hook Form + Zod                     |
| Charts             | Recharts                                  |
| Icons              | Lucide React, Tabler Icons, React Icons   |
| Deployment         | Vercel                                    |
| Linting            | ESLint                                    |

---

## 📂 Project Structure

```
PORTFOLIO/
├── app/                  # Next.js app router pages & API routes
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, DB connection, auth helpers
├── models/                # Mongoose schemas
│   ├── User.ts           # Auth users (admin/user roles)
│   ├── Project.ts        # Portfolio projects
│   ├── Skill.ts          # Skills with category & proficiency level
│   ├── Experience.ts     # Work experience timeline
│   ├── DSA.ts            # DSA / coding progress tracker
│   └── Enquiry.ts        # Contact form submissions
├── public/               # Static assets (images, icons, etc.)
├── middleware.ts         # Route protection (JWT auth checks)
├── next.config.ts        # Next.js configuration
├── components.json       # shadcn/ui configuration
└── package.json          # Dependencies & scripts
```

---

## 🗄️ Data Models

| Model          | Purpose                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **User**       | Stores admin/user accounts with hashed passwords and roles                                      |
| **Project**    | Portfolio projects — title, description, tech stack, GitHub/live links, category, featured flag |
| **Skill**      | Skills with category (frontend/backend/database/devops/etc.), icon, proficiency level (1–100)   |
| **Experience** | Work experience — company, position, dates, responsibilities, tech used                         |
| **DSA**        | Tracks coding practice progress across LeetCode, Striver, Codeforces, GFG                       |
| **Enquiry**    | Stores contact form submissions with read/replied status                                        |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18 or higher
- A MongoDB connection string ([MongoDB Atlas](https://www.mongodb.com/atlas) or local)
- A Sanity project (if using the CMS features)

### 1. Clone the repository

```bash
git clone https://github.com/itmepayal/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Auth
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE_DATE=7d

# Sanity (if applicable)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

> ⚠️ **Never commit `.env.local` to version control.** Make sure it's listed in `.gitignore`.
>
> ⚠️ If your real credentials were ever exposed (committed, shared, or pasted anywhere), rotate your MongoDB password and regenerate your `JWT_SECRET` immediately.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 🚀 Deployment

This project is deployed on **Vercel**.

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add the environment variables listed above in **Project Settings → Environment Variables**
4. Deploy 🎉

Live at: **[itme-payal.vercel.app](https://itme-payal.vercel.app/)**

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are always welcome — feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Payal Yadav**

- Portfolio: [itme-payal.vercel.app](https://itme-payal.vercel.app/)
- GitHub: [@itmepayal](https://github.com/itmepayal)

---

⭐️ If you like this project, consider giving it a star on GitHub!
