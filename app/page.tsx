"use client";

import { useEffect, useState } from "react";

import { Home } from "@/components/sections/home";
import { Skills } from "@/components/sections/skills";
import { DSA } from "@/components/sections/dsa";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { PageLoader } from "@/components/common/page-loader";

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

      <div className="grid grid-cols-1 gap-1 items-start">
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
    </>
  );
}
