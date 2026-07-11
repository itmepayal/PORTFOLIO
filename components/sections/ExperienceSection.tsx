"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "../common/Container";
import { TbExternalLink } from "react-icons/tb";
import { ExperienceSkeleton } from "../skeletons/ExperienceSkeleton";

interface ExperienceItem {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo: string;
  companyWebsite: string;
  featured: boolean;
  order: number;
}

const monthYear = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

const year = (date: string) => new Date(date).getFullYear();

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/experiences");
        const data = await response.json();
        if (data.success) {
          const sorted = data.experiences.sort(
            (a: ExperienceItem, b: ExperienceItem) => a.order - b.order,
          );
          setExperiences(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const active = experiences[activeIndex];

  const selectTab = (i: number) => {
    if (i === activeIndex) return;
    setLogoError(false);
    setActiveIndex(i);
  };

  return (
    <Container>
      <section
        id="experience"
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto w-full px-3 xs:px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="reveal mb-6 xs:mb-8 sm:mb-10 flex flex-wrap items-end gap-3 xs:gap-4 sm:gap-6">
            <div className="min-w-0">
              <div className="mb-1 font-mono text-[0.6rem] xs:text-[0.62rem] sm:text-[0.68rem] tracking-[0.15em] text-primary uppercase">
                02 — EXPERIENCE
              </div>
              <h2 className="text-[clamp(1.25rem,6vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em] wrap-break-word">
                Where I&apos;ve Worked
              </h2>
            </div>
            <div className="mb-1.5 h-px min-w-8 flex-1 bg-linear-to-r from-border to-transparent" />
          </div>

          {loading ? (
            <ExperienceSkeleton />
          ) : experiences.length === 0 ? (
            <p className="font-mono text-[0.8rem] text-muted-foreground">
              No experience added yet.
            </p>
          ) : (
            <div className="reveal grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-px bg-border border border-border">
              {/* Tabs */}
              <div
                className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible bg-card p-2 sm:p-3 lg:p-3 gap-1 lg:gap-1 snap-x snap-mandatory lg:snap-none scrollbar-none"
                style={{ WebkitOverflowScrolling: "touch" }}
                role="tablist"
                aria-orientation="vertical"
              >
                {experiences.map((item, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={item._id}
                      onClick={() => selectTab(i)}
                      role="tab"
                      aria-selected={isActive}
                      className={`group relative shrink-0 min-w-30 xs:min-w-32 max-w-44 text-left lg:min-w-0 lg:max-w-none lg:w-full px-3.5 py-2.5 xs:px-4 xs:py-3 lg:px-4 lg:py-3.5 rounded-sm outline-none transition-all duration-200 ease-out snap-start focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive
                          ? "bg-primary/10"
                          : "hover:bg-muted/40 hover:translate-x-0.5"
                      }`}
                    >
                      <span
                        className={`absolute inset-y-1 left-0 w-[2.5px] rounded-full bg-primary transition-all duration-300 ease-out lg:block hidden ${
                          isActive
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-0"
                        }`}
                      />
                      <span
                        className={`absolute inset-x-2 bottom-0 h-[2.5px] rounded-full bg-primary transition-all duration-300 ease-out lg:hidden ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }`}
                      />

                      <div className="flex items-center gap-1.5 min-w-0">
                        <div
                          className={`font-sans text-[0.8rem] xs:text-[0.85rem] sm:text-[0.9rem] font-bold leading-tight truncate transition-colors duration-200 ${
                            isActive
                              ? "text-primary"
                              : "text-foreground group-hover:text-foreground"
                          }`}
                        >
                          {item.company}
                        </div>
                        {item.current && (
                          <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan animate-pulse" />
                        )}
                      </div>
                      <div className="mt-1 font-mono text-[0.58rem] xs:text-[0.6rem] sm:text-[0.63rem] tracking-[0.06em] text-muted-foreground whitespace-nowrap">
                        {year(item.startDate)} —{" "}
                        {item.current ? "Present" : year(item.endDate)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              {active && (
                <div
                  key={active._id}
                  className="min-w-0 bg-card p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 animate-[fadeIn_0.35s_ease-out]"
                >
                  <div className="flex items-start justify-between gap-3 xs:gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-[1.02rem] xs:text-[1.1rem] sm:text-[1.2rem] md:text-[1.35rem] font-bold tracking-[-0.02em] leading-tight wrap-break-word">
                        {active.position}
                      </h3>
                      {active.current && (
                        <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.58rem] xs:text-[0.6rem] tracking-widest uppercase text-cyan">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse shrink-0" />
                          Current role
                        </span>
                      )}
                    </div>
                    {active.companyLogo && !logoError ? (
                      <div className="size-9 xs:size-10 sm:size-12 shrink-0 overflow-hidden rounded-sm border border-border bg-(--bg) flex items-center justify-center">
                        <Image
                          src={active.companyLogo}
                          alt={active.company}
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                          onError={() => setLogoError(true)}
                        />
                      </div>
                    ) : (
                      <div className="size-9 xs:size-10 sm:size-12 shrink-0 rounded-sm border border-border bg-primary/10 flex items-center justify-center">
                        <span className="font-mono text-[0.8rem] xs:text-[0.9rem] font-bold text-primary">
                          {active.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4 xs:mb-5 sm:mb-6 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 xs:gap-x-6">
                    {active.companyWebsite ? (
                      <a
                        href={active.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 font-mono text-[0.63rem] xs:text-[0.66rem] sm:text-[0.72rem] tracking-widest uppercase text-primary hover:text-cyan transition-colors wrap-break-word"
                      >
                        <span className="wrap-break-word">
                          {active.company} · {active.location}
                        </span>
                        <TbExternalLink className="text-[0.85rem] shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <span className="font-mono text-[0.63rem] xs:text-[0.66rem] sm:text-[0.72rem] tracking-widest uppercase text-primary wrap-break-word">
                        {active.company} · {active.location}
                      </span>
                    )}
                    <span className="font-mono text-[0.63rem] xs:text-[0.66rem] sm:text-[0.72rem] text-muted-foreground uppercase whitespace-nowrap">
                      {monthYear(active.startDate)} –{" "}
                      {active.current ? "Present" : monthYear(active.endDate)}
                    </span>
                  </div>

                  {active.description && (
                    <p className="mb-4 xs:mb-5 text-[0.8rem] xs:text-[0.85rem] sm:text-[0.9rem] leading-[1.6] xs:leading-[1.65] text-dimmed wrap-break-word">
                      {active.description}
                    </p>
                  )}

                  <ul className="flex flex-col gap-2.5 xs:gap-3 sm:gap-3.5">
                    {active.responsibilities.slice(0, 4)?.map((point, idx) => (
                      <li
                        key={idx}
                        className="relative pl-5 xs:pl-6 text-[0.78rem] xs:text-[0.82rem] sm:text-[0.875rem] leading-[1.55] xs:leading-[1.6] text-dimmed wrap-break-word"
                      >
                        <span className="absolute left-0 top-0.5 text-[0.68rem] xs:text-[0.7rem] text-primary">
                          ▸
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {active.technologies && active.technologies.length > 0 && (
                    <div className="mt-5 xs:mt-6 sm:mt-7 pt-3.5 xs:pt-4 sm:pt-5 border-t border-border flex flex-wrap gap-1.5 xs:gap-2">
                      {active.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[0.58rem] xs:text-[0.6rem] sm:text-[0.63rem] text-dimmed border border-border px-2 xs:px-2.5 py-0.5 xs:py-1 leading-none rounded-sm transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 xs:mt-6 sm:mt-7">
                    <Link
                      href={`/experiences/${active._id}`}
                      className="group inline-flex items-center gap-1 font-mono text-[0.65rem] xs:text-[0.68rem] tracking-[0.05em] text-primary hover:text-cyan transition-colors"
                    >
                      View Full Case Study
                      <TbExternalLink className="text-[0.8rem] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};
