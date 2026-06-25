import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  BrainCircuit,
  Code2,
  MessageSquareMore,
  BriefcaseBusiness,
} from "lucide-react";

export type MenuItem = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  new?: boolean;
};

export const menu: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & insights",
  },

  {
    key: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    description: "Manage all projects",
    badge: "8",
  },

  {
    key: "dsa",
    label: "DSA",
    href: "/dashboard/dsa",
    icon: BrainCircuit,
    description: "Coding preparation",
    new: true,
  },

  {
    key: "skills",
    label: "Skills",
    href: "/dashboard/skills",
    icon: Code2,
    description: "Tech stack & expertise",
  },

  {
    key: "experience",
    label: "Experience",
    href: "/dashboard/experiences",
    icon: BriefcaseBusiness,
    description: "Work experience",
  },

  {
    key: "messages",
    label: "Enquiries",
    href: "/dashboard/enquiries",
    icon: MessageSquareMore,
    description: "Client conversations",
    badge: "4",
  },
];
