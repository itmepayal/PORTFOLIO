"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "../common/container";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BriefcaseBusiness, CalendarDays, Loader2, MapPin } from "lucide-react";

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

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/experience");
        const data = await response.json();
        if (data.success) {
          const sortedData = data.experiences.sort(
            (a: ExperienceItem, b: ExperienceItem) => a.order - b.order,
          );
          setExperiences(sortedData);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const toggleCard = (key: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container>
      {/* ====================================================== */}
      {/* SECTION */}
      {/* ====================================================== */}
      <section>
        {/* ====================================================== */}
        {/* BACKGROUND */}
        {/* ====================================================== */}
        <div className="absolute inset-0 -z-20 bg-background" />
        <div className=" absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className=" absolute left-1/2 top-0 -z-10 h-80 w-[320px] -translate-x-1/2 rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl" />
        {/* ====================================================== */}
        {/* MAIN CONTAINER */}
        {/* ====================================================== */}
        <div className=" relative z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className=" flex flex-col gap-5 sm:gap-10 lg:flex-row lg:items-end lg:justify-between"
          >
            {/* ====================================================== */}
            {/* LEFT CONTENT */}
            {/* ====================================================== */}
            <div className="max-w-3xl">
              <p className=" inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-semibold">
                Professional Experience
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-none tracking-[-0.05em] text-foreground">
                Building
                <span className="block bg-linear-to-r from-primary via-primary to-chart-3 bg-clip-text text-transparent">
                  Production Systems
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground">
                Focused on scalable backend systems, realtime infrastructure,
                secure authentication, caching strategies, and enterprise-grade
                application performance.
              </p>
            </div>
            {/* ====================================================== */}
            {/* EXPERIENCE STATS */}
            {/* ====================================================== */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className=" group flex w-full items-center gap-4 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 px-5 py-5 backdrop-blur-xl shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 sm:w-fit sm:px-6"
            >
              <div className=" flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15">
                <BriefcaseBusiness className="size-5" />
              </div>
              <div>
                <h3 className=" text-2xl font-black text-foreground">1+</h3>
                <p className=" text-xs text-muted-foreground">
                  Years Experience
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ====================================================== */}
          {/* EXPERIENCE LIST */}
          {/* ====================================================== */}
          <div className="relative mt-6 sm:mt-20">
            {/* ====================================================== */}
            {/* TIMELINE LINE */}
            {/* ====================================================== */}
            <div className=" absolute left-6 top-0 hidden h-full w-px bg-border/80 md:block" />
            {/* ====================================================== */}
            {/* EXPERIENCE CARDS */}
            {/* ====================================================== */}
            {loading ? (
              <div className=" flex flex-col items-center justify-center py-32 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-xl shadow-primary/5">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Loading experience...
                </p>
              </div>
            ) : (
              experiences.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  className=" relative md:pl-16 lg:pl-20"
                >
                  {/* ====================================================== */}
                  {/* TIMELINE ICON */}
                  {/* ====================================================== */}
                  <div className=" absolute left-0 top-10 hidden size-12 lg:size-14 items-center justify-center rounded-2xl border border-primary/20 bg-card dark:bg-card/90 shadow-md md:flex">
                    <BriefcaseBusiness className="size-5 text-primary" />
                  </div>
                  {/* ====================================================== */}
                  {/* EXPERIENCE CARD */}
                  {/* ====================================================== */}
                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    className=" group relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl shadow-xl shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]"
                  >
                    {/* ====================================================== */}
                    {/* CARD GRID */}
                    {/* ====================================================== */}
                    <div className=" absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px]" />
                    {/* ====================================================== */}
                    {/* CARD GLOW */}
                    {/* ====================================================== */}
                    <div className="absolute right-0 top-0 h-44 w-44 sm:h-52 sm:w-52 rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* ====================================================== */}
                    {/* CARD CONTENT */}
                    {/* ====================================================== */}
                    <div className="relative z-10 p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex items-start gap-4">
                          <div className=" size-16 rounded-2xl border border-border bg-background flex items-center justify-center overflow-hidden shrink-0">
                            <Image
                              src={item.companyLogo}
                              alt={item.company}
                              width={50}
                              height={50}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className=" px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] uppercase tracking-wider font-semibold">
                                {item.featured
                                  ? "Featured Experience"
                                  : "Experience"}
                              </span>
                              <span className=" px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] uppercase tracking-wider font-semibold">
                                {item.current
                                  ? "Currently Working"
                                  : "Completed"}
                              </span>
                            </div>
                            <h3 className="sm:text-3xl text-xl font-black text-foreground">
                              {item.position}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                              <a
                                href={item.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:scale-[1.02]"
                              >
                                <span>{item.company}</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 3h7m0 0v7m0-7L10 14"
                                  />
                                </svg>
                              </a>
                              <div className=" inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2">
                                <span className="text-base">
                                  <MapPin size={12} />
                                </span>
                                <p className="text-sm text-muted-foreground">
                                  {item.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-3">
                          <CalendarDays className="size-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              },
                            )}
                            {" - "}
                            {item.current
                              ? "Present"
                              : new Date(item.endDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                          </span>
                        </div>
                      </div>
                      <div className="mt-8">
                        <p
                          className={`text-muted-foreground leading-8 text-sm sm:text-base transition-all duration-300 ${expandedCards[item._id] ? "" : "line-clamp-3"}`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 180 && (
                          <button
                            onClick={() => toggleCard(item._id)}
                            className="
                              mt-4
                              text-primary
                              font-semibold
                              text-sm
                              hover:underline
                            "
                          >
                            {expandedCards[item._id] ? (
                              <div className="flex items-center gap-2">
                                <FiChevronUp className="size-4" />
                                Read Less
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <FiChevronDown className="size-4" />
                                Read More
                              </div>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="mt-8">
                        <h4 className="text-lg font-bold mb-4">
                          Key Responsibilities
                        </h4>

                        <div className="grid md:grid-cols-2 gap-3">
                          {(expandedCards[`resp-${item._id}`]
                            ? item.responsibilities
                            : item.responsibilities.slice(0, 4)
                          ).map((responsibility, index) => (
                            <div
                              key={index}
                              className=" flex items-start gap-3 rounded-2xl border border-border bg-background/50 px-4 py-3"
                            >
                              <div className=" mt-1 size-2 rounded-full bg-primary shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {responsibility}
                              </span>
                            </div>
                          ))}
                        </div>
                        {item.responsibilities.length > 4 && (
                          <button
                            onClick={() => toggleCard(`resp-${item._id}`)}
                            className=" mt-4 text-primary font-semibold text-sm hover:underline"
                          >
                            {expandedCards[`resp-${item._id}`] ? (
                              <div className="flex items-center gap-2">
                                <FiChevronUp className="size-4" />
                                Show Less
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <FiChevronDown className="size-4" />
                                Show {item.responsibilities.length - 4} More
                                Responsibilities
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                      <div className="mt-8">
                        <h4 className="text-lg font-bold mb-4">
                          Technologies Used
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {(expandedCards[`tech-${item._id}`]
                            ? item.technologies
                            : item.technologies.slice(0, 8)
                          ).map((tech, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              className=" flex items-center justify-center px-4 py-3 rounded-2xl border border-border bg-background/70 text-sm font-medium text-center transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                        {item.technologies.length > 8 && (
                          <button
                            onClick={() => toggleCard(`tech-${item._id}`)}
                            className=" mt-4 text-primary font-semibold text-sm hover:underline"
                          >
                            {expandedCards[`tech-${item._id}`] ? (
                              <div className="flex items-center gap-2">
                                <FiChevronUp className="size-4" />
                                Show Less
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <FiChevronDown className="size-4" />
                                Show {item.technologies.length - 8} More
                                Technologies
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ====================================================== */}
                    {/* HOVER BORDER */}
                    {/* ====================================================== */}
                    <div className=" absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/15 transition-all duration-500" />
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};
