"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

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
      {/* BACKGROUND */}
      {/* ====================================================== */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.20]
          bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)]
          bg-size-[60px_60px]
          sm:bg-size-[72px_72px]
        "
      />

      <div
        className="
          absolute
          top-[-10%]
          left-1/2
          -translate-x-1/2
          w-75
          h-75
          sm:w-125
          sm:h-125
          bg-primary/10
          rounded-full
          blur-3xl
        "
      />

      <div className="absolute inset-0 bg-background/80" />

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
                bg-primary/20
                blur-3xl
                scale-125
              "
            />

            <div
              className="
                relative
                rounded-full
                p-0.5
                bg-linear-to-br
                from-primary/50
                via-transparent
                to-violet-500/50
              "
            >
              <Image
                src="/profile.jpeg"
                alt="Payal Yadav"
                width={200}
                height={200}
                priority
                className="
                  rounded-full
                  object-cover
                  border
                  border-white/10

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
              text-4xl
              xs:text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl

              font-black
              tracking-[-0.04em]
              leading-[0.95]

              bg-linear-to-r
              from-foreground
              to-foreground/70
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
              capitalize
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
            <Button
              className="
                h-12
                sm:h-14

                w-full
                sm:w-auto

                min-w-45

                rounded-2xl

                text-sm
                sm:text-base

                font-medium

                shadow-lg
                shadow-primary/20

                transition-all
                duration-300
                hover:scale-105
              "
            >
              <a
                href="/pdf/PAYAL_YADAV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Resume
                <HiArrowRight className="ml-2 size-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              className="
                h-12
                sm:h-14

                w-full
                sm:w-auto

                min-w-45

                rounded-2xl

                text-sm
                sm:text-base

                font-medium

                border-white/10
                bg-background/40
                backdrop-blur-xl

                transition-all
                duration-300
                hover:scale-105
              "
            >
              <a href="tel:+7228832443" className="flex items-center">
                <HiOutlineMail className="mr-2 size-4" />
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

                    rounded-xl

                    border
                    border-white/10

                    bg-background/40
                    backdrop-blur-xl

                    text-foreground/60

                    transition-all
                    duration-300

                    hover:text-primary
                    hover:border-primary/40
                    hover:scale-110
                  "
                >
                  <Icon
                    className="
                      w-5
                      h-5

                      sm:w-5.5
                      sm:h-5.5
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
