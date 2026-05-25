"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineMail, HiSparkles } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { ModeToggle } from "../common/theme-button";

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
    <section
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-background

        flex
        items-center
        justify-center
      "
    >
      {/* ====================================================== */}
      {/* GRID */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          inset-0

          opacity-90

          bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]

          bg-size-[64px_64px]
        "
      />

      {/* ====================================================== */}
      {/* AURORA */}
      {/* ====================================================== */}

      <div
        className="
          absolute

          top-[-15%]
          left-[-10%]

          w-125
          h-125

          rounded-full

          bg-primary/20

          blur-[140px]
        "
      />

      <div
        className="
          absolute

          bottom-[-20%]
          right-[-10%]

          w-125
          h-125

          rounded-full

          bg-chart-3/20

          blur-[140px]
        "
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          w-87.5
          h-87.5

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-chart-2/10

          blur-[120px]
        "
      />

      {/* ====================================================== */}
      {/* NOISE OVERLAY */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-background/80

          backdrop-blur-[2px]
        "
      />

      {/* ====================================================== */}
      {/* THEME TOGGLE */}
      {/* ====================================================== */}

      <div
        className="
          absolute

          top-5
          right-5

          z-50
        "
      >
        <div
          className="
            flex
            items-center
            justify-center

            rounded-2xl

            border
            border-border/60

            bg-card/70

            backdrop-blur-xl

            shadow-xl

            p-1.5
          "
        >
          <ModeToggle />
        </div>
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-10

          w-full
          max-w-7xl

          mx-auto

          px-6
          sm:px-10
          lg:px-20

          py-24
        "
      >
        <div
          className="
            flex
            flex-col

            items-center
            justify-center

            text-center
          "
        >
          {/* ====================================================== */}
          {/* BADGE */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-8"
          >
            <div
              className="
                group

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-primary/20

                bg-card/60

                backdrop-blur-xl

                px-5
                py-2.5

                shadow-lg

                transition-all
                duration-300

                hover:border-primary/40
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center

                  w-6
                  h-6

                  rounded-full

                  bg-primary/15

                  text-primary
                "
              >
                <HiSparkles className="size-3.5" />
              </div>

              <span
                className="
                  text-sm
                  font-medium

                  text-foreground
                "
              >
                Available for Freelance & Full-Time Work
              </span>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* PROFILE IMAGE */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative

              mb-10
            "
          >
            {/* OUTER GLOW */}

            <div
              className="
                absolute
                inset-0

                scale-125

                rounded-full

                bg-primary/25

                blur-3xl
              "
            />

            {/* ROTATING BORDER */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -inset-1

                rounded-full

                bg-conic
                from-primary
                via-chart-2
                to-chart-3
              "
            />

            {/* IMAGE WRAPPER */}

            <div
              className="
                relative

                rounded-full

                p-1

                bg-background
              "
            >
              <Image
                src="/profile.jpeg"
                alt="Payal Yadav"
                width={240}
                height={240}
                priority
                className="
                  relative
                  z-10

                  rounded-full

                  object-cover

                  border-[6px]
                  border-card

                  bg-card

                  shadow-2xl

                  w-32
                  h-32

                  sm:w-40
                  sm:h-40

                  md:w-48
                  md:h-48

                  lg:w-56
                  lg:h-56
                "
              />
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* NAME */}
          {/* ====================================================== */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
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
              lg:text-8xl

              font-black

              tracking-[-0.07em]

              leading-[0.92]

              max-w-5xl

              bg-linear-to-r
              from-foreground
              via-primary
              to-chart-3

              bg-clip-text
              text-transparent
            "
          >
            Payal Yadav
          </motion.h1>

          {/* ====================================================== */}
          {/* ROLE */}
          {/* ====================================================== */}

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

              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl

              font-medium

              text-muted-foreground
            "
          >
            Backend Engineer • MERN Stack Developer • System Design
          </motion.p>

          {/* ====================================================== */}
          {/* DESCRIPTION */}
          {/* ====================================================== */}

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
              md:text-lg

              leading-8

              text-muted-foreground
            "
          >
            I build scalable backend systems, enterprise-grade APIs, and
            high-performance full-stack applications with a strong focus on
            clean architecture, security, scalability, and production-ready
            engineering.
          </motion.p>

          {/* ====================================================== */}
          {/* CTA */}
          {/* ====================================================== */}

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
              mt-12

              flex
              flex-col
              sm:flex-row

              items-center
              justify-center

              gap-5
            "
          >
            {/* PRIMARY */}

            <Button
              className="
                group

                relative

                h-14

                min-w-52

                rounded-2xl

                px-8

                text-base
                font-semibold

                overflow-hidden

                shadow-2xl
                shadow-primary/20

                transition-all
                duration-300

                hover:scale-[1.03]
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  bg-linear-to-r
                  from-primary
                  via-chart-3
                  to-chart-2
                "
              />

              <a
                href="/pdf/PAYAL_YADAV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative
                  z-10

                  flex
                  items-center
                "
              >
                View Resume
                <HiArrowRight
                  className="
                    ml-2
                    size-5

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </a>
            </Button>

            {/* SECONDARY */}

            <Button
              variant="outline"
              className="
                group

                h-14

                min-w-52

                rounded-2xl

                border-border/60

                bg-card/50

                backdrop-blur-xl

                text-base
                font-semibold

                shadow-lg

                transition-all
                duration-300

                hover:border-primary/40
                hover:bg-accent/50
                hover:scale-[1.03]
              "
            >
              <a
                href="mailto:payal@example.com"
                className="
                  flex
                  items-center
                "
              >
                <HiOutlineMail
                  className="
                    mr-2
                    size-5

                    transition-transform
                    duration-300

                    group-hover:rotate-12
                  "
                />
                Contact Me
              </a>
            </Button>
          </motion.div>

          {/* ====================================================== */}
          {/* SOCIALS */}
          {/* ====================================================== */}

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
            className="
              flex
              items-center
              justify-center
              flex-wrap

              gap-5

              mt-14
            "
          >
            {socials.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="
                    group

                    relative

                    flex
                    items-center
                    justify-center

                    w-14
                    h-14

                    rounded-2xl

                    border
                    border-border/60

                    bg-card/50

                    backdrop-blur-xl

                    text-muted-foreground

                    shadow-lg

                    overflow-hidden

                    transition-all
                    duration-300

                    hover:border-primary/40
                    hover:text-primary
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0

                      opacity-0

                      bg-primary/10

                      transition-opacity
                      duration-300

                      group-hover:opacity-100
                    "
                  />

                  <Icon
                    className="
                      relative
                      z-10

                      w-5
                      h-5
                    "
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
