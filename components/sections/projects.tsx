"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { FaNodeJs, FaReact, FaGithub } from "react-icons/fa6";
import { SiNextdotjs, SiMongodb, SiPostgresql } from "react-icons/si";
import { Button } from "@/components/ui/button";

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
];

/* ====================================================================== */
/* PROJECTS */
/* ====================================================================== */

export const Projects = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        pt-24
        sm:pt-28
      "
    >
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
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
            blur-3xl
          "
        />
      </div>

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
          {/* LEFT */}

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
                sm:text-4xl
                md:text-5xl
                lg:text-6xl

                font-black
                tracking-[-0.04em]
                leading-[0.95]
              "
            >
              Scalable Systems
              <span
                className="
                  block

                  bg-linear-to-r
                  from-primary
                  to-violet-500

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

          {/* RIGHT STATS */}

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
                  rounded-2xl

                  border
                  border-white/10

                  bg-background/40
                  backdrop-blur-xl

                  px-4
                  sm:px-5

                  py-5

                  text-center

                  min-w-22.5
                  sm:min-w-27.5

                  transition-all
                  duration-300

                  hover:border-primary/30
                "
              >
                <h3
                  className="
                    text-xl
                    sm:text-2xl

                    font-black
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
        {/* SLIDER WRAPPER */}
        {/* ====================================================== */}

        <div className="relative overflow-hidden">
          {/* LEFT FADE */}

          <div
            className="
              absolute
              left-0
              top-0

              z-20

              h-full
              w-14
              sm:w-20
              md:w-28

              bg-linear-to-r
              from-background
              to-transparent
            "
          />

          {/* RIGHT FADE */}

          <div
            className="
              absolute
              right-0
              top-0

              z-20

              h-full
              w-14
              sm:w-20
              md:w-28

              bg-linear-to-l
              from-background
              to-transparent
            "
          />

          {/* ====================================================== */}
          {/* SLIDER */}
          {/* ====================================================== */}

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex
              gap-5
              sm:gap-6

              min-w-max
            "
          >
            {[...projects, ...projects].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -8,
                }}
                className="
                  group

                  flex
                  shrink-0

                  w-75
                  sm:w-90
                  lg:w-105
                "
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
                    border-white/10

                    bg-background/60
                    backdrop-blur-2xl

                    transition-all
                    duration-500

                    hover:border-primary/30
                    hover:shadow-[0_0_80px_rgba(120,119,255,0.12)]
                  "
                >
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
                    {/* BADGE */}

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

                    {/* TITLE */}

                    <h3
                      className="
                        mt-5

                        text-2xl
                        sm:text-3xl

                        font-black

                        tracking-[-0.03em]
                        leading-tight
                      "
                    >
                      {project.title}
                    </h3>

                    {/* DESCRIPTION */}

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

                    {/* TECH STACK */}

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
                              border-white/10

                              bg-background/40

                              px-3
                              py-2

                              text-sm

                              transition-all

                              hover:border-primary/30
                              hover:bg-primary/5
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

                            <span className="font-medium">{tech.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* FEATURES */}

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
                            border-white/5

                            bg-background/30

                            px-4
                            py-3
                          "
                        >
                          <div
                            className="
                              size-2

                              rounded-full

                              bg-primary

                              shadow-[0_0_20px_rgba(120,119,255,1)]
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

                    {/* PUSH BUTTONS TO BOTTOM */}

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

                            border-white/10
                            bg-background/40
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
        </div>
      </div>
    </section>
  );
};
