import { FaGithub, FaReact, FaGitAlt, FaNodeJs } from "react-icons/fa6";
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
import type { IconType } from "react-icons";

export const techIconMap = {
  FaReact,
  FaGithub,
  FaGitAlt,
  FaNodeJs,
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
} as const satisfies Record<string, IconType>;

export type TechIconName = keyof typeof techIconMap;

export function getTechIcon(name?: string | null): IconType | null {
  if (!name?.trim()) return null;
  return techIconMap[name as TechIconName] ?? null;
}
