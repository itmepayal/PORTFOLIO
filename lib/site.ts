export const SITE = {
  name: "Payal Yadav",
  title: "Backend Engineer",
  shortTitle: "Backend Engineer Portfolio",
  email: "itme.payalyadav@gmail.com",
  github: "https://github.com/itmepayal",
  linkedin: "https://www.linkedin.com/in/payal-yadav-dev",
  location: "India",
  resumePath:
    process.env.NEXT_PUBLIC_RESUME_URL?.trim() || "/pdf/PAYAL_YADAV.pdf",
  description:
    "Payal Yadav is a Backend Engineer specializing in scalable APIs, Node.js, MongoDB, system design, and production-ready full-stack applications. Portfolio showcasing projects, experience, DSA progress, and skills.",
  keywords: [
    "Payal Yadav",
    "Backend Engineer",
    "Backend Developer",
    "Node.js Developer",
    "MongoDB",
    "REST API",
    "Full Stack Developer",
    "Software Engineer India",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "System Design",
    "DSA",
    "LeetCode",
  ],
};

export const DEFAULT_PROJECT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
