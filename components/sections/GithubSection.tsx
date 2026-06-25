"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../common/Container";
import { TbBrandGithub } from "react-icons/tb";

const GITHUB_USERNAME = "itmepayal";
const WEEKS = 53;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_BG: Record<number, string> = {
  0: "var(--gh-cell, #161b22)",
  1: "var(--gh-l1, #0e4429)",
  2: "var(--gh-l2, #006d32)",
  3: "var(--gh-l3, #26a641)",
  4: "var(--gh-l4, #39d353)",
};

const LEVEL_LABELS: Record<number, string> = {
  0: "No",
  1: "1–2",
  2: "3–5",
  3: "6–9",
  4: "10+",
};

type ApiContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type Cell = {
  date: string;
  level: -1 | 0 | 1 | 2 | 3 | 4;
  count: number;
  title: string;
};

type MonthLabel = {
  label: string;
  weekIndex: number;
};

type CalendarData = {
  weeks: Cell[][];
  monthLabels: MonthLabel[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  bestDay: number;
  bestDayOfWeek: string;
  avgPerDay: string;
};

function buildCalendar(contributions: ApiContribution[]): CalendarData {
  const byDate: Record<string, ApiContribution> = {};
  for (const c of contributions) byDate[c.date] = c;

  let totalContributions = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let bestDay = 0;
  let streak = 0;
  const dowCounts = [0, 0, 0, 0, 0, 0, 0];
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const c of contributions) {
    totalContributions += c.count;
    if (c.count > bestDay) bestDay = c.count;
    const d = new Date(c.date + "T00:00:00");
    dowCounts[d.getDay()] += c.count;
  }

  const sorted = [...contributions].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  for (const c of sorted) {
    if (c.count > 0) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      if (streak > 0) break;
    }
  }
  currentStreak = streak;

  const bestDowIndex = dowCounts.indexOf(Math.max(...dowCounts));
  const bestDayOfWeek = DAYS[bestDowIndex] + "s";

  const activeDays = contributions.filter((c) => c.count > 0).length;
  const avgPerDay =
    activeDays > 0
      ? (totalContributions / contributions.length).toFixed(1)
      : "0";

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (WEEKS * 7 - 1));
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: Cell[][] = [];
  const monthLabels: MonthLabel[] = [];
  let lastMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const week: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + w * 7 + d);

      const month = cellDate.getMonth();
      if (month !== lastMonth && d === 0) {
        monthLabels.push({ label: MONTHS[month], weekIndex: w });
        lastMonth = month;
      }

      const dateStr = cellDate.toISOString().split("T")[0];
      const isFuture = cellDate > today;
      const contrib = byDate[dateStr];
      const level: Cell["level"] = isFuture ? -1 : (contrib?.level ?? 0);
      const count = contrib?.count ?? 0;

      const label = cellDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const title = isFuture
        ? dateStr
        : `${label} · ${count} contribution${count !== 1 ? "s" : ""}`;

      week.push({ date: dateStr, level, count, title });
    }
    weeks.push(week);
  }

  return {
    weeks,
    monthLabels,
    totalContributions,
    currentStreak,
    longestStreak,
    bestDay,
    bestDayOfWeek,
    avgPerDay,
  };
}

export const GithubPanel = () => {
  const [calData, setCalData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const built = buildCalendar(data.contributions as ApiContribution[]);
        setCalData(built);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  const now = new Date();
  const yearLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear() - 1} — ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <Container>
      <section
        id="github-contrib"
        className="py-10 sm:py-12 md:py-16 lg:py-20 bg-secondary"
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="reveal mb-8 sm:mb-10 flex flex-wrap items-end gap-4 sm:gap-6">
            <div>
              <div className="mb-1 font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.15em] text-primary uppercase">
                03 — GITHUB
              </div>
              <h2 className="text-[clamp(1.4rem,5vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                Contribution Calendar
              </h2>
            </div>
            <div className="mb-1.5 h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
            <div className="mb-1 font-mono text-[0.7rem] tracking-[0.04em] text-muted-foreground">
              {yearLabel}
            </div>
          </div>

          {loading ? (
            <div className="reveal mb-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem]"
                >
                  <div className="h-8 w-16 bg-muted rounded mb-2" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            calData && (
              <div className="reveal mb-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                {[
                  {
                    value: calData.totalContributions.toLocaleString(),
                    label: "Contributions",
                    suffix: "",
                  },
                  {
                    value: calData.currentStreak,
                    label: "Current Streak",
                    suffix: " days",
                    emoji: "🔥",
                  },
                  {
                    value: calData.longestStreak,
                    label: "Longest Streak",
                    suffix: " days",
                  },
                  { value: calData.bestDay, label: "Best Day", suffix: "" },
                ].map(({ value, label, suffix, emoji }) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h"
                  >
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
                    {emoji && (
                      <span className="absolute right-4 top-4 sm:right-[1.3rem] sm:top-[1.2rem] text-base opacity-50">
                        {emoji}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1 font-sans text-[1.6rem] sm:text-[1.9rem] font-bold leading-none">
                      <span className="bg-linear-to-br from-primary to-cyan bg-clip-text text-transparent">
                        {value}
                      </span>
                      {suffix && (
                        <span className="font-mono text-[0.85rem] sm:text-[0.95rem] font-normal text-muted-foreground">
                          {suffix}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {loading ? (
            <div className="reveal border border-border bg-card p-4 sm:p-6 h-40 animate-pulse" />
          ) : error ? (
            <div className="reveal border border-border bg-card p-6 flex items-center gap-3 font-mono text-[0.78rem] text-muted-foreground">
              <TbBrandGithub className="text-xl shrink-0" />
              Could not load contribution data. Check back later.
            </div>
          ) : (
            calData && (
              <div className="reveal overflow-x-auto border border-border bg-card p-4 sm:p-6 [-webkit-overflow-scrolling:touch]">
                <div className="flex min-w-150 flex-col gap-2">
                  <div className="relative mb-2 h-3.5 pl-8.5">
                    {calData.monthLabels.map((m, i) => (
                      <span
                        key={`${m.label}-${i}`}
                        className="absolute whitespace-nowrap font-mono text-[0.63rem] text-muted-foreground"
                        style={{ left: `${34 + m.weekIndex * 16}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    <div className="mr-2 flex flex-col gap-1 pt-px">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <div
                          key={i}
                          className="h-3 font-mono text-[0.6rem] leading-3 text-muted-foreground"
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-1 gap-1">
                      {calData.weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-1">
                          {week.map((cell, di) => (
                            <div
                              key={di}
                              className={[
                                "h-3 w-3 rounded-[3px] transition-transform duration-150",
                                cell.level === -1
                                  ? "invisible"
                                  : "cursor-default hover:z-10 hover:scale-125 hover:ring-2 hover:ring-primary",
                              ].join(" ")}
                              style={{
                                backgroundColor:
                                  cell.level === -1
                                    ? undefined
                                    : LEVEL_BG[cell.level],
                              }}
                              onMouseEnter={(e) => {
                                if (cell.level === -1) return;
                                const r = (
                                  e.target as HTMLDivElement
                                ).getBoundingClientRect();
                                setHover({
                                  x: r.left + r.width / 2,
                                  y: r.top,
                                  text: cell.title,
                                });
                              }}
                              onMouseLeave={() => setHover(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                  <p className="font-mono text-[0.68rem] sm:text-xs text-muted-foreground">
                    Most active on{" "}
                    <span className="font-semibold text-green">
                      {calData.bestDayOfWeek}
                    </span>{" "}
                    · avg{" "}
                    <span className="font-semibold text-green">
                      {calData.avgPerDay}
                    </span>
                    /day
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.62rem] text-muted-foreground">
                      Less
                    </span>
                    <div className="flex gap-0.75">
                      {[0, 1, 2, 3, 4].map((l) => (
                        <span
                          key={l}
                          className="h-3 w-3 rounded-[3px]"
                          style={{ backgroundColor: LEVEL_BG[l] }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">
                      More
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 font-mono text-[0.68rem] text-popover-foreground shadow-lg"
          style={{ left: hover.x, top: hover.y - 8 }}
        >
          {hover.text}
        </div>
      )}
    </Container>
  );
};
