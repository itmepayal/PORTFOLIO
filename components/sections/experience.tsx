"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays } from "lucide-react";

/* ====================================================================== */
/* EXPERIENCE DATA */
/* ====================================================================== */

const experiences = [
  {
    role: "Backend API Engineer",
    company: "Lanway Website",
    duration: "2026 - Present",
    logo: "/logos/Laneway-Logo.jpg",
    type: "Company Project",
    description:
      "Developed scalable backend APIs and enterprise-level architecture focused on realtime systems, security, scalability, and performance optimization.",
    tech: ["Node.js", "Express.js", "MongoDB", "Redis", "JWT", "Socket.IO"],
  },
];

/* ====================================================================== */
/* COMPONENT */
/* ====================================================================== */

export const Experience = () => {
  return (
    <section
      className="relative
        overflow-hidden
        pt-24
        sm:pt-28"
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-0
            h-80 w-[320px]
            -translate-x-1/2
            rounded-full bg-primary/10
            blur-3xl
            sm:h-105 sm:w-105
            lg:h-130 lg:w-130
          "
        />
      </div>

      {/* CONTAINER */}

      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            flex flex-col gap-10
            lg:flex-row lg:items-end lg:justify-between
          "
        >
          {/* LEFT */}

          <div className="max-w-3xl">
            <p
              className="
                text-[10px] font-semibold uppercase
                tracking-[0.35em] text-primary
                sm:text-xs
              "
            >
              Professional Experience
            </p>

            <h2
              className="
                mt-4 text-4xl font-black leading-none
                tracking-[-0.05em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Building
              <span
                className="
                  block bg-linear-to-r
                  from-primary to-violet-500
                  bg-clip-text text-transparent
                "
              >
                Production Systems
              </span>
            </h2>

            <p
              className="
                mt-5 max-w-2xl
                text-sm leading-7 text-muted-foreground
                sm:text-base sm:leading-8
              "
            >
              Focused on scalable backend systems, realtime infrastructure,
              secure authentication, caching strategies, and enterprise-grade
              application performance.
            </p>
          </div>

          {/* RIGHT */}

          <motion.div
            whileHover={{ y: -4 }}
            className="
              flex w-full items-center gap-4
              rounded-3xl border 
               px-5 py-5
              backdrop-blur-xl
              sm:w-fit sm:px-6
            "
          >
            <div
              className="
                flex size-12 items-center justify-center
                rounded-2xl bg-primary/10 text-primary
              "
            >
              <BriefcaseBusiness className="size-5" />
            </div>

            <div>
              <h3 className="text-2xl font-black">1+</h3>

              <p className="text-xs text-muted-foreground">Years Experience</p>
            </div>
          </motion.div>
        </motion.div>

        {/* EXPERIENCE LIST */}

        <div className="relative mt-16 sm:mt-20">
          {/* TIMELINE */}

          <div
            className="
              absolute left-6 top-0 hidden h-full
              w-px bg-border md:block
            "
          />

          {experiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              className="relative md:pl-16 lg:pl-20"
            >
              {/* TIMELINE ICON */}

              <div
                className="
                  absolute left-0 top-10 hidden
                  size-12 items-center justify-center
                  rounded-2xl border border-primary/20
                  bg-background md:flex lg:size-14
                "
              >
                <BriefcaseBusiness className="size-5 text-primary" />
              </div>

              {/* CARD */}

              <motion.div
                whileHover={{ y: -5 }}
                className="
                  group relative overflow-hidden
                  rounded-3xl border
                  bg-background/40
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:border-primary/30
                  hover:shadow-[0_10px_50px_rgba(120,119,255,0.15)]
                "
              >
                {/* GLOW */}

                <div
                  className="
                    absolute right-0 top-0
                    h-44 w-44 rounded-full
                    bg-primary/10 blur-3xl
                    opacity-0 transition-opacity duration-500
                    group-hover:opacity-100
                    sm:h-52 sm:w-52
                  "
                />

                {/* CONTENT */}

                <div className="relative z-10 p-5 sm:p-7 lg:p-10">
                  {/* TOP */}

                  <div
                    className="
                      flex flex-col gap-6
                      lg:flex-row lg:items-start
                      lg:justify-between
                    "
                  >
                    {/* LEFT */}

                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* LOGO */}

                      <div
                        className="
                          flex size-14 shrink-0
                          items-center justify-center
                          rounded-2xl border border-white/10
                          bg-background/60
                          sm:size-16
                        "
                      >
                        <Image
                          src={item.logo}
                          alt={item.company}
                          width={38}
                          height={38}
                          className="object-contain"
                        />
                      </div>

                      {/* INFO */}

                      <div className="min-w-0">
                        {/* TYPE */}

                        <div
                          className="
                            inline-flex flex-wrap items-center
                            gap-2 rounded-full
                            border border-primary/20
                            bg-primary/10
                            px-3 py-2 sm:px-4
                          "
                        >
                          <div className="size-2 rounded-full bg-primary" />

                          <span
                            className="
                              text-[10px] font-semibold uppercase
                              tracking-[0.2em] text-primary
                              sm:text-[11px]
                            "
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* ROLE */}

                        <h3
                          className="
                            mt-4 text-2xl font-black
                            tracking-tight
                            wrap-break-word
                            sm:text-3xl
                          "
                        >
                          {item.role}
                        </h3>

                        {/* COMPANY */}

                        <p
                          className="
                            mt-2 text-sm
                            text-muted-foreground
                            sm:text-base
                          "
                        >
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* DURATION */}

                    <div
                      className="
                        flex w-fit items-center gap-2
                        rounded-2xl border border-white/10
                        bg-background/40
                        px-4 py-3
                      "
                    >
                      <CalendarDays className="size-4 text-primary" />

                      <span
                        className="
                          text-xs text-muted-foreground
                          sm:text-sm
                        "
                      >
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-7 max-w-4xl
                      text-sm leading-7
                      text-muted-foreground
                      sm:text-base sm:leading-8
                    "
                  >
                    {item.description}
                  </p>

                  {/* TECH STACK */}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {item.tech.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="
                          rounded-2xl border border-white/10
                          bg-background/40
                          px-4 py-2.5
                          text-xs text-muted-foreground
                          transition-all duration-300
                          hover:border-primary/30
                          hover:bg-primary/5
                          sm:text-sm
                        "
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
