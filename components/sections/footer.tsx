"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Section } from "@/components/common/section";

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

  return (
    <Section
      id="#"
      className="relative px-6 md:px-12 mb-20 border-t border-white/10 text-sm"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/40 text-xs tracking-wide text-center md:text-left">
          &copy; {new Date().getFullYear()} Payal Yadav. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialIcons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white/50 hover:text-white transition-all duration-300"
              >
                <Icon size={18} stroke={1.5} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
