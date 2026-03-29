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
    <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 z-50">
      <div className="flex space-x-3 border backdrop-blur-md px-5 py-2.5 rounded-full bg-black/30">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          const isActive = active === sec.id;

          return (
            <button
              key={i}
              onClick={() => onNavigate(sec.id)}
              className={`p-3 rounded-full border transition ${
                isActive
                  ? "bg-white text-black"
                  : "bg-secondary text-gray-300 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
