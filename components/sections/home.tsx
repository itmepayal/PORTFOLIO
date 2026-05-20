"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { HiArrowRight, HiOutlineMail } from "react-icons/hi";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";

import {
  Sparkles,
  Mail,
  Clock,
  Send,
  BriefcaseBusiness,
  FolderKanban,
} from "lucide-react";

import { SiNextdotjs, SiMongodb, SiPostgresql } from "react-icons/si";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { SKILLS } from "@/constants/skills";

/* ====================================================================== */
/* EXPERIENCE */
/* ====================================================================== */

const experiences = [
  {
    role: "Backend API Engineer",
    company: "Lanway Website",
    duration: "2026 - Present",

    logo: "/logos/nodejs.png",

    type: "Comapny Project",

    description:
      "Developed scalable backend APIs and enterprise-level architecture for a modern business platform focused on performance, security, and real-time systems.",

    tech: ["Node.js", "Express.js", "MongoDB", "Redis", "JWT", "Socket.IO"],

    points: [
      "Designed scalable RESTful APIs with modular architecture and clean code practices.",
      "Implemented JWT authentication, RBAC authorization, OTP verification, and session handling.",
      "Integrated Redis caching and rate limiting for performance optimization and security.",
      "Built real-time communication features using WebSockets and Socket.IO.",
      "Created secure payment workflows, audit logs, and activity tracking systems.",
      "Optimized MongoDB queries, indexing, and backend performance for scalability.",
    ],
  },
];

/* ====================================================================== */
/* PROJECTS */
/* ====================================================================== */

const projects = [
  {
    title: "TaskHub Pro",
    subtitle: "Enterprise Project Management Platform",

    description:
      "A production-grade project management backend system with workspaces, teams, RBAC, task management, real-time collaboration, notifications, activity tracking, analytics, and scalable API architecture.",

    image: "/projects/taskhub.png",

    category: "Backend Architecture",

    year: "2026",

    status: "Production Ready",

    metrics: [
      {
        label: "Modules",
        value: "25+",
      },

      {
        label: "APIs",
        value: "120+",
      },

      {
        label: "Uptime",
        value: "99.9%",
      },
    ],

    features: [
      "JWT + Refresh Authentication",
      "Workspace & Team Management",
      "RBAC Permission System",
      "Real-time Notifications",
      "Task Comments & Activities",
      "Redis Caching + Rate Limiting",
    ],

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

    github: "#",
    live: "#",
  },

  {
    title: "Realtime ChatSphere",
    subtitle: "Realtime Messaging & Video Platform",

    description:
      "Advanced real-time chat application supporting instant messaging, WebRTC video calls, typing indicators, online presence, file sharing, notifications, and scalable WebSocket architecture.",

    image: "/projects/chatapp.png",

    category: "Realtime Systems",

    year: "2026",

    status: "Scalable Infrastructure",

    metrics: [
      {
        label: "Sockets",
        value: "10K+",
      },

      {
        label: "Latency",
        value: "<120ms",
      },

      {
        label: "Messages",
        value: "1M+",
      },
    ],

    features: [
      "Socket.IO Architecture",
      "WebRTC Video Calling",
      "Redis Pub/Sub Scaling",
      "Typing Indicators",
      "Unread Message Tracking",
      "Authentication & Presence",
    ],

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

    github: "#",
    live: "#",
  },

  {
    title: "BABY MART",
    subtitle: "Full Stack E-Commerce Platform",

    description:
      "A scalable e-commerce platform with authentication, product management, cart system, payments, order tracking, inventory management, coupon engine, and admin analytics dashboard.",

    image: "/projects/ecommerce.png",

    category: "Full Stack Platform",

    year: "2026",

    status: "Enterprise Commerce",

    metrics: [
      {
        label: "Products",
        value: "50K+",
      },

      {
        label: "Orders",
        value: "100K+",
      },

      {
        label: "Performance",
        value: "98%",
      },
    ],

    features: [
      "Advanced Authentication",
      "Cart & Checkout System",
      "Stripe Payment Integration",
      "Admin Dashboard",
      "Coupon & Offer Engine",
      "Order & Inventory Tracking",
    ],

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

    github: "#",
    live: "#",
  },
];

/* ====================================================================== */
/* DSA */
/* ====================================================================== */

const dsaCards = [
  {
    title: "366+",
    subtitle: "Problems Solved",
    desc: "Consistent DSA practice across multiple patterns and concepts.",
    progress: "88%",
  },

  {
    title: "111+",
    subtitle: "LeetCode Problems",
    desc: "Focused on interview-oriented backend problem solving.",
    progress: "72%",
  },

  {
    title: "255+",
    subtitle: "Striver A2Z Sheet",
    desc: "Completed structured roadmap covering major DSA topics.",
    progress: "92%",
  },
];

export const Home = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* ================================================================ */}
      {/* BACKGROUND */}
      {/* ================================================================ */}

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] bg-size-[72px_72px]" />

      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-175 h-175 bg-primary/10 rounded-full blur-3xl" />

      <div className="absolute inset-0 bg-black/10" />

      {/* ================================================================ */}
      {/* CONTENT */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-auto px-6 md:px-12 xl:px-52 py-20">
        {/* ================================================================ */}
        {/* HERO */}
        {/* ================================================================ */}

        <div className="flex flex-col items-center text-center">
          {/* PROFILE */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative mb-10"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125" />

            <div
              className="
                relative
                rounded-full
                p-0.75
                bg-linear-to-br
                from-primary/40
                via-transparent
                to-violet-500/40
              "
            >
              <Image
                src="/profile.jpeg"
                alt="Payal Yadav"
                width={160}
                height={160}
                priority
                className="
                  rounded-full
                  object-cover
                  w-40
                  h-40
                  border
                  border-white/10
                "
              />
            </div>
          </motion.div>

          {/* NAME */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-black
              tracking-[-0.06em]
              leading-[0.9]
            "
          >
            Payal Yadav
          </motion.h1>

          {/* ROLE */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              mt-6
              text-lg
              sm:text-2xl
              text-muted-foreground
              font-light
            "
          >
            Backend & Full Stack Engineer
          </motion.p>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              mt-8
              max-w-3xl
              text-sm
              sm:text-base
              leading-[1.9]
              text-muted-foreground
            "
          >
            I build scalable backend systems, enterprise-grade APIs, and modern
            full-stack applications focused on clean architecture, performance,
            and production-ready engineering.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              gap-5
              mt-12
            "
          >
            <Button
              className="
                h-14
                px-8
                rounded-2xl
                text-sm
                font-medium
                shadow-lg
                shadow-primary/20
              "
            >
              Resume
              <HiArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              variant="outline"
              className="
                h-14
                px-8
                rounded-2xl
                text-sm
                font-medium
                backdrop-blur-xl
              "
            >
              <HiOutlineMail className="mr-2 size-4" />
              Connect me
            </Button>
          </motion.div>

          {/* SOCIALS */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            className="flex items-center gap-7 mt-14"
          >
            {[
              {
                icon: FaXTwitter,
                href: "#",
              },

              {
                icon: FaGithub,
                href: "#",
              },

              {
                icon: FaLinkedin,
                href: "#",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <a
                  key={i}
                  href={item.href}
                  className="
                    text-foreground/60
                    hover:text-primary
                    transition-all
                    hover:scale-110
                  "
                >
                  <Icon size={26} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* ================================================================ */}
        {/* SKILLS */}
        {/* ================================================================ */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="relative mt-28 overflow-hidden"
        >
          {/* TITLE */}

          <div className="text-center mb-10">
            <p className="text-primary uppercase tracking-[0.25em] text-sm">
              Tech Stack
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Skills & Technologies
            </h2>
          </div>

          {/* FADES */}

          <div className="absolute left-0 top-0 w-40 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

          <div className="absolute right-0 top-0 w-40 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* SLIDER */}

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-5 min-w-max"
          >
            {[...SKILLS, ...SKILLS].map((skill, i) => {
              const Icon = skill.icon;

              return (
                <div
                  key={i}
                  className="
                    flex
                    items-center
                    gap-4
                    px-6
                    py-4
                    rounded-2xl
                    border
                    border-border
                    bg-background/60
                    backdrop-blur-xl
                    min-w-67.5
                    hover:border-primary/40
                    hover:bg-primary/5
                    transition-all
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      rounded-xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Icon size={24} />
                  </div>

                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Technology</p>

                    <h3 className="font-semibold">{skill.title}</h3>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ================================================================ */}
        {/* DSA */}
        {/* ================================================================ */}

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
          className="mt-32"
        >
          {/* TITLE */}

          <div className="text-center mb-14">
            <p className="text-primary uppercase tracking-[0.25em] text-sm">
              Data Structures & Algorithms
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Problem Solving Journey
            </h2>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dsaCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.2,
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-border
                  bg-background/60
                  backdrop-blur-xl
                  p-8
                  hover:border-primary/30
                  transition-all
                "
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.25em] text-primary">
                    DSA
                  </p>

                  <h2 className="mt-5 text-5xl font-black tracking-tight">
                    {item.title}
                  </h2>

                  <h3 className="mt-4 text-xl font-semibold">
                    {item.subtitle}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>

                  {/* PROGRESS */}

                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        Progress
                      </span>

                      <span className="text-xs font-medium text-primary">
                        {item.progress}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: item.progress,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.2,
                        }}
                        className="
                          h-full
                          rounded-full
                          bg-linear-to-r
                          from-primary
                          to-violet-500
                        "
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================================================================ */}
        {/* EXPERIENCE */}
        {/* ================================================================ */}

        <section className="mt-32">
          {/* TITLE */}

          <div className="mb-16">
            <p className="text-primary uppercase tracking-[0.25em] text-sm">
              Experience
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Professional Journey
            </h2>
          </div>

          {/* EXPERIENCE LIST */}

          <div className="space-y-8">
            {experiences.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.15,
                }}
                className="
                  grid
                  md:grid-cols-[180px_1fr]
                  gap-6
                  items-start
                "
              >
                {/* LEFT */}

                <div className="hidden md:flex items-center gap-2 text-muted-foreground pt-4">
                  <BriefcaseBusiness className="size-5 text-primary" />

                  <span className="font-medium">Experience</span>
                </div>

                {/* RIGHT CARD */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-border
                    bg-background/60
                    backdrop-blur-xl
                    p-8
                    hover:border-primary/30
                    transition-all
                  "
                >
                  {/* TOP */}

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    {/* LEFT */}

                    <div className="flex items-start gap-4">
                      {/* LOGO */}

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          border
                          border-border
                          bg-background/70
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                          shrink-0
                        "
                      >
                        <Image
                          src={item.logo}
                          alt={item.company}
                          width={34}
                          height={34}
                          className="object-contain"
                        />
                      </div>

                      {/* TEXT */}

                      <div>
                        <h3 className="text-2xl font-bold">{item.role}</h3>

                        <p className="text-muted-foreground mt-1">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* DURATION */}

                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.duration}
                    </span>
                  </div>

                  {/* POINTS */}

                  <ul className="mt-8 space-y-4">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="
                          flex
                          gap-3
                          text-sm
                          leading-relaxed
                          text-muted-foreground
                        "
                      >
                        <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />

                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* PROJECTS */}
        {/* ================================================================ */}

        {/* ================================================================ */}
        {/* PROJECTS SECTION */}
        {/* ================================================================ */}

        <section className="relative mt-36">
          {/* BACKGROUND */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 blur-[140px] rounded-full" />

            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 blur-[140px] rounded-full" />
          </div>

          {/* HEADER */}

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <p className="text-primary uppercase tracking-[0.28em] text-sm">
                Backend Engineering
              </p>

              <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.04em] leading-none">
                Scalable Systems
                <br />& Production APIs
              </h2>

              <p className="mt-6 max-w-2xl text-muted-foreground leading-[1.9] text-sm sm:text-base">
                I specialize in building enterprise-grade backend systems with
                authentication, RBAC, WebSockets, caching layers, scalable APIs,
                payment systems, and real-time infrastructure.
              </p>
            </div>

            {/* SMALL STATS */}

            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
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
                <div
                  key={i}
                  className="
            rounded-2xl
            border
            border-white/10
            bg-background/40
            backdrop-blur-xl
            px-5
            py-5
            text-center
            min-w-[110px]
          "
                >
                  <h3 className="text-2xl font-black">{item.value}</h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT GRID */}

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative"
              >
                {/* CARD */}

                <div
                  className="
            relative
            overflow-hidden
            rounded-[34px]
            border
            border-white/10
            bg-background/60
            backdrop-blur-2xl
            h-full
            flex
            flex-col
            transition-all
            duration-500
            hover:border-primary/30
            hover:shadow-[0_0_80px_rgba(120,119,255,0.12)]
          "
                >
                  {/* TOP BAR */}

                  <div
                    className="
              relative
              overflow-hidden
              border-b
              border-white/5
              p-6
            "
                  >
                    {/* GLOW */}

                    <div
                      className="
                absolute
                top-0
                right-0
                w-52
                h-52
                bg-primary/10
                rounded-full
                blur-[120px]
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-700
              "
                    />

                    {/* HEADER */}

                    <div className="relative z-10 flex items-start justify-between gap-5">
                      {/* LEFT */}

                      <div>
                        <div
                          className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    px-3
                    py-1.5
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    text-primary
                  "
                        >
                          Backend System
                        </div>

                        <h3
                          className="
                    mt-5
                    text-2xl
                    font-black
                    leading-tight
                    tracking-[-0.03em]
                  "
                        >
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* YEAR */}

                      <div
                        className="
                  hidden
                  md:flex
                  items-center
                  justify-center
                  size-14
                  rounded-2xl
                  border
                  border-white/10
                  bg-background/60
                  shrink-0
                "
                      >
                        <span className="text-xs font-semibold text-muted-foreground">
                          2026
                        </span>
                      </div>
                    </div>

                    {/* TECH */}

                    <div className="relative z-10 flex flex-wrap gap-3 mt-8">
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
                      px-4
                      py-2.5
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
                  </div>

                  {/* MIDDLE */}

                  <div className="p-6 flex-1 flex flex-col">
                    {/* FEATURES */}

                    <div className="space-y-4">
                      {[
                        "Authentication & RBAC",
                        "Redis Caching & Queues",
                        "WebSockets & Realtime",
                        "Production API Architecture",
                      ].map((feature, idx) => (
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
                    py-4
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

                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* STATS */}

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        {
                          label: "Requests",
                          value: "1M+",
                        },

                        {
                          label: "Latency",
                          value: "80ms",
                        },

                        {
                          label: "Security",
                          value: "A+",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-background/40
                    py-5
                    text-center
                  "
                        >
                          <h4 className="text-lg font-black">{item.value}</h4>

                          <p className="mt-1 text-[11px] text-muted-foreground uppercase tracking-[0.15em]">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* BUTTONS */}

                    <div className="flex items-center gap-4 mt-auto pt-8">
                      <Button
                        className="
                  flex-1
                  h-12
                  rounded-2xl
                  shadow-lg
                  shadow-primary/20
                  text-sm
                "
                      >
                        Live API
                        <HiArrowRight className="ml-2 size-4" />
                      </Button>

                      <Button
                        variant="outline"
                        className="
                  flex-1
                  h-12
                  rounded-2xl
                  border-white/10
                  bg-background/40
                  backdrop-blur-xl
                  text-sm
                "
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>

                  {/* HOVER BORDER */}

                  <div
                    className="
              absolute
              inset-0
              rounded-[34px]
              border
              border-primary/0
              group-hover:border-primary/20
              transition-all
              duration-500
              pointer-events-none
            "
                  />

                  {/* BOTTOM LIGHT */}

                  <div
                    className="
              absolute
              bottom-0
              left-0
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-primary/60
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-all
            "
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* CONTACT */}
        {/* ================================================================ */}

        <div className="grid lg:grid-cols-2 gap-10 items-center mt-32">
          {/* LEFT */}

          <div className="space-y-6 text-center lg:text-left">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  bg-background/50
                  backdrop-blur
                  text-xs
                "
              >
                <Sparkles className="size-4 text-primary" />
                Let’s Connect
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Have an idea?
              <br />
              <span className="bg-linear-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let’s build it.
              </span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0">
              I help turn ideas into scalable products. Whether it's a startup,
              feature, or system design — I’m open to collaborating.
            </p>

            {/* EMAIL CARD */}

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="
                flex
                items-center
                gap-4
                p-5
                rounded-2xl
                border
                bg-background/50
                backdrop-blur
              "
            >
              <div className="p-3 rounded-xl bg-primary/10">
                <Mail className="size-5 text-primary" />
              </div>

              <div className="text-left">
                <p className="text-xs text-muted-foreground">Email me</p>

                <p className="text-sm font-medium break-all">
                  itme.payalyadav@gmail.com
                </p>
              </div>
            </motion.div>

            <p className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              Usually replies within a few hours
            </p>
          </div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-pink-400/10 blur-2xl opacity-40 rounded-2xl" />

            <Card className="relative rounded-3xl border bg-background/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">Send a message</h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    I typically respond within a few hours
                  </p>
                </div>

                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label>Name</Label>

                    <Input placeholder="Your name" className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>

                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Message</Label>

                    <textarea
                      rows={5}
                      placeholder="Tell me about your idea..."
                      className="
                        w-full
                        rounded-xl
                        border
                        bg-background/50
                        px-4
                        py-3
                        text-sm
                        outline-none
                        resize-none
                        focus:ring-1
                        focus:ring-primary
                      "
                    />
                  </div>

                  <Button className="w-full h-12 rounded-xl group">
                    Send Message
                    <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
