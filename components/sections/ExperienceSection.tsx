"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { ExperienceViewToggle } from "../common/ExperienceViewToggle";
import { SectionEmptyState } from "../common/SectionEmptyState";
import {
  TbExternalLink,
  TbBriefcase,
  TbCalendar,
  TbMapPin,
  TbCheck,
  TbSparkles,
  TbArrowUpRight,
  TbChevronRight,
} from "react-icons/tb";
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

const monthYear = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
};

const getDuration = (startDate: string, endDate: string, current: boolean) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  const end = current || !endDate ? new Date() : new Date(endDate);
  if (isNaN(start.getTime())) return "";

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 1) months = 1;

  const yrs = Math.floor(months / 12);
  const mos = months % 12;

  const parts = [];
  if (yrs > 0) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos > 0) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
};

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"tabs" | "timeline">("tabs");
  const [logoErrorMap, setLogoErrorMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/experiences");
        const data = await response.json();
        if (data.success) {
          const sorted = data.experiences.sort(
            (a: ExperienceItem, b: ExperienceItem) => a.order - b.order
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
  const hasExperiences = experiences.length > 0;

  const handleLogoError = (id: string) => {
    setLogoErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Container id="experience">
      <SectionHeader
        label="02 — EXPERIENCE"
        title="Where I've Worked"
        actions={
          !loading && hasExperiences ? (
            <ExperienceViewToggle value={viewMode} onChange={setViewMode} />
          ) : undefined
        }
      />

      {loading ? (
        <ExperienceSkeleton />
      ) : experiences.length === 0 ? (
        <SectionEmptyState
          icon={TbBriefcase}
          title="No work experience yet"
          description="Experience entries will appear here once they are added from the dashboard."
        />
      ) : viewMode === "tabs" ? (
            <div className="reveal grid grid-cols-1 overflow-hidden border border-border bg-card/50 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-border bg-surface/40 p-2 sm:p-3 gap-1.5 scrollbar-none snap-x">
                {experiences.map((item, i) => {
                  const isActive = i === activeIndex;
                  const duration = getDuration(item.startDate, item.endDate, item.current);
                  return (
                    <button
                      key={item._id}
                      onClick={() => setActiveIndex(i)}
                      className={`group relative shrink-0 min-w-[160px] lg:min-w-0 lg:w-full text-left p-3.5 rounded-lg transition-all duration-200 outline-none snap-start cursor-pointer ${isActive
                        ? "bg-primary/10 border border-primary/30 shadow-xs"
                        : "hover:bg-muted/40 border border-transparent"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-sans text-sm font-bold truncate transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                            }`}
                        >
                          {item.company}
                        </span>
                        {item.current && (
                          <span className="relative flex size-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                            <span className="relative inline-flex rounded-full size-2 bg-cyan" />
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center justify-between text-[0.7rem] font-mono text-muted-foreground truncate">
                        <span className="truncate">{item.position}</span>
                        {duration && (
                          <span className="ml-2 shrink-0 text-[0.65rem] px-1.5 py-0.5 rounded bg-surface border border-border/60">
                            {duration}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {active && (
                <div className="p-5 sm:p-8 lg:p-10 bg-card">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/80">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                              {active.position}
                            </h3>
                            {active.current && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono font-semibold uppercase tracking-wider bg-cyan/10 text-cyan border border-cyan/30">
                                <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
                                Current Role
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground flex-wrap mt-2">
                            {active.companyWebsite ? (
                              <a
                                href={active.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-cyan font-bold transition-colors"
                              >
                                {active.company}
                                <TbExternalLink className="size-3.5" />
                              </a>
                            ) : (
                              <span className="text-primary font-bold">{active.company}</span>
                            )}
                            <span className="text-border">•</span>
                            <span className="flex items-center gap-1">
                              <TbMapPin className="size-3.5" />
                              {active.location}
                            </span>
                            <span className="text-border">•</span>
                            <span className="flex items-center gap-1">
                              <TbCalendar className="size-3.5" />
                              {monthYear(active.startDate)} –{" "}
                              {active.current ? "Present" : monthYear(active.endDate)}
                            </span>
                          </div>
                        </div>

                        {active.companyLogo && !logoErrorMap[active._id] ? (
                          <div className="size-14 rounded-xl border border-border bg-surface p-2 flex items-center justify-center shrink-0 shadow-xs">
                            <Image
                              src={active.companyLogo}
                              alt={active.company}
                              width={48}
                              height={48}
                              className="object-contain max-h-full max-w-full"
                              onError={() => handleLogoError(active._id)}
                            />
                          </div>
                        ) : (
                          <div className="size-14 rounded-xl border border-border bg-linear-to-br from-primary/20 via-cyan/10 to-accent2/20 flex items-center justify-center shrink-0 shadow-xs">
                            <span className="font-mono text-xl font-bold text-primary">
                              {active.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {active.description && (
                        <div className="my-6 p-4 rounded-lg border-l-2 border-primary bg-surface/30 text-sm text-muted-foreground leading-relaxed">
                          {active.description}
                        </div>
                      )}

                      {active.responsibilities && active.responsibilities.length > 0 && (
                        <div className="my-6">
                          <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                            <TbSparkles className="size-4 text-cyan" />
                            Key Contributions & Impact
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {active.responsibilities.slice(0, 2).map((point, idx) => (
                              <div
                                key={idx}
                                className="group flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-surface/20 hover:border-primary/40 hover:bg-surface/50 transition-all duration-200"
                              >
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                  <TbCheck className="size-3" />
                                </span>
                                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {active.technologies && active.technologies.length > 0 && (
                        <div className="pt-6 border-t border-border/80">
                          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {active.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-xs text-foreground px-3 py-1 rounded-md border border-border bg-surface/60 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-150 shadow-2xs"
                              >
                                #{tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-8 pt-4 flex items-center justify-between border-t border-border/50 flex-wrap gap-3">
                        <Link
                          href={`/experiences/${active._id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs group"
                        >
                          View Full Case Study
                          <TbArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>

                        {active.companyWebsite && (
                          <a
                            href={active.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>Visit {active.company}</span>
                            <TbExternalLink className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : (
            <div className="relative py-4">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-cyan to-accent2/30 -translate-x-1/2 rounded-full" />

              <div className="space-y-8 md:space-y-12">
                {experiences.map((item, idx) => {
                  const duration = getDuration(item.startDate, item.endDate, item.current);
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""
                        }`}
                    >
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                        <div className="size-10 rounded-full border-2 border-primary bg-card flex items-center justify-center shadow-md">
                          {item.companyLogo && !logoErrorMap[item._id] ? (
                            <Image
                              src={item.companyLogo}
                              alt={item.company}
                              width={24}
                              height={24}
                              className="object-contain rounded-full"
                              onError={() => handleLogoError(item._id)}
                            />
                          ) : (
                            <span className="font-mono text-xs font-bold text-primary">
                              {item.company.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:mr-auto" : "md:ml-auto"
                          }`}
                      >
                        <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-md hover:border-primary/40 transition-all duration-300 group">
                          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                            <span className="font-mono text-xs font-bold text-primary">
                              {item.company}
                            </span>
                            {item.current ? (
                              <span className="inline-flex items-center gap-1 text-[0.65rem] font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded-full border border-cyan/30">
                                <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
                                Current
                              </span>
                            ) : duration ? (
                              <span className="font-mono text-[0.65rem] text-muted-foreground px-2 py-0.5 rounded bg-surface border border-border/50">
                                {duration}
                              </span>
                            ) : null}
                          </div>

                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                            {item.position}
                          </h3>

                          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <TbCalendar className="size-3.5" />
                              {monthYear(item.startDate)} –{" "}
                              {item.current ? "Present" : monthYear(item.endDate)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <TbMapPin className="size-3.5" />
                              {item.location}
                            </span>
                          </div>

                          {item.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                              {item.description}
                            </p>
                          )}

                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {item.technologies.slice(0, 5).map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="font-mono text-[0.65rem] text-muted-foreground px-2 py-0.5 rounded bg-surface border border-border/50"
                                >
                                  {tech}
                                </span>
                              ))}
                              {item.technologies.length > 5 && (
                                <span className="font-mono text-[0.65rem] text-muted-foreground px-1.5 py-0.5">
                                  +{item.technologies.length - 5} more
                                </span>
                              )}
                            </div>
                          )}

                          <Link
                            href={`/experiences/${item._id}`}
                            className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:text-cyan transition-colors"
                          >
                            <span>Read details</span>
                            <TbChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
    </Container>
  );
};
