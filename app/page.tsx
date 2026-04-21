"use client";

import { useScroll } from "@/hooks/use-scroll";
import { ProfileCard } from "@/components/layout/profile-card";
import { MenuSheet } from "@/components/layout/menu-sheet";
import { Navbar } from "@/components/layout/navbar";

import { Home } from "@/components/sections/home";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { SECTIONS } from "@/constants/sections";
import { Proof } from "@/components/sections/proof";
import { Projects } from "@/components/sections/projects";

export default function Page() {
  const { active, scrollToSection } = useScroll(SECTIONS);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-1 items-start">
      <div className="sticky h-fit">
        <ProfileCard />
      </div>
      <MenuSheet />
      <div className="overflow-y-auto h-screen relative">
        <Home />
        <Skills />
        <Projects />
        <Proof />
        <Education />
        <Contact />
        <Footer />
        <div className="sticky bottom-6 flex justify-center z-50">
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
