/**
 * Seeds sample projects and experiences for local portfolio preview.
 * Run: npm run seed:demo
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing. Add it to .env.local");
  process.exit(1);
}

const techIcons = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  tailwind:
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
};

const demoProjects = [
  {
    title: "Portfolio CMS",
    description:
      "A full-stack portfolio with a custom admin dashboard to manage projects, skills, experience, and DSA progress. Built with Next.js App Router, MongoDB, and JWT authentication.",
    tech: [
      { name: "Next.js", icon: techIcons.nextjs },
      { name: "React", icon: techIcons.react },
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "MongoDB", icon: techIcons.mongodb },
    ],
    features: [
      "Custom CMS dashboard",
      "JWT-secured APIs",
      "LeetCode auto-sync",
      "Responsive public site",
    ],
    github: "https://github.com/itmepayal/PORTFOLIO",
    live: "https://portfolio-payal.vercel.app",
    category: "fullstack",
    workType: "self",
    company: "",
    featured: true,
    isPublished: true,
  },
  {
    title: "E-Commerce API",
    description:
      "RESTful backend for an online store with product catalog, cart workflows, and order management. Includes pagination, validation, and structured error handling.",
    tech: [
      { name: "Node.js", icon: techIcons.nodejs },
      { name: "Express", icon: techIcons.express },
      { name: "MongoDB", icon: techIcons.mongodb },
      { name: "TypeScript", icon: techIcons.typescript },
    ],
    features: [
      "Product & cart APIs",
      "JWT auth middleware",
      "MongoDB aggregation",
      "Rate limiting",
    ],
    github: "https://github.com/itmepayal/ecommerce-api",
    live: "https://ecommerce-api-demo.vercel.app",
    category: "backend",
    workType: "company",
    company: "RetailHub Stores",
    featured: false,
    isPublished: true,
  },
  {
    title: "TaskFlow UI",
    description:
      "A productivity dashboard with drag-and-drop boards, dark mode, and real-time task filters. Focused on clean UX and accessible component patterns.",
    tech: [
      { name: "React", icon: techIcons.react },
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "Tailwind", icon: techIcons.tailwind },
    ],
    features: [
      "Kanban boards",
      "Dark / light theme",
      "Keyboard shortcuts",
      "Local persistence",
    ],
    github: "https://github.com/itmepayal/taskflow-ui",
    live: "https://taskflow-ui-demo.vercel.app",
    category: "frontend",
    workType: "self",
    company: "",
    featured: false,
    isPublished: true,
  },
];

const demoExperiences = [
  {
    company: "TechNova Solutions",
    position: "Software Developer Intern",
    location: "Remote, India",
    startDate: "2025-06-01",
    endDate: "",
    current: true,
    description:
      "Building and maintaining client-facing web applications with React and Node.js. Collaborating on API design, code reviews, and performance improvements for production features.",
    responsibilities: [
      "Developed reusable UI components used across 3 dashboard modules",
      "Optimized API response times by refactoring MongoDB queries",
      "Integrated third-party auth and form validation patterns",
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    companyLogo: "",
    companyWebsite: "https://technova.example.com",
    featured: true,
    order: 1,
  },
  {
    company: "Freelance",
    position: "Full-Stack Web Developer",
    location: "Remote",
    startDate: "2024-09-01",
    endDate: "2025-05-01",
    current: false,
    description:
      "Delivered custom websites and admin panels for small businesses. Handled end-to-end development from requirements to deployment on Vercel and MongoDB Atlas.",
    responsibilities: [
      "Built 4 client websites with CMS-style content management",
      "Set up CI-friendly deployments and environment configuration",
      "Created responsive layouts aligned with client brand guidelines",
    ],
    technologies: ["React", "Tailwind CSS", "Express", "MongoDB"],
    companyLogo: "",
    companyWebsite: "",
    featured: false,
    order: 2,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: "portfolio" });

  const projectTitles = demoProjects.map((p) => p.title);
  const experienceKeys = demoExperiences.map((e) => `${e.company}::${e.position}`);

  const projectsCol = mongoose.connection.collection("projects");
  const experiencesCol = mongoose.connection.collection("experiences");

  let projectsAdded = 0;
  for (const project of demoProjects) {
    const exists = await projectsCol.findOne({ title: project.title });
    if (exists) {
      console.log(`Skip project (exists): ${project.title}`);
      continue;
    }
    await projectsCol.insertOne({
      ...project,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    projectsAdded++;
    console.log(`Added project: ${project.title}`);
  }

  let experiencesAdded = 0;
  for (const experience of demoExperiences) {
    const exists = await experiencesCol.findOne({
      company: experience.company,
      position: experience.position,
    });
    if (exists) {
      console.log(`Skip experience (exists): ${experience.company}`);
      continue;
    }
    await experiencesCol.insertOne({
      ...experience,
      endDate: experience.current ? "Present" : experience.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    experiencesAdded++;
    console.log(`Added experience: ${experience.position} @ ${experience.company}`);
  }

  console.log(
    `\nDone — ${projectsAdded} project(s), ${experiencesAdded} experience(s) added.`,
  );
  console.log("Refresh http://localhost:3000 to preview Projects & Experience sections.");

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
