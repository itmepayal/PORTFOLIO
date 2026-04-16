"use client";

import { useScroll } from "@/hooks/use-scroll";
import { ProfileCard } from "@/components/layout/profile-card";
import { MenuSheet } from "@/components/layout/menu-sheet";
import { Navbar } from "@/components/layout/navbar";

import { Home } from "@/components/sections/home";
import { Resume } from "@/components/sections/resume";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { SECTIONS } from "@/constants/sections";

export default function Page() {
  const { active, scrollToSection } = useScroll(SECTIONS);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-1 items-start">
      <ProfileCard />
      <MenuSheet />
      <div className="overflow-hidden h-screen relative">
        <Home />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <Navbar
            sections={SECTIONS}
            active={active}
            onNavigate={scrollToSection}
          />
        </div>
      </div>
    </div>
  );
}
