import { Home, Wrench, Code, Briefcase, Mail } from "lucide-react";

export type SectionType = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
};

export const SECTIONS: SectionType[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "skills", label: "Skills", href: "#skills", icon: Wrench },
  { id: "projects", label: "Projects", href: "#projects", icon: Code },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    icon: Briefcase,
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: Mail,
  },
];
