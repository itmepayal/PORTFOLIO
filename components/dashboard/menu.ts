import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Cpu,
  Code2,
  MessageSquare,
} from "lucide-react";

export const menu = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    key: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },

  {
    key: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },

  {
    key: "dsa",
    label: "DSA",
    href: "/dashboard/dsa",
    icon: Cpu,
  },

  {
    key: "skills",
    label: "Skills",
    href: "/dashboard/skills",
    icon: Code2,
  },

  {
    key: "messages",
    label: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
];
