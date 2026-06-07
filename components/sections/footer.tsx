"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconArrowUpRight,
  IconSparkles,
  IconBrandLeetcode,
} from "@tabler/icons-react";

/* ====================================================================== */
/* FOOTER */
/* ====================================================================== */

export const Footer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* ====================================================================== */
  /* SOCIALS */
  /* ====================================================================== */

  const socialIcons = [
    {
      icon: IconBrandLeetcode,
      link: "https://leetcode.com/Payal_Leet_Code",
    },

    {
      icon: IconBrandGithub,
      link: "https://github.com/itmepayal",
    },

    {
      icon: IconBrandLinkedin,
      link: "https://www.linkedin.com/in/payal-yadav-dev",
    },

    {
      icon: IconMail,
      link: "mailto:itme.payalyadav@gmail.com",
    },
  ];

  /* ====================================================================== */
  /* NAV LINKS */
  /* ====================================================================== */

  const links = ["Home", "Skills", "Experience", "Projects", "Contact"];

  /* ====================================================================== */
  /* CURSOR LIGHT */
  /* ====================================================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 25,
    stiffness: 120,
  });

  const smoothY = useSpring(mouseY, {
    damping: 25,
    stiffness: 120,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <footer className=" relative overflow-hidden border-t border-border/70 bg-background mt-8 sm:mt-12">
      {/* ====================================================== */}
      {/* CURSOR GLOW */}
      {/* ====================================================== */}
      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
        style={{
          background: `radial-gradient(
            500px at ${smoothX}px ${smoothY}px,
            color-mix(in oklab, var(--color-primary) 12%, transparent),
            transparent 80%
          )`,
        }}
      />
      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================================== */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className=" absolute left-1/2 top-0 h-72 w-105 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* ====================================================== */}
      {/* GRID PATTERN */}
      {/* ====================================================== */}
      <div className=" absolute inset-0 -z-30 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.03]" />
      {/* ====================================================== */}
      {/* CONTAINER */}
      {/* ====================================================== */}
      <div className=" relative z-10 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 sm:py-10">
        {/* ====================================================== */}
        {/* CTA */}
        {/* ====================================================== */}
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
            duration: 0.6,
          }}
          className=" text-center mb-14 sm:mb-20"
        >
          <div className=" inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-primary backdrop-blur-xl">
            <IconSparkles size={14} />
            Available For Work
          </div>

          <h2 className=" mt-6 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em]">
            Let’s build something{" "}
            <span className=" bg-linear-to-r from-primary via-primary/80 to-chart-3 bg-clip-text text-transparent">
              impactful
            </span>
          </h2>

          <p className=" mt-5 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground">
            Full Stack Developer specializing in scalable backend systems,
            realtime applications, authentication architecture, and API-first
            engineering using MERN, Next.js, Django & FastAPI.
          </p>

          {/* ====================================================== */}
          {/* TECH STACK */}
          {/* ====================================================== */}

          <div className=" mt-8 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
            {[
              "JavaScript",
              "Python",
              "TypeScript",
              "MERN",
              "Next.js",
              "Django",
              "FastAPI",
              "REST API",
            ].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{
                  y: -2,
                  scale: 1.04,
                }}
                className=" rounded-2xl border border-border bg-background/70 px-4 py-2 text-[11px] sm:text-xs font-medium text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary/25 hover:bg-primary/5 hover:text-foreground"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* ====================================================== */}
          {/* CTA BUTTON */}
          {/* ====================================================== */}

          <motion.a
            href="#contact"
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className=" group relative inline-flex items-center gap-2 overflow-hidden mt-9 rounded-2xl border border-primary/20 bg-primary/10 px-6 sm:px-7 py-3 text-sm font-semibold text-primary backdrop-blur-xl transition-all duration-300 hover:border-primary/35 hover:bg-primary/15 hover:shadow-lg"
          >
            <span className=" absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
            Let’s Work Together
            <IconArrowUpRight
              size={16}
              className=" transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-center">
          {/* ====================================================== */}
          {/* LEFT */}
          {/* ====================================================== */}

          <div className=" flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className=" text-xl sm:text-2xl font-black tracking-tight">
              Payal Yadav
            </h3>

            <p className=" mt-2 text-sm text-muted-foreground">
              Full Stack Developer • Backend & System Design
            </p>

            <div className=" mt-5 flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              <span className=" rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] text-muted-foreground">
                India
              </span>

              <div className=" flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className=" absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className=" relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to Work
              </div>
            </div>

            <p className=" mt-4 text-xs text-muted-foreground">
              Internships & Full-Time • API-First Systems
            </p>
          </div>

          {/* ====================================================== */}
          {/* CENTER LINKS */}
          {/* ====================================================== */}

          <div className=" flex items-center justify-center flex-wrap gap-5 sm:gap-7">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className=" group relative text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
              >
                {link}
                <span className=" absolute left-0 -bottom-1 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* ====================================================== */}
          {/* RIGHT SOCIALS */}
          {/* ====================================================== */}

          <div className=" flex items-center justify-center lg:justify-end gap-3 sm:gap-4">
            {socialIcons.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeIndex === i;
              return (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="relative"
                >
                  <div
                    className={`
                      absolute
                      inset-0
                      rounded-2xl
                      p-px
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-linear-to-br from-primary via-chart-3 to-chart-2 opacity-100"
                          : "opacity-0"
                      }
                    `}
                  >
                    <div className="h-full w-full rounded-2xl bg-background" />
                  </div>

                  <div
                    className={`
                      relative
                      flex
                      items-center
                      justify-center
                      size-11
                      sm:size-12
                      rounded-2xl
                      border
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "border-primary/30 bg-primary/10 shadow-lg"
                          : "border-border bg-background/70"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className={`
                        transition-all
                        duration-300
                        ${isActive ? "text-primary" : "text-muted-foreground"}
                      `}
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ====================================================== */}
        {/* BOTTOM */}
        {/* ====================================================== */}

        <div className=" mt-14 pt-6 border-t border-border/70 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Payal Yadav. All rights reserved.
          </p>
          <p className=" flex items-center gap-1.5 transition-all duration-300 hover:text-foreground">
            Designed & Built with precision
            <IconSparkles size={14} className="text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};
