"use client";

import { useEffect, useState } from "react";
import { Container } from "../common/Container";
import {
  TbBrandGithub,
  TbFlame,
  TbTrophy,
  TbBolt,
  TbGitCommit,
} from "react-icons/tb";

const GITHUB_USERNAME = "itmepayal";

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

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CELL_PX = 12;
const GAP_PX = 4;
const STEP_PX = CELL_PX + GAP_PX;
const WEEKDAY_COL_PX = 34;

const LEVEL_BG: Record<number, string> = {
  0: "var(--gh-cell, #161b22)",
  1: "var(--gh-l1, #0e4429)",
  2: "var(--gh-l2, #006d32)",
  3: "var(--gh-l3, #26a641)",
  4: "var(--gh-l4, #39d353)",
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

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toLocalDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildCalendar(contributions: ApiContribution[]): CalendarData {
  if (contributions.length === 0) {
    return {
      weeks: [],
      monthLabels: [],
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      bestDay: 0,
      bestDayOfWeek: "—",
      avgPerDay: "0",
    };
  }

  const sortedAsc = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const byDate: Record<string, ApiContribution> = {};
  for (const c of sortedAsc) byDate[c.date] = c;

  let totalContributions = 0;
  let bestDay = 0;
  const dowCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const c of sortedAsc) {
    totalContributions += c.count;
    if (c.count > bestDay) bestDay = c.count;
    dowCounts[parseLocalDate(c.date).getDay()] += c.count;
  }

  let currentStreak = 0;
  for (let i = sortedAsc.length - 1; i >= 0; i--) {
    if (sortedAsc[i].count > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let streak = 0;
  for (const c of sortedAsc) {
    if (c.count > 0) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      streak = 0;
    }
  }

  const bestDowIndex = dowCounts.indexOf(Math.max(...dowCounts));
  const bestDayOfWeek = DAYS[bestDowIndex] + "s";
  const avgPerDay = (totalContributions / sortedAsc.length).toFixed(1);

  const firstDate = parseLocalDate(sortedAsc[0].date);
  const lastDate = parseLocalDate(sortedAsc[sortedAsc.length - 1].date);

  const gridStart = new Date(firstDate);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const gridEnd = new Date(lastDate);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  const totalDays =
    Math.round((gridEnd.getTime() - gridStart.getTime()) / 86400000) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);

  const weeks: Cell[][] = [];
  const monthLabels: MonthLabel[] = [];
  let lastMonth = -1;

  for (let w = 0; w < totalWeeks; w++) {
    const week: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(cellDate.getDate() + w * 7 + d);

      const month = cellDate.getMonth();
      if (month !== lastMonth && d === 0) {
        monthLabels.push({ label: MONTHS[month], weekIndex: w });
        lastMonth = month;
      }

      const dateStr = toLocalDateStr(cellDate);
      const isOutsideRange = cellDate > lastDate || cellDate < firstDate;
      const contrib = byDate[dateStr];
      const level: Cell["level"] = isOutsideRange ? -1 : (contrib?.level ?? 0);
      const count = contrib?.count ?? 0;

      const label = cellDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const title = isOutsideRange
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

const HeatmapSkeleton = () => (
  <div className="flex gap-1 overflow-hidden">
    {Array.from({ length: 53 }).map((_, wi) => (
      <div key={wi} className="flex flex-col gap-1">
        {Array.from({ length: 7 }).map((_, di) => (
          <div
            key={di}
            className="h-3 w-3 rounded-[3px] bg-muted/40"
            style={{
              animation: "gh-pulse 1.6s ease-in-out infinite",
              animationDelay: `${(wi * 7 + di) * 6}ms`,
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

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
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setCalData(buildCalendar(data.contributions as ApiContribution[]));
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

  const stats = calData
    ? [
        {
          value: calData.totalContributions.toLocaleString(),
          label: "Contributions",
          icon: TbGitCommit,
          accent: "text-primary",
        },
        {
          value: calData.currentStreak,
          suffix: " days",
          label: "Current streak",
          icon: TbFlame,
          accent:
            calData.currentStreak > 0
              ? "text-orange-400"
              : "text-muted-foreground",
        },
        {
          value: calData.longestStreak,
          suffix: " days",
          label: "Longest streak",
          icon: TbTrophy,
          accent: "text-amber-400",
        },
        {
          value: calData.bestDay,
          label: "Best day",
          icon: TbBolt,
          accent: "text-cyan",
        },
      ]
    : [];

  return (
    <Container>
      <style>{`
        @keyframes gh-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <section
        id="github-contrib"
        className="py-10 sm:py-12 md:py-16 lg:py-20 bg-secondary"
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="reveal mb-2 flex flex-wrap items-end gap-4 sm:gap-6">
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

          <p className="reveal mb-8 sm:mb-10 max-w-md font-mono text-[0.72rem] leading-relaxed text-muted-foreground">
            A year of shipped work, one square at a time.
          </p>

          <div className="reveal flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-[35%]">
              {loading ? (
                <div className="grid h-full grid-cols-2 gap-px border border-border bg-border">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem]"
                    >
                      <div
                        className="mb-3 h-7 w-16 rounded bg-muted/40"
                        style={{
                          animation: "gh-pulse 1.6s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="h-3 w-24 rounded bg-muted/40"
                        style={{
                          animation: "gh-pulse 1.6s ease-in-out infinite",
                          animationDelay: "150ms",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                calData && (
                  <div className="grid h-full grid-cols-2 gap-px border border-border bg-border">
                    {stats.map(
                      ({ value, label, suffix, icon: Icon, accent }) => (
                        <div
                          key={label}
                          className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h"
                        >
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <Icon
                            className={`absolute right-4 top-4 sm:right-[1.3rem] sm:top-[1.2rem] text-base opacity-40 transition-opacity group-hover:opacity-70 ${accent}`}
                          />
                          <div className="flex items-baseline gap-1 font-sans text-[1.6rem] tabular-nums sm:text-[1.9rem] font-bold leading-none">
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
                      ),
                    )}
                  </div>
                )
              )}
            </div>

            <div className="lg:w-[65%]">
              {loading ? (
                <div className="h-full border border-border bg-card p-4 sm:p-6">
                  <div
                    className="mb-4 h-3.5 w-40 rounded bg-muted/40"
                    style={{ animation: "gh-pulse 1.6s ease-in-out infinite" }}
                  />
                  <div className="overflow-hidden pl-8.5">
                    <HeatmapSkeleton />
                  </div>
                </div>
              ) : error ? (
                <div className="flex h-full items-center gap-3 border border-border bg-card p-6 font-mono text-[0.78rem] text-muted-foreground">
                  <TbBrandGithub className="shrink-0 text-xl" />
                  Couldn&apos;t load contribution data. Check back later.
                </div>
              ) : (
                calData && (
                  <div className="h-full overflow-x-auto border border-border bg-card p-4 sm:p-6 [-webkit-overflow-scrolling:touch]">
                    <div className="flex w-full min-w-150 flex-col gap-2">
                      <div
                        className="relative mb-2 h-3.5"
                        style={{ paddingLeft: WEEKDAY_COL_PX }}
                      >
                        {calData.monthLabels.map((m, i) => (
                          <span
                            key={`${m.label}-${i}`}
                            className="absolute whitespace-nowrap font-mono text-[0.63rem] text-muted-foreground"
                            style={{
                              left: WEEKDAY_COL_PX + m.weekIndex * STEP_PX,
                            }}
                          >
                            {m.label}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-1">
                        <div
                          className="mr-2 flex flex-col gap-1 pt-px"
                          style={{ width: WEEKDAY_COL_PX - 8 }}
                        >
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
                                    "h-3 w-3 rounded-[3px] transition-transform duration-150 motion-reduce:transition-none",
                                    cell.level === -1
                                      ? "invisible"
                                      : "cursor-default hover:z-10 hover:scale-125 hover:ring-2 hover:ring-primary motion-reduce:hover:scale-100",
                                    cell.level === 0
                                      ? "shadow-[inset_0_0_0_1px_var(--border)]"
                                      : "",
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
                              className={[
                                "h-3 w-3 rounded-[3px]",
                                l === 0
                                  ? "shadow-[inset_0_0_0_1px_var(--border)]"
                                  : "",
                              ].join(" ")}
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
          </div>
        </div>
      </section>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 font-mono text-[0.68rem] text-popover-foreground shadow-lg"
          style={{ left: hover.x, top: hover.y - 8 }}
        >
          {hover.text}
          <span
            className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-border bg-popover"
            aria-hidden
          />
        </div>
      )}
    </Container>
  );
};
