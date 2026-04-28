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
    { icon: IconBrandGithub, link: "https://github.com/itmepayal" },
    {
      icon: IconBrandLinkedin,
      link: "https://www.linkedin.com/in/payal-yadav-dev",
    },
    { icon: IconMail, link: "mailto:yourmail@gmail.com" },
  ];

  const links = ["Home", "About Us", "Skills", "Projects", "Contact"];

  /* ================= CURSOR LIGHT ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <footer className="relative border-t border-border overflow-hidden mt-3">
      {/* Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(500px at ${smoothX}px ${smoothY}px, rgba(99,102,241,0.12), transparent 80%)`,
        }}
      />

      {/* Background Glow */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-0 h-100 w-175 -translate-x-1/2 bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
            Let’s build something{" "}
            <span className="bg-linear-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              impactful
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Full Stack Developer specializing in scalable, API-first systems
            using MERN, Next.js, Django & FastAPI.
          </p>

          {/* TECH STACK */}
          <div className="mt-6 flex justify-center flex-wrap gap-2">
            {[
              "React",
              "Next",
              "Node",
              "Express",
              "Django",
              "FastAPI",
              "MongoDB",
              "Postgres",
            ].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-[10px] sm:text-xs rounded-full 
                border border-primary/20 bg-background/50 backdrop-blur 
                text-muted-foreground hover:border-primary/40 transition"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 mt-8 px-6 py-3 
            text-xs sm:text-sm rounded-full border border-primary/30 
            bg-primary/10 hover:bg-primary/20 transition shadow-md"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-sm" />
            Let’s Work Together
            <IconArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        {/* ================= MAIN ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          {/* LEFT */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold">Payal Yadav</h3>

            <p className="text-xs sm:text-sm text-muted-foreground">
              Full Stack Developer • Backend & System Design
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <span className="text-[11px] text-muted-foreground">India</span>

              <div
                className="flex items-center gap-1.5 px-2.5 py-0.75 rounded-full 
              border border-green-400/30 bg-green-400/10 text-green-500 text-[11px]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to Work
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Internships & Full-Time • API-First Systems
            </p>
          </div>

          {/* CENTER */}
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-muted-foreground hover:text-primary transition group"
              >
                {link}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* RIGHT - WHATSAPP STYLE ICONS */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialIcons.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeIndex === i;

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  {/* Gradient Ring */}
                  <div
                    className={`absolute inset-0 rounded-xl p-0.5 transition ${
                      isActive
                        ? "bg-linear-to-tr from-green-400 via-purple-500 to-pink-500 opacity-100"
                        : "bg-linear-to-tr from-green-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="h-full w-full rounded-xl bg-background" />
                  </div>

                  {/* Icon Box */}
                  <div
                    className={`relative p-3 rounded-xl border backdrop-blur-lg transition
                    ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background/50"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      }`}
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-12 pt-5 border-t border-border flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} Payal Yadav. All rights reserved.</p>

          <p className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition">
            Designed & Built with precision
            <IconSparkles size={14} className="text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};
