import {
  Home as HomeIcon,
  User,
  FileText,
  Briefcase,
  Star,
  Mail,
} from "lucide-react";

export type SectionType = {
  id: string;
  icon: React.ElementType;
};

export const SECTIONS: SectionType[] = [
  { id: "home", icon: HomeIcon },
  { id: "about", icon: User },
  { id: "resume", icon: FileText },
  { id: "projects", icon: Briefcase },
  { id: "reviews", icon: Star },
  { id: "contact", icon: Mail },
];
