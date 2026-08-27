export const projectCategories = [
  "backend",
  "fullstack",
  "frontend",
  "mobile",
  "api",
  "other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projectWorkTypes = ["company", "freelance", "self"] as const;

export type ProjectWorkType = (typeof projectWorkTypes)[number];

export const skillCategories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "mobile",
  "language",
  "tool",
  "cloud",
  "other",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const dsaCategories = [
  "leetcode",
  "striver",
  "codeforces",
  "gfg",
  "custom",
] as const;

export type DSACategory = (typeof dsaCategories)[number];

export const userRoles = ["admin", "user"] as const;

export type UserRole = (typeof userRoles)[number];
