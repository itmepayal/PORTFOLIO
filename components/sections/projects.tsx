"use client";

import { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Container } from "../common/container";
import { motion, AnimatePresence } from "framer-motion";
import { FaNodeJs, FaReact, FaGithub } from "react-icons/fa6";
import { SiNextdotjs, SiMongodb, SiPostgresql } from "react-icons/si";

/* ====================================================================== */
/* PROJECTS */
/* ====================================================================== */

const projects = [
  {
    title: "TaskHub Pro",

    description:
      "A production-grade project management backend system with workspaces, RBAC, task management, realtime collaboration, analytics, and scalable API architecture.",

    tech: [
      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "React",
        icon: FaReact,
      },

      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
    ],

    features: [
      "Authentication & RBAC",
      "Realtime Infrastructure",
      "Redis Caching Layer",
    ],

    github: "#",
    live: "#",
  },

  {
    title: "Realtime ChatSphere",

    description:
      "Realtime chat platform with WebRTC video calls, Socket.IO architecture, online presence, notifications, and Redis scaling.",

    tech: [
      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "React",
        icon: FaReact,
      },

      {
        name: "MongoDB",
        icon: SiMongodb,
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
    ],

    features: [
      "Socket.IO Scaling",
      "WebRTC Video Calls",
      "Presence & Notifications",
    ],

    github: "#",
    live: "#",
  },

  {
    title: "BABY MART",

    description:
      "Scalable e-commerce platform with authentication, payments, cart system, inventory management, analytics dashboard, and order tracking.",

    tech: [
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },

      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },

      {
        name: "MongoDB",
        icon: SiMongodb,
      },
    ],

    features: [
      "Stripe Payment Gateway",
      "Admin Analytics",
      "Inventory Management",
    ],

    github: "#",
    live: "#",
  },

  {
    title: "CloudSync API",

    description:
      "Enterprise cloud file management backend with chunk uploads, storage optimization, RBAC, secure file sharing, and audit logging.",

    tech: [
      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "React",
        icon: FaReact,
      },

      {
        name: "MongoDB",
        icon: SiMongodb,
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
    ],

    features: ["Chunk File Uploads", "Secure File Sharing", "Audit Logs"],

    github: "#",
    live: "#",
  },

  {
    title: "FinanceFlow",

    description:
      "Advanced finance management system with realtime analytics, role permissions, invoice management, and payment automation.",

    tech: [
      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },

      {
        name: "React",
        icon: FaReact,
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
    ],

    features: ["Realtime Analytics", "Invoice Automation", "Role-Based Access"],

    github: "#",
    live: "#",
  },

  {
    title: "DevConnect",

    description:
      "Developer collaboration platform with realtime messaging, GitHub integrations, team management, and project workspaces.",

    tech: [
      {
        name: "React",
        icon: FaReact,
      },

      {
        name: "Node.js",
        icon: FaNodeJs,
      },

      {
        name: "MongoDB",
        icon: SiMongodb,
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
    ],

    features: [
      "Realtime Messaging",
      "GitHub Integration",
      "Workspace Management",
    ],

    github: "#",
    live: "#",
  },
];

/* ====================================================================== */
/* CONSTANTS */
/* ====================================================================== */

const ITEMS_PER_PAGE = 3;

/* ====================================================================== */
/* PROJECTS */
/* ====================================================================== */

export const Projects = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const paginatedProjects = projects.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <Container>
      {/* ====================================================== */}
      {/* SECTION */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden">
        {/* ====================================================== */}
        {/* BACKGROUND */}
        {/* ====================================================== */}

        <div className="absolute inset-0 -z-20 bg-background" />

        <div
          className="
            absolute
            inset-0
            -z-10

            opacity-[0.04]
            dark:opacity-[0.06]

            bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
            bg-size-[60px_60px]
          "
        />

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2

            w-125
            h-125

            rounded-full

            bg-primary/10
            dark:bg-primary/15

            blur-3xl
          "
        />

        {/* ====================================================== */}
        {/* CONTAINER */}
        {/* ====================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            px-4
            sm:px-6
            md:px-10
            lg:px-16
            xl:px-20
          "
        >
          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}

          <div
            className="
              flex
              flex-col
              lg:flex-row

              lg:items-end
              lg:justify-between

              gap-10

              mb-14
              sm:mb-16
            "
          >
            {/* ====================================================== */}
            {/* LEFT */}
            {/* ====================================================== */}

            <div className="max-w-3xl">
              <p
                className="
                  text-primary
                  uppercase
                  tracking-[0.25em]

                  text-[10px]
                  sm:text-xs
                  md:text-sm
                "
              >
                Backend Engineering
              </p>

              <h2
                className="
                  mt-4

                  text-3xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl

                  font-black
                  tracking-[-0.04em]
                  leading-[0.95]

                  text-foreground
                "
              >
                Scalable Systems
                <span
                  className="
                    block

                    bg-linear-to-r
                    from-primary
                    via-primary
                    to-chart-3

                    bg-clip-text
                    text-transparent
                  "
                >
                  & Production APIs
                </span>
              </h2>

              <p
                className="
                  mt-6

                  max-w-2xl

                  text-sm
                  sm:text-base

                  leading-7
                  sm:leading-8

                  text-muted-foreground
                "
              >
                I specialize in building enterprise-grade backend systems with
                authentication, RBAC, WebSockets, caching layers, scalable APIs,
                payment systems, and realtime infrastructure.
              </p>
            </div>

            {/* ====================================================== */}
            {/* RIGHT STATS */}
            {/* ====================================================== */}

            <div
              className="
                grid
                grid-cols-3

                gap-3
                sm:gap-4

                w-full
                lg:w-auto
              "
            >
              {[
                {
                  label: "Projects",
                  value: "12+",
                },

                {
                  label: "APIs",
                  value: "50+",
                },

                {
                  label: "Uptime",
                  value: "99.9%",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-3xl

                    border
                    border-border/70

                    bg-card/70
                    dark:bg-card/50

                    backdrop-blur-xl

                    px-4
                    sm:px-5

                    py-5

                    text-center

                    min-w-22.5
                    sm:min-w-27.5

                    shadow-lg
                    shadow-primary/5

                    transition-all
                    duration-300

                    hover:border-primary/30
                    hover:bg-primary/5
                  "
                >
                  <h3
                    className="
                      text-xl
                      sm:text-2xl

                      font-black

                      text-foreground
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      mt-1

                      text-[10px]
                      sm:text-xs

                      text-muted-foreground
                    "
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ====================================================== */}
          {/* PROJECT GRID */}
          {/* ====================================================== */}

          <div className="relative min-h-175">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  xl:grid-cols-3

                  gap-6
                  lg:gap-7
                "
              >
                {paginatedProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -10,
                    }}
                    className="group"
                  >
                    {/* ====================================================== */}
                    {/* CARD */}
                    {/* ====================================================== */}

                    <div
                      className="
                        relative

                        flex
                        flex-col

                        h-full
                        min-h-155

                        overflow-hidden

                        rounded-4xl

                        border
                        border-border/70

                        bg-card/70
                        dark:bg-card/50

                        backdrop-blur-2xl

                        shadow-xl
                        shadow-primary/5

                        transition-all
                        duration-500

                        hover:border-primary/30
                        hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]
                      "
                    >
                      {/* ====================================================== */}
                      {/* GRID */}
                      {/* ====================================================== */}

                      <div
                        className="
                          absolute
                          inset-0

                          opacity-[0.03]
                          dark:opacity-[0.05]

                          bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
                          bg-size-[40px_40px]
                        "
                      />

                      {/* ====================================================== */}
                      {/* GLOW */}
                      {/* ====================================================== */}

                      <div
                        className="
                          absolute
                          top-0
                          right-0

                          w-56
                          h-56

                          rounded-full

                          bg-primary/10
                          dark:bg-primary/15

                          blur-[120px]

                          opacity-0
                          group-hover:opacity-100

                          transition-all
                          duration-700
                        "
                      />

                      {/* ====================================================== */}
                      {/* CONTENT */}
                      {/* ====================================================== */}

                      <div
                        className="
                          relative
                          z-10

                          flex
                          flex-col

                          h-full

                          p-5
                          sm:p-7
                        "
                      >
                        {/* ====================================================== */}
                        {/* BADGE */}
                        {/* ====================================================== */}

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2

                            w-fit

                            rounded-full

                            border
                            border-primary/20

                            bg-primary/10

                            px-3
                            py-1.5

                            text-[10px]
                            sm:text-[11px]

                            uppercase
                            tracking-[0.2em]

                            text-primary
                          "
                        >
                          Backend System
                        </div>

                        {/* ====================================================== */}
                        {/* TITLE */}
                        {/* ====================================================== */}

                        <h3
                          className="
                            mt-5

                            text-2xl
                            sm:text-3xl

                            font-black

                            tracking-[-0.03em]
                            leading-tight

                            text-foreground
                          "
                        >
                          {project.title}
                        </h3>

                        {/* ====================================================== */}
                        {/* DESCRIPTION */}
                        {/* ====================================================== */}

                        <p
                          className="
                            mt-4

                            text-sm
                            sm:text-base

                            leading-7

                            text-muted-foreground
                          "
                        >
                          {project.description}
                        </p>

                        {/* ====================================================== */}
                        {/* TECH STACK */}
                        {/* ====================================================== */}

                        <div
                          className="
                            flex
                            flex-wrap

                            gap-3

                            mt-8
                          "
                        >
                          {project.tech.map((tech, idx) => {
                            const Icon = tech.icon;

                            return (
                              <motion.div
                                key={idx}
                                whileHover={{
                                  scale: 1.05,
                                }}
                                className="
                                  flex
                                  items-center
                                  gap-2

                                  rounded-2xl

                                  border
                                  border-border/70

                                  bg-background/70
                                  dark:bg-background/40

                                  px-3
                                  py-2

                                  text-sm

                                  backdrop-blur-xl

                                  transition-all
                                  duration-300

                                  hover:border-primary/30
                                  hover:bg-primary/10
                                "
                              >
                                <div
                                  className="
                                    flex
                                    items-center
                                    justify-center

                                    size-8

                                    rounded-xl

                                    bg-primary/10
                                    text-primary
                                  "
                                >
                                  <Icon className="size-4" />
                                </div>

                                <span className="font-medium text-foreground">
                                  {tech.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* ====================================================== */}
                        {/* FEATURES */}
                        {/* ====================================================== */}

                        <div className="space-y-3 mt-8">
                          {project.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="
                                flex
                                items-center
                                gap-3

                                rounded-2xl

                                border
                                border-border/50

                                bg-background/50
                                dark:bg-background/30

                                px-4
                                py-3

                                transition-all
                                duration-300

                                hover:border-primary/20
                              "
                            >
                              <div
                                className="
                                  size-2

                                  rounded-full

                                  bg-primary

                                  shadow-[0_0_20px_rgba(139,92,246,0.9)]
                                "
                              />

                              <span
                                className="
                                  text-sm

                                  text-muted-foreground
                                "
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* ====================================================== */}
                        {/* BUTTONS */}
                        {/* ====================================================== */}

                        <div className="mt-auto pt-8">
                          <div className="flex gap-3">
                            <Button
                              className="
                                flex-1
                                h-11
                                sm:h-12

                                rounded-2xl

                                text-sm

                                shadow-lg
                                shadow-primary/20
                              "
                            >
                              Live API
                              <HiArrowRight className="ml-2 size-4" />
                            </Button>

                            <Button
                              variant="outline"
                              className="
                                h-11
                                sm:h-12

                                aspect-square

                                rounded-2xl

                                border-border/70

                                bg-background/70
                                dark:bg-background/40

                                backdrop-blur-xl

                                hover:border-primary/30
                                hover:bg-primary/10
                              "
                            >
                              <FaGithub className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* ====================================================== */}
                      {/* HOVER BORDER */}
                      {/* ====================================================== */}

                      <div
                        className="
                          absolute
                          inset-0

                          rounded-4xl

                          border
                          border-primary/0

                          group-hover:border-primary/20

                          transition-all
                          duration-500
                        "
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ====================================================== */}
          {/* PAGINATION */}
          {/* ====================================================== */}

          <div className="flex items-center justify-center gap-3 mt-14">
            {Array.from({
              length: totalPages,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`
                  h-3
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    page === idx
                      ? "w-10 bg-primary shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                      : "w-3 bg-border hover:bg-primary/40"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};
