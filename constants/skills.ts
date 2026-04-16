import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiTailwindcss,
  SiBootstrap,
  SiNextdotjs,
  SiDocker,
  SiVercel,
  SiRailway,
  SiRender,
  SiSwagger,
  SiOpenapiinitiative,
} from "react-icons/si";
import { SiPython } from "react-icons/si";

export const SKILLS = [
  {
    title: "Programming Languages",
    icon: SiJavascript,
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "C++", icon: SiCplusplus },
    ],
  },
  {
    title: "Backend Development",
    icon: FaNodeJs,
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Django", icon: SiDjango },
      { name: "REST API", icon: SiOpenapiinitiative },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    title: "Frontend Development",
    icon: FaReact,
    items: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "React.js", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
    ],
  },
  {
    title: "Databases",
    icon: FaDatabase,
    items: [
      { name: "SQL", icon: FaDatabase },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: SiDocker,
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: FaGitAlt },
      { name: "Vercel", icon: SiVercel },
      { name: "Railway", icon: SiRailway },
      { name: "Render", icon: SiRender },
    ],
  },
  {
    title: "API Documentation",
    icon: SiSwagger,
    items: [
      { name: "Swagger", icon: SiSwagger },
      { name: "OpenAPI", icon: SiOpenapiinitiative },
    ],
  },
];
