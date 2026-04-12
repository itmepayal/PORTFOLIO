import {
  Code,
  Server,
  Monitor,
  Database,
  Wrench,
  FileText,
} from "lucide-react";

export const SKILLS = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-indigo-500 to-purple-500",
    items: [
      { name: "Python", level: 70 },
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 75 },
      { name: "C++", level: 40 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 60 },
      { name: "Django", level: 65 },
      { name: "REST API", level: 55 },
      { name: "FAST API", level: 60 },
    ],
  },
  {
    title: "Frontend Development",
    icon: Monitor,
    color: "from-pink-500 to-rose-500",
    items: [
      { name: "HTML", level: 80 },
      { name: "CSS", level: 70 },
      { name: "React.js", level: 70 },
      { name: "Next.js", level: 40 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Bootstrap", level: 76 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    items: [
      { name: "SQL", level: 60 },
      { name: "MongoDB", level: 50 },
      { name: "PostgreSQL", level: 40 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "Docker", level: 85 },
      { name: "Git", level: 95 },
      { name: "GitHub", level: 95 },
      { name: "Vercel", level: 90 },
      { name: "Railway", level: 90 },
      { name: "Render", level: 90 },
    ],
  },
  {
    title: "API Documentation",
    icon: FileText,
    color: "from-gray-400 to-gray-600",
    items: [
      { name: "Swagger", level: 48 },
      { name: "OpenAPI", level: 45 },
    ],
  },
];
