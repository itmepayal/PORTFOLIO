"use client";

import { useState, useEffect, useCallback } from "react";

type Section = {
  id: string;
};

export const useScroll = (sections: Section[]) => {
  const [active, setActive] = useState(sections[0]?.id || "home");

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0]?.id || "home";

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150) {
          current = sec.id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });
  }, []);

  return { active, scrollToSection };
};
