"use client";

import { useEffect, useState } from "react";

import { Home } from "@/components/sections/HomeSection";
import { Skills } from "@/components/sections/SkillsSection";
import { Experience } from "@/components/sections/ExperienceSection";
import { Projects } from "@/components/sections/ProjectsSection";
import { Contact } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/FooterSection";
import { GithubPanel } from "@/components/sections/GithubSection";
import { PageLoader } from "@/components/common/PageLoader";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader loading={loading} />
      <div className="overflow-y-auto h-screen relative">
        <Home />
        <Projects />
        <Experience />
        <GithubPanel />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
