"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../common/container";
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
/* EXPERIENCE COMPONENT */
/* ====================================================================== */

export const Experience = () => {
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
            left-1/2
            top-0
            -z-10

            h-80
            w-[320px]

            -translate-x-1/2
            rounded-full

            bg-primary/10
            dark:bg-primary/15

            blur-3xl
          "
        />

        {/* ====================================================== */}
        {/* MAIN CONTAINER */}
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

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            className="
              flex
              flex-col
              gap-10

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* ====================================================== */}
            {/* LEFT CONTENT */}
            {/* ====================================================== */}

            <div className="max-w-3xl">
              <p
                className="
                  text-[10px]
                  sm:text-xs

                  font-semibold
                  uppercase
                  tracking-[0.35em]

                  text-primary
                "
              >
                Professional Experience
              </p>

              <h2
                className="
                  mt-4

                  text-3xl
                  sm:text-4xl
                  lg:text-5xl

                  font-black
                  leading-none
                  tracking-[-0.05em]

                  text-foreground
                "
              >
                Building
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
                  Production Systems
                </span>
              </h2>

              <p
                className="
                  mt-5

                  max-w-2xl

                  text-sm
                  sm:text-base

                  leading-7
                  sm:leading-8

                  text-muted-foreground
                "
              >
                Focused on scalable backend systems, realtime infrastructure,
                secure authentication, caching strategies, and enterprise-grade
                application performance.
              </p>
            </div>

            {/* ====================================================== */}
            {/* EXPERIENCE STATS */}
            {/* ====================================================== */}

            <motion.div
              whileHover={{
                y: -4,
              }}
              className="
                group

                flex
                w-full
                items-center
                gap-4

                rounded-3xl

                border
                border-border/70

                bg-card/70
                dark:bg-card/50

                px-5
                py-5

                backdrop-blur-xl

                shadow-lg
                shadow-primary/5

                transition-all
                duration-300

                hover:border-primary/30
                hover:bg-primary/5

                sm:w-fit
                sm:px-6
              "
            >
              <div
                className="
                  flex
                  size-12

                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary/10
                  text-primary

                  transition-all
                  duration-300

                  group-hover:bg-primary/15
                "
              >
                <BriefcaseBusiness className="size-5" />
              </div>

              <div>
                <h3
                  className="
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  1+
                </h3>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  Years Experience
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ====================================================== */}
          {/* EXPERIENCE LIST */}
          {/* ====================================================== */}

          <div className="relative mt-16 sm:mt-20">
            {/* ====================================================== */}
            {/* TIMELINE LINE */}
            {/* ====================================================== */}

            <div
              className="
                absolute
                left-6
                top-0

                hidden
                h-full
                w-px

                bg-border/80

                md:block
              "
            />

            {/* ====================================================== */}
            {/* EXPERIENCE CARDS */}
            {/* ====================================================== */}

            {experiences.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="
                  relative

                  md:pl-16
                  lg:pl-20
                "
              >
                {/* ====================================================== */}
                {/* TIMELINE ICON */}
                {/* ====================================================== */}

                <div
                  className="
                    absolute
                    left-0
                    top-10

                    hidden

                    size-12
                    lg:size-14

                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-primary/20

                    bg-card
                    dark:bg-card/90

                    shadow-md

                    md:flex
                  "
                >
                  <BriefcaseBusiness className="size-5 text-primary" />
                </div>

                {/* ====================================================== */}
                {/* EXPERIENCE CARD */}
                {/* ====================================================== */}

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden

                    rounded-3xl

                    border
                    border-border/70

                    bg-card/70
                    dark:bg-card/50

                    backdrop-blur-xl

                    shadow-xl
                    shadow-primary/5

                    transition-all
                    duration-500

                    hover:border-primary/30
                    hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]
                  "
                >
                  {/* ====================================================== */}
                  {/* CARD GRID */}
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
                  {/* CARD GLOW */}
                  {/* ====================================================== */}

                  <div
                    className="
                      absolute
                      right-0
                      top-0

                      h-44
                      w-44

                      sm:h-52
                      sm:w-52

                      rounded-full

                      bg-primary/10
                      dark:bg-primary/15

                      blur-3xl

                      opacity-0

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* ====================================================== */}
                  {/* CARD CONTENT */}
                  {/* ====================================================== */}

                  <div className="relative z-10 p-5 sm:p-7 lg:p-10">
                    {/* ====================================================== */}
                    {/* TOP SECTION */}
                    {/* ====================================================== */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-6

                        lg:flex-row
                        lg:items-start
                        lg:justify-between
                      "
                    >
                      {/* ====================================================== */}
                      {/* LEFT INFO */}
                      {/* ====================================================== */}

                      <div className="flex items-start gap-4 sm:gap-5">
                        {/* ====================================================== */}
                        {/* COMPANY LOGO */}
                        {/* ====================================================== */}

                        <div
                          className="
                            flex
                            size-14
                            sm:size-16

                            shrink-0

                            items-center
                            justify-center

                            rounded-2xl

                            border
                            border-border/70

                            bg-background/80
                            dark:bg-background/40

                            shadow-md
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

                        {/* ====================================================== */}
                        {/* ROLE INFO */}
                        {/* ====================================================== */}

                        <div className="min-w-0">
                          {/* ====================================================== */}
                          {/* TYPE BADGE */}
                          {/* ====================================================== */}

                          <div
                            className="
                              inline-flex
                              flex-wrap
                              items-center
                              gap-2

                              rounded-full

                              border
                              border-primary/20

                              bg-primary/10

                              px-3
                              py-2

                              sm:px-4
                            "
                          >
                            <div className="size-2 rounded-full bg-primary" />

                            <span
                              className="
                                text-[10px]
                                sm:text-[11px]

                                font-semibold
                                uppercase
                                tracking-[0.2em]

                                text-primary
                              "
                            >
                              {item.type}
                            </span>
                          </div>

                          {/* ====================================================== */}
                          {/* ROLE TITLE */}
                          {/* ====================================================== */}

                          <h3
                            className="
                              mt-4

                              text-2xl
                              sm:text-3xl

                              font-black
                              tracking-tight

                              text-foreground
                            "
                          >
                            {item.role}
                          </h3>

                          {/* ====================================================== */}
                          {/* COMPANY NAME */}
                          {/* ====================================================== */}

                          <p
                            className="
                              mt-2

                              text-sm
                              sm:text-base

                              text-muted-foreground
                            "
                          >
                            {item.company}
                          </p>
                        </div>
                      </div>

                      {/* ====================================================== */}
                      {/* DURATION */}
                      {/* ====================================================== */}

                      <div
                        className="
                          flex
                          w-fit
                          items-center
                          gap-2

                          rounded-2xl

                          border
                          border-border/70

                          bg-background/70
                          dark:bg-background/40

                          px-4
                          py-3

                          backdrop-blur-xl
                        "
                      >
                        <CalendarDays className="size-4 text-primary" />

                        <span
                          className="
                            text-xs
                            sm:text-sm

                            text-muted-foreground
                          "
                        >
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* ====================================================== */}
                    {/* DESCRIPTION */}
                    {/* ====================================================== */}

                    <p
                      className="
                        mt-7

                        max-w-4xl

                        text-sm
                        sm:text-base

                        leading-7
                        sm:leading-8

                        text-muted-foreground
                      "
                    >
                      {item.description}
                    </p>

                    {/* ====================================================== */}
                    {/* TECH STACK */}
                    {/* ====================================================== */}

                    <div className="mt-8 flex flex-wrap gap-3">
                      {item.tech.map((tech, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{
                            scale: 1.05,
                          }}
                          className="
                            rounded-2xl

                            border
                            border-border/70

                            bg-background/70
                            dark:bg-background/40

                            px-4
                            py-2.5

                            text-xs
                            sm:text-sm

                            text-muted-foreground

                            backdrop-blur-xl

                            transition-all
                            duration-300

                            hover:border-primary/30
                            hover:bg-primary/10
                            hover:text-primary
                          "
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* ====================================================== */}
                  {/* HOVER BORDER */}
                  {/* ====================================================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      rounded-3xl

                      border
                      border-primary/0

                      group-hover:border-primary/15

                      transition-all
                      duration-500
                    "
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};
