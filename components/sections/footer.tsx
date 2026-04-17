"use client";

import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconArrowUpRight,
} from "@tabler/icons-react";

export const Footer = () => {
  const socialIcons = [
    {
      icon: IconBrandGithub,
      link: "https://github.com/itmepayal",
      label: "GitHub",
    },
    {
      icon: IconBrandLinkedin,
      link: "https://www.linkedin.com/in/payal-yadav-dev",
      label: "LinkedIn",
    },
  ];

  const links = ["Home", "Skills", "Projects", "Proof", "Education", "Contact"];

  return (
    <footer className="relative mt-20">
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto px-6 py-10 md:py-12">
        {/* ================= MAIN ================= */}
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-lg font-semibold tracking-wide">Payal Yadav</h2>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer • MERN • System Design
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex justify-center md:justify-end gap-3">
            {socialIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-3 rounded-xl border border-border bg-background/60 backdrop-blur-md transition-all duration-300 hover:border-primary/40"
                >
                  <span className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition" />
                  <Icon
                    size={18}
                    stroke={1.5}
                    className="relative z-10 text-muted-foreground group-hover:text-primary transition"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Payal Yadav. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with precision
            <IconArrowUpRight size={14} />
          </p>
        </div>
      </div>
    </footer>
  );
};
