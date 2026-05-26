import { FolderKanban, CheckCircle2, CircleDashed, Zap } from "lucide-react";
import { Project } from "./types";

export const projects = [
  {
    title: "ShopSphere",

    description:
      "A modern e-commerce platform with secure payments, product management, and an intuitive shopping experience.",

    category: "fullstack",

    status: "Published",

    progress: 92,

    live: "https://shopsphere.vercel.app",

    github: "https://github.com/yourname/shopsphere",

    features: [
      "Product search & filtering",
      "Cart & checkout system",
      "Payment integration",
      "Admin dashboard",
    ],

    tech: [
      {
        name: "Next.js",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },

      {
        name: "MongoDB",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },

      {
        name: "Stripe",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
      },
    ],
  },
];

export const stats = [
  {
    label: "Total Projects",
    value: "24",
    growth: "+12.4%",
    icon: FolderKanban,
  },

  {
    label: "Published",
    value: "18",
    growth: "+8.2%",
    icon: CheckCircle2,
  },

  {
    label: "Draft Projects",
    value: "6",
    growth: "+2.1%",
    icon: CircleDashed,
  },

  {
    label: "Featured",
    value: "9",
    growth: "+18.3%",
    icon: Zap,
  },
];

export const filterOptions = ["All", "Published", "Draft"];
