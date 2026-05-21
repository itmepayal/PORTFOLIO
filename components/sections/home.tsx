"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { ModeToggle } from "../common/theme-button";

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
      {/* GRID BACKGROUND */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.35]

          bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]

          bg-size-[60px_60px]

          sm:bg-size-[72px_72px]
        "
      />

      {/* ====================================================== */}
      {/* GLOW */}
      {/* ====================================================== */}

      <div
        className="
          absolute

          top-[-10%]
          left-1/2
          -translate-x-1/2

          w-[320px]
          h-80

          sm:w-125
          sm:h-125

          rounded-full

          bg-primary/20

          blur-3xl
        "
      />

      {/* ====================================================== */}
      {/* OVERLAY */}
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

          sm:top-7
          sm:right-7

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

            shadow-lg

            p-1.5

            transition-all
            duration-300

            hover:border-primary/40
            hover:shadow-primary/10
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

          px-5
          sm:px-8
          md:px-12
          lg:px-20

          py-16
          sm:py-24
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
          {/* PROFILE */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative mb-8 sm:mb-10"
          >
            <div
              className="
                absolute
                inset-0

                rounded-full

                bg-primary/30

                blur-3xl

                scale-125
              "
            />

            <div
              className="
                relative

                rounded-full

                p-0.75

                bg-linear-to-br
                from-primary
                via-chart-3/50
                to-chart-2
              "
            >
              <Image
                src="/profile.jpeg"
                alt="Payal Yadav"
                width={220}
                height={220}
                priority
                className="
                  rounded-full
                  object-cover

                  border
                  border-border

                  bg-card

                  w-28
                  h-28

                  xs:w-32
                  xs:h-32

                  sm:w-40
                  sm:h-40

                  md:w-44
                  md:h-44

                  lg:w-48
                  lg:h-48
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
              xs:text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl

              font-black

              tracking-[-0.06em]

              leading-[0.95]

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
              mt-5
              sm:mt-6

              text-sm
              xs:text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl

              text-muted-foreground

              font-medium

              max-w-3xl

              leading-relaxed
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
              mt-6
              sm:mt-8

              max-w-xs
              xs:max-w-md
              sm:max-w-2xl
              lg:max-w-3xl

              text-sm
              sm:text-base
              md:text-lg

              leading-7
              sm:leading-8

              text-muted-foreground
            "
          >
            I build scalable backend systems, enterprise-grade APIs, and
            high-performance full-stack applications with a strong focus on
            system design, clean architecture, scalability, security, and
            production-ready engineering.
          </motion.p>

          {/* ====================================================== */}
          {/* BUTTONS */}
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
              mt-10
              sm:mt-12

              flex
              flex-col
              sm:flex-row

              items-center
              justify-center

              gap-4
              sm:gap-5

              w-full
            "
          >
            {/* ====================================================== */}
            {/* RESUME BUTTON */}
            {/* ====================================================== */}

            <Button
              className="
                group

                h-12
                sm:h-14

                w-full
                sm:w-auto

                min-w-48

                rounded-2xl

                text-sm
                sm:text-base

                font-medium

                bg-primary
                text-primary-foreground

                shadow-lg
                shadow-primary/20

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-xl
                hover:shadow-primary/30
              "
            >
              <a
                href="/pdf/PAYAL_YADAV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Resume
                <HiArrowRight
                  className="
                    ml-2

                    size-4

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </a>
            </Button>

            {/* ====================================================== */}
            {/* CONTACT BUTTON */}
            {/* ====================================================== */}

            <Button
              variant="outline"
              className="
                group

                h-12
                sm:h-14

                w-full
                sm:w-auto

                min-w-48

                rounded-2xl

                text-sm
                sm:text-base

                font-medium

                border-border

                bg-card/60

                backdrop-blur-xl

                transition-all
                duration-300

                hover:bg-accent
                hover:text-accent-foreground
                hover:border-primary/30
                hover:scale-105
              "
            >
              <a href="tel:+7228832443" className="flex items-center">
                <HiOutlineMail
                  className="
                    mr-2

                    size-4

                    transition-transform
                    duration-300

                    group-hover:rotate-6
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

              gap-4
              sm:gap-5

              mt-10
              sm:mt-14
            "
          >
            {[
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
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    flex
                    items-center
                    justify-center

                    w-11
                    h-11

                    sm:w-12
                    sm:h-12

                    rounded-2xl

                    border
                    border-border

                    bg-card/60

                    backdrop-blur-xl

                    text-muted-foreground

                    transition-all
                    duration-300

                    hover:text-primary
                    hover:border-primary/40
                    hover:bg-accent
                    hover:scale-110
                  "
                >
                  <Icon
                    className="
                      w-5
                      h-5
                    "
                  />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
