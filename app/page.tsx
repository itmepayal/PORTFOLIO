"use client";

import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/layout/profile-card";
import { MenuSheet } from "@/components/layout/menu-sheet";

import { Home } from "@/components/sections/home";
import { About } from "@/components/sections/about";
import { Resume } from "@/components/sections/resume";
import { Projects } from "@/components/sections/projects";
import { Reviews } from "@/components/sections/reviews";
import { Contact } from "@/components/sections/contact";

import { Card, CardHeader } from "@/components/ui/card";

// Import your icons (replace with your actual icons)
import {
  Home as HomeIcon,
  User,
  FileText,
  Briefcase,
  Star,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const sections = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "about", label: "About", icon: User },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const [active, setActive] = useState("home");

  return (
    <div className="relative">
      <ProfileCard />
      <MenuSheet />

      {/* Main content */}
      <div className="flex">
        <div className="hidden md:block w-24" />
        <div className="flex-1 md:pt-5 px-4 md:px-10 space-y-10">
          <Home />
          <About />
          <Resume />
          <Projects />
          <Reviews />
          <Contact />
        </div>
      </div>

      {/* Fixed Bottom Navbar */}
      <div className="md:fixed md:bottom-0 md:left-0 md:w-full flex justify-center overflow-hidden py-4  z-50">
        <div className="flex space-x-3 bg-secondary backdrop-blur-md px-5 py-4 rounded">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            const isActive = active === sec.id;
            return (
              <Link href="#" key={i}>
                <div className="p-3 rounded-full border bg-secondary transition">
                  <Icon className="size-4 text-gray-300 hover:text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
