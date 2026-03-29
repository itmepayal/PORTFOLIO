"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Code,
  Server,
  Monitor,
  Database,
  Wrench,
  FileText,
} from "lucide-react";

import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";

export const Skills = () => {
  const skills = [
    {
      title: "Programming Languages",
      icon: Code,
      items: ["Python", "JavaScript", "TypeScript", "C++"],
    },
    {
      title: "Backend Development",
      icon: Server,
      items: ["Node.js", "Express.js", "Django", "DRF", "REST API", "FastAPI"],
    },
    {
      title: "Frontend Development",
      icon: Monitor,
      items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Databases",
      icon: Database,
      items: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      title: "DevOps & Tools",
      icon: Wrench,
      items: ["Docker", "Git", "GitHub", "Postman", "Railway", "Vercel"],
    },
    {
      title: "API Documentation",
      icon: FileText,
      items: ["Swagger", "OpenAPI"],
    },
  ];

  return (
    <Section
      id="skills"
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      <BackgroundBlobs />

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="flex w-fit items-center gap-2 px-4 py-2 text-primary rounded-full border border-border/60 bg-secondary/60 backdrop-blur-sm">
            <Sparkles className="size-4" />
            Skills
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="p-6 rounded-2xl border border-border/60 
                bg-background/60 backdrop-blur-md 
                hover:shadow-md hover:-translate-y-0.5
                transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-4 h-4 opacity-70" />
                  <h3 className="text-base font-semibold tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="px-5 py-3 text-xs rounded-full border border-border/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
