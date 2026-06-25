"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../common/Container";
import {
  LayoutGrid,
  Globe,
  Server,
  Box,
  Database,
  Layers,
  FileCode,
  Palette,
  Triangle,
  Code2,
  Wind,
  Grid2x2,
  Zap,
  Cpu,
  Braces,
  Bolt,
  Link,
  Package,
  Boxes,
  Cloud,
  Rocket,
  RefreshCw,
  Train,
  Leaf,
  CircleDot,
  HardDrive,
  TestTube,
  Network,
  Brain,
  GitBranch,
  BarChart3,
  Lock,
  ShoppingCart,
  Wifi,
  Wrench,
  Container as ContainerIcon,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  cat: "frontend" | "backend" | "devops" | "database";
  level: number;
}

const SKILLS_DATA: Skill[] = [
  { name: "React", icon: <Layers size={20} />, cat: "frontend", level: 5 },
  { name: "HTML", icon: <FileCode size={20} />, cat: "frontend", level: 5 },
  { name: "CSS", icon: <Palette size={20} />, cat: "frontend", level: 5 },
  { name: "Next.js", icon: <Triangle size={20} />, cat: "frontend", level: 4 },
  { name: "TypeScript", icon: <Code2 size={20} />, cat: "frontend", level: 4 },
  { name: "Tailwind", icon: <Wind size={20} />, cat: "frontend", level: 4 },
  { name: "Bootstrap", icon: <Grid2x2 size={20} />, cat: "frontend", level: 4 },
  { name: "Node.js", icon: <Zap size={20} />, cat: "backend", level: 5 },
  { name: "Express.js", icon: <Server size={20} />, cat: "backend", level: 5 },
  { name: "Python", icon: <Braces size={20} />, cat: "backend", level: 4 },
  { name: "FastAPI", icon: <Cpu size={20} />, cat: "backend", level: 3 },
  { name: "REST APIs", icon: <Link size={20} />, cat: "backend", level: 5 },
  { name: "Docker", icon: <Package size={20} />, cat: "devops", level: 4 },
  { name: "Kubernetes", icon: <Boxes size={20} />, cat: "devops", level: 3 },
  { name: "AWS", icon: <Cloud size={20} />, cat: "devops", level: 3 },
  { name: "Vercel", icon: <Triangle size={20} />, cat: "devops", level: 5 },
  { name: "Render", icon: <RefreshCw size={20} />, cat: "devops", level: 4 },
  { name: "Railway", icon: <Train size={20} />, cat: "devops", level: 4 },
  { name: "MongoDB", icon: <Leaf size={20} />, cat: "database", level: 5 },
  {
    name: "PostgreSQL",
    icon: <HardDrive size={20} />,
    cat: "database",
    level: 4,
  },
  { name: "SQL", icon: <Database size={20} />, cat: "database", level: 5 },
  { name: "Postman", icon: <TestTube size={20} />, cat: "database", level: 5 },
];

const CATEGORIES: { name: string; value: string; icon: React.ReactNode }[] = [
  { name: "All", value: "all", icon: <LayoutGrid size={13} /> },
  { name: "Frontend", value: "frontend", icon: <Globe size={13} /> },
  { name: "Backend", value: "backend", icon: <Server size={13} /> },
  { name: "DevOps", value: "devops", icon: <Box size={13} /> },
  { name: "Databases", value: "database", icon: <Database size={13} /> },
];

const MARQUEE_ITEMS: { icon: React.ReactNode; name: string }[] = [
  { icon: <Leaf size={14} />, name: "MongoDB" },
  { icon: <Zap size={14} />, name: "Express.js" },
  { icon: <Layers size={14} />, name: "React" },
  { icon: <Server size={14} />, name: "Node.js" },
  { icon: <Network size={14} />, name: "LangChain" },
  { icon: <Brain size={14} />, name: "OpenAI API" },
  { icon: <Braces size={14} />, name: "Python" },
  { icon: <HardDrive size={14} />, name: "PostgreSQL" },
  { icon: <CircleDot size={14} />, name: "Redis" },
  { icon: <Package size={14} />, name: "Docker" },
  { icon: <Cloud size={14} />, name: "AWS" },
  { icon: <Database size={14} />, name: "Vector DBs" },
  { icon: <Link size={14} />, name: "REST APIs" },
  { icon: <Triangle size={14} />, name: "Next.js" },
  { icon: <GitBranch size={14} />, name: "GraphQL" },
  { icon: <Code2 size={14} />, name: "TypeScript" },
];

const MARQUEE_ITEMS_2: { icon: React.ReactNode; name: string }[] = [
  { icon: <Boxes size={14} />, name: "Kubernetes" },
  { icon: <Wrench size={14} />, name: "Terraform" },
  { icon: <BarChart3 size={14} />, name: "Prometheus" },
  { icon: <Wind size={14} />, name: "Tailwind CSS" },
  { icon: <Cpu size={14} />, name: "FastAPI" },
  { icon: <Brain size={14} />, name: "RAG Systems" },
  { icon: <Wifi size={14} />, name: "WebRTC" },
  { icon: <BarChart3 size={14} />, name: "D3.js" },
  { icon: <Lock size={14} />, name: "Web Crypto" },
  { icon: <Globe size={14} />, name: "SvelteKit" },
  { icon: <Database size={14} />, name: "Pinecone" },
  { icon: <Cpu size={14} />, name: "Transformers.js" },
  { icon: <Code2 size={14} />, name: "WASM" },
  { icon: <ShoppingCart size={14} />, name: "Stripe / Razorpay" },
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.cat === activeCategory);

  return (
    <Container>
      <section
        id="skills"
        className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      >
        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 flex flex-wrap items-end gap-4 sm:mb-10 sm:gap-6">
              <div>
                <div className="mb-1 font-mono text-[0.62rem] tracking-[0.15em] text-primary sm:text-[0.68rem]">
                  04 — SKILLS
                </div>
                <h2 className="text-[clamp(1.4rem,5vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                  My Tech Stack
                </h2>
              </div>
              <div className="h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
            </div>

            <div className="mb-8 grid grid-cols-5 gap-2 sm:mb-10 sm:grid-cols-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`inline-flex flex-col h-11 items-center justify-center gap-1.5 border py-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] transition-all sm:flex-row sm:gap-1.5 sm:py-2 sm:text-[0.68rem] ${
                    activeCategory === cat.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className="shrink-0">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
            <div
              className={`mb-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-${filteredSkills.length} xl:grid-cols-${filteredSkills.length} sm:mb-12`}
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex flex-col items-center gap-2 overflow-hidden bg-card px-2 py-4 text-center transition-colors hover:bg-secondary sm:px-3 sm:py-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-primary transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
                      {skill.icon}
                    </div>

                    <div className="w-full truncate px-1 font-mono text-[0.6rem] tracking-[0.04em] text-foreground/80 sm:text-[0.68rem]">
                      {skill.name}
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            i < skill.level ? "bg-primary" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary to-chart-3 transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="overflow-hidden">
              <div className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted-foreground sm:mb-4 sm:text-[0.62rem]">
                All technologies
              </div>

              <div
                className="mb-3 overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div className="animate-marquee flex w-max gap-3 sm:gap-6">
                  {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 whitespace-nowrap border border-transparent px-2 py-1.5 font-mono text-[0.68rem] text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-primary sm:gap-2 sm:px-3 sm:py-2 sm:text-[0.78rem]"
                    >
                      <span className="shrink-0 text-primary/60">
                        {item.icon}
                      </span>
                      {item.name}
                      <span className="h-1 w-1 shrink-0 rounded-full bg-border" />
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div className="animate-marquee-reverse flex w-max gap-3 sm:gap-6">
                  {[...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2].map((item, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 whitespace-nowrap border border-transparent px-2 py-1.5 font-mono text-[0.68rem] text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-primary sm:gap-2 sm:px-3 sm:py-2 sm:text-[0.78rem]"
                    >
                      <span className="shrink-0 text-primary/60">
                        {item.icon}
                      </span>
                      {item.name}
                      <span className="h-1 w-1 shrink-0 rounded-full bg-border" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};
