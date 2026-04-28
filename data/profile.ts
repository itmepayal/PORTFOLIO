import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandLeetcode,
} from "@tabler/icons-react";

import {
  Server,
  GitBranch,
  Link as LinkIcon,
  Database,
  Layers,
  Activity,
} from "lucide-react";

export const profileData = {
  name: "Payal Yadav",
  role: "Full Stack Developer",
  status: "Available",
  education: "MCA • Computer Science",
  bio: "Backend-focused developer building scalable systems & clean APIs.",
  image: "/profile.jpeg",

  socials: [
    { icon: IconBrandGithub, url: "https://github.com/itmepayal" },
    {
      icon: IconBrandLinkedin,
      url: "https://linkedin.com/in/payal-yadav-dev",
    },
    {
      icon: IconBrandLeetcode,
      url: "https://leetcode.com/Payal_Leet_Code",
    },
  ],

  techStack: [
    { name: "Backend Development", icon: Server },
    { name: "API Development", icon: LinkIcon },
    { name: "System Design", icon: GitBranch },
    { name: "Database Management", icon: Database },
    { name: "Software Architecture", icon: Layers },
    { name: "Scalability Engineering", icon: Activity },
  ],

  stats: {
    total: 366,
    leetcode: 111,
    striver: 255,
  },
};
