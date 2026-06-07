"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineMail, HiSparkles } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { ModeToggle } from "@/components/common/theme-button";

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/itmepayal",
  },

  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/payal-yadav-dev",
  },

  {
    icon: SiLeetcode,
    href: "https://leetcode.com/Payal_Leet_Code",
  },
];

export const Home = () => {
  return (
    <section className=" relative flex items-center justify-center overflow-hidden bg-background">
      {/* ====================================================== */}
      {/* GRID */}
      {/* ====================================================== */}
      <div className=" absolute inset-0 opacity-60 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[50px_50px] sm:bg-size-[64px_64px]" />
      {/* ====================================================== */}
      {/* AURORA */}
      {/* ====================================================== */}
      <div className=" absolute left-[-20%] top-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:h-112 sm:w-md lg:h-136 lg:w-136" />
      <div className=" absolute bottom-[-15%] right-[-15%] h-72 w-72 rounded-full bg-chart-3/20 blur-3xl sm:h-112 sm:w-md lg:h-136 lg:w-136" />
      <div className=" absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-2/10 blur-3xl sm:h-80 sm:w-80" />
      {/* ====================================================== */}
      {/* OVERLAY */}
      {/* ====================================================== */}
      <div className=" absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      {/* ====================================================== */}
      {/* THEME TOGGLE */}
      {/* ====================================================== */}
      <div className=" absolute right-4 top-4 z-50 sm:right-6 sm:top-6">
        <div className=" rounded-2xl border border-border/60 bg-card/70 p-1.5 shadow-xl backdrop-blur-xl">
          <ModeToggle />
        </div>
      </div>
      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}
      <div className=" relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10">
        <div className=" flex flex-col items-center justify-center text-center">
          {/* ====================================================== */}
          {/* BADGE */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 sm:mb-8"
          >
            <div className=" group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
              <div className=" flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                <HiSparkles className="size-3.5" />
              </div>
              <span className=" text-xs font-medium text-foreground sm:text-sm">
                Available for Freelance & Full-Time Work
              </span>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* PROFILE IMAGE */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 sm:mb-10"
          >
            <div className=" absolute inset-0 scale-125 rounded-full bg-primary/25 blur-3xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className=" absolute -inset-1 rounded-full bg-conic from-primary via-chart-2 to-chart-3"
            />
            <div className=" relative rounded-full bg-background p-1">
              <Image
                src="/profile.jpeg"
                alt="Payal Yadav"
                width={240}
                height={240}
                priority
                className=" relative z-10 h-28 w-28 rounded-full border-[5px] border-card bg-card object-cover shadow-2xl xs:h-32 xs:w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
              />
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* NAME */}
          {/* ====================================================== */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=" max-w-5xl text-4xl font-black leading-[0.95] tracking-1 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary"
          >
            Payal Yadav
          </motion.h1>

          {/* ====================================================== */}
          {/* ROLE */}
          {/* ====================================================== */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className=" mt-5 px-2 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:text-xl"
          >
            Backend Engineer • MERN Stack Developer • System Design
          </motion.p>

          {/* ====================================================== */}
          {/* DESCRIPTION */}
          {/* ====================================================== */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=" mt-6 max-w-3xl px-2 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg"
          >
            I build scalable backend systems, enterprise-grade APIs, and
            high-performance full-stack applications with a strong focus on
            clean architecture, security, scalability, and production-ready
            engineering.
          </motion.p>

          {/* ====================================================== */}
          {/* BUTTONS */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className=" mt-10 flex w-full flex-row items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-5"
          >
            <Button className=" group relative h-13 w-40 max-w-sm overflow-hidden rounded-2xl px-8 text-sm font-semibold shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] sm:h-14 sm:min-w-52 sm:text-base">
              <a
                href="/pdf/PAYAL_YADAV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className=" relative z-10 flex items-center justify-center"
              >
                View Resume
                <HiArrowRight className=" ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              variant="outline"
              className=" group h-13 w-40 max-w-sm rounded-2xl border-border/60 bg-card/50 text-sm font-semibold shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:bg-accent/50 sm:h-14 sm:min-w-52 sm:text-base"
            >
              <a
                href="mailto:payal@example.com"
                className=" flex items-center justify-center"
              >
                <HiOutlineMail className=" mr-2 size-5 transition-transform duration-300 group-hover:rotate-12" />
                Contact Me
              </a>
            </Button>
          </motion.div>

          {/* ====================================================== */}
          {/* SOCIALS */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className=" mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-14 sm:gap-5"
          >
            {socials.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.96 }}
                  className=" group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card/50 text-muted-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:text-primary sm:h-14 sm:w-14"
                >
                  <div className=" absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon className=" relative z-10 h-5 w-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
