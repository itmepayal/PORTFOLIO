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

export const Footer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      link: "mailto:yourmail@gmail.com",
    },
  ];

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  /* ====================================================== */
  /* CURSOR LIGHT */
  /* ====================================================== */

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
    <footer
      className="
        relative
        overflow-hidden

        border-t
        border-border

        mt-16
        sm:mt-20
      "
    >
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
            rgba(99,102,241,0.12),
            transparent 80%
          )`,
        }}
      />

      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================================== */}

      <div className="absolute inset-0 -z-20">
        <div
          className="
            absolute
            left-1/2
            top-0

            h-64
            w-125

            sm:h-80
            sm:w-175

            -translate-x-1/2

            bg-primary/10
            blur-[120px]
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
          w-full

          px-4
          sm:px-6
          md:px-10
          lg:px-16
          xl:px-20

          py-14
          sm:py-20
        "
      >
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
          className="
            text-center

            mb-14
            sm:mb-20
          "
        >
          <h2
            className="
              text-2xl
              xs:text-3xl
              sm:text-4xl
              md:text-5xl

              font-bold
              leading-tight
              tracking-[-0.03em]
            "
          >
            Let’s build something{" "}
            <span
              className="
                bg-linear-to-r
                from-primary
                via-purple-400
                to-pink-400

                bg-clip-text
                text-transparent
              "
            >
              impactful
            </span>
          </h2>

          <p
            className="
              mt-4

              max-w-xs
              xs:max-w-md
              sm:max-w-2xl

              mx-auto

              text-xs
              xs:text-sm
              sm:text-base

              text-muted-foreground
              leading-6
              sm:leading-7
            "
          >
            Full Stack Developer specializing in scalable API-first systems
            using MERN, Next.js, Django & FastAPI.
          </p>

          {/* ====================================================== */}
          {/* TECH STACK */}
          {/* ====================================================== */}

          <div
            className="
              mt-6

              flex
              items-center
              justify-center
              flex-wrap

              gap-2
              sm:gap-3
            "
          >
            {[
              "Javascript",
              "Python",
              "TypeScript",
              "MERN",
              "Next.js",
              "Django",
              "FastAPI",
              "RESTAPI",
            ].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  px-3
                  py-1.5

                  text-[10px]
                  sm:text-xs

                  rounded-full

                  border
                  border-primary/20

                  bg-background/50
                  backdrop-blur-xl

                  text-muted-foreground

                  hover:border-primary/40
                  transition-all
                "
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
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              group
              relative

              inline-flex
              items-center
              gap-2

              mt-8

              px-6
              sm:px-7

              py-3

              text-xs
              sm:text-sm

              rounded-full

              border
              border-primary/30

              bg-primary/10
              hover:bg-primary/20

              transition-all
              duration-300

              shadow-md
            "
          >
            <span
              className="
                absolute
                inset-0

                bg-linear-to-r
                from-transparent
                via-white/20
                to-transparent

                opacity-0
                group-hover:opacity-100

                transition
                duration-700

                blur-sm
              "
            />
            Let’s Work Together
            <IconArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3

            gap-10
            lg:gap-6

            items-center
          "
        >
          {/* ====================================================== */}
          {/* LEFT */}
          {/* ====================================================== */}

          <div
            className="
              flex
              flex-col

              items-center
              lg:items-start

              text-center
              lg:text-left
            "
          >
            <h3
              className="
                text-lg
                sm:text-xl

                font-semibold
              "
            >
              Payal Yadav
            </h3>

            <p
              className="
                mt-2

                text-xs
                sm:text-sm

                text-muted-foreground
              "
            >
              Full Stack Developer • Backend & System Design
            </p>

            <div
              className="
                mt-4

                flex
                items-center
                justify-center
                lg:justify-start

                gap-3
                flex-wrap
              "
            >
              <span
                className="
                  text-[11px]
                  text-muted-foreground
                "
              >
                India
              </span>

              <div
                className="
                  flex
                  items-center
                  gap-1.5

                  px-3
                  py-1

                  rounded-full

                  border
                  border-green-400/30

                  bg-green-400/10
                  text-green-500

                  text-[11px]
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-green-400
                      opacity-75
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-green-500
                    "
                  />
                </span>
                Open to Work
              </div>
            </div>

            <p
              className="
                mt-3

                text-[11px]
                sm:text-xs

                text-muted-foreground
              "
            >
              Internships & Full-Time • API-First Systems
            </p>
          </div>

          {/* ====================================================== */}
          {/* CENTER LINKS */}
          {/* ====================================================== */}

          <div
            className="
              flex
              items-center
              justify-center
              flex-wrap

              gap-4
              sm:gap-6

              text-xs
              sm:text-sm
            "
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="
                  relative

                  text-muted-foreground
                  hover:text-primary

                  transition-all
                  duration-300

                  group
                "
              >
                {link}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-1

                    h-px
                    w-0

                    bg-primary

                    transition-all
                    duration-300

                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </div>

          {/* ====================================================== */}
          {/* RIGHT SOCIALS */}
          {/* ====================================================== */}

          <div
            className="
              flex
              items-center
              justify-center
              lg:justify-end

              gap-3
              sm:gap-4
            "
          >
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
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="relative"
                >
                  {/* ====================================================== */}
                  {/* GRADIENT RING */}
                  {/* ====================================================== */}

                  <div
                    className={`
                      absolute
                      inset-0

                      rounded-xl
                      p-px

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "bg-linear-to-tr from-green-400 via-purple-500 to-pink-500 opacity-100"
                          : "opacity-0"
                      }
                    `}
                  >
                    <div className="h-full w-full rounded-xl bg-background" />
                  </div>

                  {/* ====================================================== */}
                  {/* ICON BOX */}
                  {/* ====================================================== */}

                  <div
                    className={`
                      relative

                      flex
                      items-center
                      justify-center

                      w-11
                      h-11

                      sm:w-12
                      sm:h-12

                      rounded-xl

                      border
                      backdrop-blur-xl

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/50"
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

        <div
          className="
            mt-12
            pt-5

            border-t
            border-border

            flex
            flex-col
            md:flex-row

            items-center
            justify-between

            gap-3

            text-[10px]
            sm:text-xs

            text-muted-foreground
          "
        >
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Payal Yadav. All rights reserved.
          </p>

          <p
            className="
              flex
              items-center
              gap-1.5

              opacity-70
              hover:opacity-100

              transition-all
            "
          >
            Designed & Built with precision
            <IconSparkles size={14} className="text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};
