import { FaNodeJs, FaGithub, FaGitAlt, FaReact } from "react-icons/fa6";
import {
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiJsonwebtokens,
  SiSwagger,
  SiReactrouter,
  SiTailwindcss,
  SiRender,
  SiMongodb,
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

export const projectIconMap = {
  FaNodeJs,
  FaReact,
  FaGithub,
  FaGitAlt,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiJsonwebtokens,
  SiSwagger,
  SiReactrouter,
  SiTailwindcss,
  SiRender,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  TbApi,
  SiMongoose,
  SiSocketdotio,
  SiGoogle,
  SiApple,
  SiPostman,
};

export interface ProjectTech {
  name: string;
  icon: keyof typeof projectIconMap;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  tech: ProjectTech[];
  features: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  category: string;
  workType?: "company" | "freelance" | "self";
  company?: string;
  createdAt: string;
}
