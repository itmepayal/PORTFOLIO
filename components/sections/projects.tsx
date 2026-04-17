"use client";

import { motion } from "framer-motion";
import { ExternalLink, Rocket, Code2, Sparkles } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    title: "Food Delivery System",
    description:
      "Full-stack platform with authentication, payments, real-time tracking and admin dashboard.",
    tech: ["Node.js", "MongoDB", "React", "Socket.IO"],
    github: "#",
    live: "#",
    icon: Rocket,
    image:
      "https://www.figma.com/community/file/1182197835889504018/portfolio-design",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat with typing indicators, presence, and WebRTC video calls.",
    tech: ["React", "Socket.IO", "WebRTC", "Redis"],
    github: "#",
    live: "#",
    icon: Sparkles,
    image:
      "https://www.figma.com/community/file/1182197835889504018/portfolio-design",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern portfolio with animations, theme system and responsive UI.",
    tech: ["React", "Tailwind", "Framer Motion"],
    github: "#",
    live: "#",
    icon: Code2,
    image:
      "https://www.figma.com/community/file/1182197835889504018/portfolio-design",
  },
];

export const Projects = () => {
  return (
    <Section id="projects" className="relative overflow-hidden py-16">
      <BackgroundBlobs />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {PROJECTS.map((project, index) => {
          const Icon = project.icon;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden border border-white/10
              bg-white/5 backdrop-blur-xl shadow-md hover:shadow-2xl hover:shadow-primary/20
              transition-all duration-300 hover:-translate-y-2"
            >
              {/* Glow Border Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none" />

              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Floating Action Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full backdrop-blur-md"
                    asChild
                  >
                    <a href={project.github} target="_blank">
                      <IconBrandGithub size={18} />
                    </a>
                  </Button>

                  <Button size="icon" className="rounded-full" asChild>
                    <a href={project.live} target="_blank">
                      <ExternalLink size={18} />
                    </a>
                  </Button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                {/* Title Row */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((tech, i) => (
                    <Badge
                      key={i}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10
                      text-white/70 hover:bg-primary/10 hover:text-white transition"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
