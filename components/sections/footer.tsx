"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

export const Footer = () => {
  const socials = [
    {
      label: "GitHub",
      icon: IconBrandGithub,
      link: "https://github.com/itmepayal",
    },
    {
      label: "LinkedIn",
      icon: IconBrandLinkedin,
      link: "https://www.linkedin.com/in/payal-yadav-dev",
    },
    { label: "Twitter", icon: IconBrandX, link: "#" },
  ];

  return (
    <footer className="border-t border-border bg-secondary px-[5%] py-10">
      <div
        className="
          mx-auto flex flex-wrap items-center justify-between gap-6
        "
      >
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="
              bg-linear-to-br from-primary to-chart-2 bg-clip-text
              font-sans text-lg font-bold tracking-tight text-transparent
            "
          >
            Payal Yadav.
          </span>
          <span className="font-mono text-[0.68rem] tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} · Built from scratch
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex gap-2.5">
            {socials.map(({ label, icon: Icon, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-1.5 rounded-md border border-border
                  px-3 py-1.5 font-mono text-[0.65rem] tracking-wide
                  text-muted-foreground transition-colors
                  hover:border-primary hover:text-primary
                "
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.68rem] text-chart-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-4 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-4" />
            </span>
            Open to opportunities
          </div>
        </div>
      </div>
    </footer>
  );
};
