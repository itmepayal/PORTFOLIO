"use client";

import React from "react";

type Section = {
  id: string;
  icon: React.ElementType;
};

type NavbarProps = {
  sections: Section[];
  active: string;
  onNavigate: (id: string) => void;
};

export const Navbar = ({ sections, active, onNavigate }: NavbarProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-3 border border-border/50 backdrop-blur-md px-5 py-2.5 rounded-full bg-background/40 shadow-lg">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          const isActive = active === sec.id;

          return (
            <button
              key={i}
              onClick={() => onNavigate(sec.id)}
              className={`
                p-3 rounded-full border transition-all duration-300
                ${
                  isActive
                    ? "bg-linear-to-br from-primary via-chart-2 to-chart-3 text-primary-foreground border-transparent shadow-md scale-105"
                    : "bg-secondary/50 text-muted-foreground border-border/50 hover:text-foreground hover:bg-accent/40"
                }
              `}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
