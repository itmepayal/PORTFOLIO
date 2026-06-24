"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "../common/container";
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
  return (
    <Container>
      <section id="experience" className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="reveal mb-8 sm:mb-10 flex flex-wrap items-end gap-4 sm:gap-6">
            <div>
              <div className="mb-1 font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.15em] text-primary uppercase">
                02 — EXPERIENCE
              </div>
              <h2 className="text-[clamp(1.4rem,5vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                Where I&apos;ve Worked
              </h2>
            </div>
            <div className="mb-1.5 h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
          </div>

          {loading ? (
            <ExperienceSkeleton />
          ) : experiences.length === 0 ? (
            <p className="font-mono text-[0.8rem] text-muted-foreground">
              No experience added yet.
            </p>
          ) : (
            <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-px bg-border border border-border">
              <div
                className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible bg-card p-2 sm:p-3 lg:p-5 gap-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {experiences.map((item, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={item._id}
                      onClick={() => setActiveIndex(i)}
                      className={`shrink-0 min-w-30 text-left lg:min-w-0 lg:w-full px-4 py-3 lg:px-5 lg:py-4 border-b-2 lg:border-b-0 lg:border-l-2 transition-colors duration-200 ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-transparent hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`font-sans text-[0.85rem] sm:text-[0.9rem] font-bold leading-tight ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.company}
                      </div>
                      <div className="mt-1 font-mono text-[0.6rem] sm:text-[0.63rem] tracking-[0.06em] text-muted-foreground">
                        {year(item.startDate)} —{" "}
                        {item.current ? "Present" : year(item.endDate)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {active && (
                <div className="bg-card p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="font-sans text-[1.15rem] sm:text-[1.35rem] font-bold tracking-[-0.02em] leading-tight">
                      {active.position}
                    </h3>
                    {active.companyLogo && (
                      <div className="size-10 sm:size-12 shrink-0 overflow-hidden border border-border bg-(--bg) flex items-center justify-center">
                        <Image
                          src={active.companyLogo}
                          alt={active.company}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-5 sm:mb-6 mt-1 flex flex-wrap items-center gap-3 sm:gap-6">
                    {active.companyWebsite ? (
                      <a
                        href={active.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[0.66rem] sm:text-[0.72rem] tracking-widest uppercase text-primary hover:text-cyan transition-colors"
                      >
                        {active.company} · {active.location}
                        <TbExternalLink className="text-[0.85rem]" />
                      </a>
                    ) : (
                      <span className="font-mono text-[0.66rem] sm:text-[0.72rem] tracking-widest uppercase text-primary">
                        {active.company} · {active.location}
                      </span>
                    )}
                    <span className="font-mono text-[0.66rem] sm:text-[0.72rem] text-muted-foreground uppercase">
                      {monthYear(active.startDate)} –{" "}
                      {active.current ? "Present" : monthYear(active.endDate)}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 sm:gap-3.5">
                    {active.responsibilities.slice(0, 4)?.map((point, idx) => (
                      <li
                        key={idx}
                        className="relative pl-6 text-[0.82rem] sm:text-[0.875rem] leading-[1.6] text-dimmed"
                      >
                        <span className="absolute left-0 top-0.5 text-[0.7rem] text-primary">
                          ▸
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {active.technologies && active.technologies.length > 0 && (
                    <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-border flex flex-wrap gap-2">
                      {active.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[0.6rem] sm:text-[0.63rem] text-dimmed border border-border px-2.5 py-1 leading-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 sm:mt-7">
                    <Link
                      href={`/experiences/${active._id}`}
                      className="inline-flex items-center gap-1 font-mono text-[0.68rem] tracking-[0.05em] text-primary hover:text-cyan transition-colors"
                    >
                      View Full Case Study
                      <TbExternalLink className="text-[0.8rem]" />
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
