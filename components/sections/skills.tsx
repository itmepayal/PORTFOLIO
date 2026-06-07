"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../common/container";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiPostman,
  SiRailway,
  SiVercel,
  SiRender,
  SiCloudflare,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Loader2 } from "lucide-react";

const iconMap = {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiPostman,
  SiRailway,
  SiVercel,
  SiRender,
  SiCloudflare,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  VscVscode,
};

interface Skill {
  _id: string;
  title: string;
  icon: keyof typeof iconMap;
  category: string;
  level: number;
  featured: boolean;
}

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills?page=1&limit=100");
        const data = await res.json();
        if (data.success) {
          setSkills(data.skills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);
  return (
    <Container>
      {/* ================================================================ */}
      {/* SECTION */}
      {/* ================================================================ */}
      <section>
        {/* ================================================================ */}
        {/* BACKGROUND GLOW */}
        {/* ================================================================ */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary/10 blur-3xl" />
        {/* ================================================================ */}
        {/* CONTAINER */}
        {/* ================================================================ */}
        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden"
          >
            {/* ================================================================ */}
            {/* TITLE */}
            {/* ================================================================ */}
            <div className="text-center mb-10 sm:mb-10">
              <p className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-semibold">
                Tech Stack
              </p>
              <h2 className="mt-5 text-3xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.05em] leading-none bg-linear-to-r from-foreground via-primary to-chart-3 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
              <p className="mt-5 max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground leading-6 sm:leading-7">
                Technologies and tools I use to build scalable backend systems,
                modern web applications, and enterprise-grade architectures.
              </p>
            </div>
            {/* ================================================================ */}
            {/* LEFT FADE */}
            {/* ================================================================ */}
            <div className="absolute left-0 top-0 h-full w-10 sm:w-16 md:w-24 lg:w-40 bg-linear-to-r from-background via-background/90 to-transparent z-20 pointer-events-none" />
            {/* ================================================================ */}
            {/* RIGHT FADE */}
            {/* ================================================================ */}
            <div className="absolute right-0 top-0 h-full w-10 sm:w-16 md:w-24 lg:w-40 bg-linear-to-l from-background via-background/90 to-transparent z-20 pointer-events-none" />
            {/* ================================================================ */}
            {/* SLIDER */}
            {/* ================================================================ */}
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-4 sm:gap-5 md:gap-6 min-w-max pb-4"
            >
              {[...skills, ...skills].map((skill, i) => {
                const Icon =
                  iconMap[skill.icon as keyof typeof iconMap] || FaCode;
                return (
                  <div
                    key={i}
                    className="group relative flex items-center gap-4 px-5 py-5 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-lg min-w-70 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-accent/50 hover:shadow-primary/10 hover:-translate-y-1"
                  >
                    {loading ? (
                      <div className="w-full flex items-center justify-center h-20">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-0 bg-linear-to-r from-primary/5 via-chart-3/5 to-chart-2/5 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/10 shrink-0 transition-all duration-300 group-hover:scale-110">
                          {Icon && <Icon className="w-7 h-7" />}
                        </div>
                        <div className="relative z-10 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className=" font-bold text-base md:text-lg truncate">
                              {skill.title}
                            </h3>
                            {skill.featured && (
                              <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {skill.category}
                          </p>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">
                                Proficiency
                              </span>
                              <span className="font-medium">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="h-full rounded-full bg-linear-to-r from-primary to-chart-3"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};
