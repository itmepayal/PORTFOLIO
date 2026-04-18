// types.ts or same file
import { Home, FileText, Star, Mail } from "lucide-react";

export type SectionType = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
};

export const SECTIONS: SectionType[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "skills", label: "Skills", href: "#skills", icon: Star },
  { id: "achievements", label: "Achievements", href: "#proof", icon: Star },
  { id: "education", label: "Education", href: "#education", icon: FileText },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];
