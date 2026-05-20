"use client";

import { useScroll } from "@/hooks/use-scroll";
import { Profile } from "@/components/profile/ProfileCard";
import { MenuSheet } from "@/components/layout/Menu";
import { Navbar } from "@/components/layout/Navbar";

import { Home } from "@/components/sections/home";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { SECTIONS } from "@/constants/sections";

export default function Page() {
  const { active, scrollToSection } = useScroll(SECTIONS);
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 items-start">
      <MenuSheet />
      <div className="overflow-y-auto h-screen relative">
        <Home />
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
