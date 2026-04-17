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
    <>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="mb-10 rounded-2xl border border-border backdrop-blur-xl shadow-sm px-6 py-5 md:px-8 md:py-6 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground/80">
            {/* LEFT */}
            <p className="tracking-wide text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-foreground font-medium">Payal Yadav</span>.
              Built with passion & precision.
            </p>

            {/* RIGHT (optional subtle tag) */}
            <span className="px-2 py-0.5 rounded-md bg-muted/50 border text-[10px]">
              Full Stack Developer
            </span>
          </div>
          {/* 🌐 Social Icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    group
                    relative
                    p-2.5
                    rounded-xl
                    border border-border
                    bg-background/60
                    backdrop-blur-md
                    text-muted-foreground
                    transition-all duration-300
                    hover:text-primary
                    hover:border-primary/40
                  "
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition" />

                  <Icon size={18} stroke={1.5} className="relative z-10" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
