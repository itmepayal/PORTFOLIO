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
    <div className="relative">
      <ProfileCard />
      <MenuSheet />

      <main className="flex">
        <div className="hidden md:block w-24" />
        <div className="flex-1 md:pt-5 px-4 md:px-10 space-y-10">
          <Home />
          <Projects />
          <Resume />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </div>
      </main>

      <Navbar
        sections={SECTIONS}
        active={active}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
