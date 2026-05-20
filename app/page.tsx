"use client";

import { Home } from "@/components/sections/home";
import { Skills } from "@/components/sections/skills";
import { DSA } from "@/components/sections/dsa";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 items-start">
      <div className="overflow-y-auto h-screen relative">
        <Home />
        <Skills />
        <DSA />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
