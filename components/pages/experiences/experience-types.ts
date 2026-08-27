import {
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
  SiReactrouter,
  SiSwagger,
  SiJsonwebtokens,
  SiFirebase,
  SiRender,
  SiCloudinary,
  SiPostman,
} from "react-icons/si";
import { FaReact, FaGithub, FaGitAlt } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";

export const experienceTechIconMap: Record<string, React.ElementType> = {
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "React Router": SiReactrouter,
  Swagger: SiSwagger,
  JWT: SiJsonwebtokens,
  Firebase: SiFirebase,
  Render: SiRender,
  React: FaReact,
  GitHub: FaGithub,
  Git: FaGitAlt,
  "REST API": TbApi,
  Postman: SiPostman,
  Cloudinary: SiCloudinary,
};

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo: string;
  companyWebsite: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const formatExperienceDate = (dateStr: string) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "";

export const getExperienceTenure = (experience: Experience) => {
  const startFormatted = formatExperienceDate(experience.startDate);
  const endFormatted = experience.current
    ? "Present"
    : formatExperienceDate(experience.endDate);
  return `${startFormatted} — ${endFormatted}`;
};

export const getExperienceDuration = (experience: Experience) => {
  const startMs = new Date(experience.startDate).getTime();
  const endMs = experience.current
    ? Date.now()
    : new Date(experience.endDate).getTime();
  const months = Math.max(
    1,
    Math.round((endMs - startMs) / (1000 * 60 * 60 * 24 * 30)),
  );
  return months < 12
    ? `${months} mo${months !== 1 ? "s" : ""}`
    : `${Math.floor(months / 12)} yr${Math.floor(months / 12) !== 1 ? "s" : ""}${months % 12 ? ` ${months % 12} mo` : ""}`;
};
