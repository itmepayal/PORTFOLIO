"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";

import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { HiOutlineDownload, HiOutlineMail } from "react-icons/hi";

/* ---------------- CONSTANTS (OUTSIDE COMPONENT) ---------------- */

const techIcons = [
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
];

const floatingAnimation = {
  y: [0, -12, 0],
  rotate: [0, 4, 0],
  opacity: [0.06, 0.14, 0.06],
};

const positions = [
  { top: "12%", left: "6%" },
  { top: "26%", left: "16%" },
  { top: "40%", left: "26%" },
  { top: "54%", left: "36%" },
  { top: "68%", left: "46%" },
  { top: "20%", left: "60%" },
  { top: "34%", left: "70%" },
  { top: "48%", left: "80%" },
];

/* ---------------- COMPONENT ---------------- */

export const Home = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="home"
      className="relative overflow-hidden flex items-center px-4 sm:px-6 lg:px-12"
    >
      <BackgroundBlobs />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 -z-50 opacity-20 hidden sm:block bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[50px_50px]" />

      {/* FLOATING ICONS */}
      <div className="absolute inset-0 -z-10 pointer-events-none hidden sm:block">
        {techIcons.map((Icon, i) => {
          const pos = positions[i % positions.length];

          return (
            <motion.div
              key={i}
              animate={shouldReduceMotion ? {} : floatingAnimation}
              transition={{
                duration: 7 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute text-primary will-change-transform"
              style={pos}
            >
              <Icon size={22} />
            </motion.div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center w-full">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center order-1 md:order-2"
        >
          {/* GLOW */}
          <div className="absolute w-55 sm:w-75 md:w-95 h-55 sm:h-75 md:h-95 rounded-full bg-primary/20 blur-[140px]" />

          {/* IMAGE */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative p-2 sm:p-3 rounded-full bg-card/20 backdrop-blur-xl border border-border shadow-xl"
          >
            <Image
              src="/profile.jpeg"
              alt="Payal Yadav profile picture"
              width={250}
              height={250}
              priority
              className="rounded-full object-cover w-45 sm:w-55 md:w-65 h-45 sm:h-55 md:h-65"
            />
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
          {/* STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-card/30 border border-border backdrop-blur-md text-xs text-muted-foreground mx-auto md:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to Backend / Full Stack Opportunities
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            Hi, I’m{" "}
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Payal Yadav
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed mx-auto md:mx-0"
          >
            I build scalable backend systems, high-performance APIs, and modern
            full-stack applications with clean architecture, strong system
            design, and production-ready engineering.
          </motion.p>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
            {["Backend", "System Design", "Microservices", "APIs"].map(
              (item, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  className="px-3 sm:px-4 py-1 text-xs rounded-full bg-card/20 border border-border backdrop-blur-md hover:bg-primary/10 transition"
                >
                  {item}
                </motion.span>
              ),
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center md:justify-start">
            {/* RESUME */}
            <motion.button
              aria-label="Download Resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto overflow-hidden"
            >
              <HiOutlineDownload className="text-lg group-hover:animate-bounce" />
              <span className="text-sm">Resume</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition" />
            </motion.button>

            {/* CONTACT */}
            <motion.button
              aria-label="Contact Me"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 px-6 py-2 rounded-xl border border-border bg-card/20 backdrop-blur-md hover:bg-card/40 transition w-full sm:w-auto"
            >
              <HiOutlineMail className="text-lg group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm">Contact Me</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 sm:h-44 bg-linear-to-t from-background to-transparent" />
    </Section>
  );
};
