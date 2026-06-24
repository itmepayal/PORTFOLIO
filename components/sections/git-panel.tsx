"use client";

import { useMemo, useRef, useState } from "react";
import { Container } from "../common/container";

/* ────────────────────────────────────────────────────────────────────────
   Exact 1:1 port of the seed/level + calendar-building logic from
   index.html's <script> block. Deterministic, no API calls.
   ──────────────────────────────────────────────────────────────────────── */

const WEEKS = 53;
const CELL = 12; // px, matches .contrib-cell width/height
const GAP = 4; // px, matches .contrib-week / .contrib-weeks gap

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

const LEVEL_LABELS: Record<number, string> = {
  0: "No",
  1: "1-2",
  2: "3-5",
  3: "6-9",
  4: "10+",
};

function seed(n: number) {
  const x = Math.sin(n + 42) * 10000;
  return x - Math.floor(x);
}

function getLevel(dayIndex: number, startDow: number): 0 | 1 | 2 | 3 | 4 {
  const s = seed(dayIndex);
  const dow = (startDow + dayIndex) % 7;
  const wp = dow === 0 || dow === 6 ? 0.5 : 1;
  const str = seed(Math.floor(dayIndex / 7) * 13) > 0.3 ? 1 : 0.4;
  const v = s * wp * str;
  if (v < 0.12) return 0;
  if (v < 0.32) return 1;
  if (v < 0.55) return 2;
  if (v < 0.78) return 3;
  return 4;
}

type Cell = {
  date: Date;
  level: -1 | 0 | 1 | 2 | 3 | 4;
  title: string;
};

type MonthLabel = {
  label: string;
  weekIndex: number;
};

function buildCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (WEEKS * 7 - 1));
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const startDow = startDate.getDay();

  const weeks: Cell[][] = [];
  const monthLabels: MonthLabel[] = [];
  let lastMonth = -1;
  let dayIndex = 0;

  for (let w = 0; w < WEEKS; w++) {
    const week: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + dayIndex);
      const month = cellDate.getMonth();

      if (month !== lastMonth && d === 0) {
        monthLabels.push({ label: MONTHS[month], weekIndex: w });
        lastMonth = month;
      }

      const lv: Cell["level"] =
        cellDate > today ? -1 : getLevel(dayIndex, startDow);
      const dateStr = cellDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const title = `${dateStr} · ${LEVEL_LABELS[lv] ?? "No"} contributions`;

      week.push({ date: cellDate, level: lv, title });
      dayIndex++;
    }
    weeks.push(week);
  }

  return { weeks, monthLabels };
}

const LEVEL_BG: Record<number, string> = {
  0: "var(--gh-cell, #161b22)",
  1: "var(--gh-l1, #0e4429)",
  2: "var(--gh-l2, #006d32)",
  3: "var(--gh-l3, #26a641)",
  4: "var(--gh-l4, #39d353)",
};

/* ────────────────────────────────────────────────────────────────────────
   GithubPanel — exact 1:1 visual port of index.html's #github-contrib
   section. Mirrors the same structural pattern as Projects.tsx: same
   outer section padding scale, same .section-header markup (eyebrow +
   title + hairline), same sharp-cornered border-grid card language
   (bg-border + gap-px + border + border-border), no radius, no shadow,
   no decorative glow — exactly like the rest of the site.
   ──────────────────────────────────────────────────────────────────────── */

export const GithubPanel = () => {
  const { weeks, monthLabels } = useMemo(buildCalendar, []);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
              Jun 2025 — Jun 2026
            </div>
          </div>

          {/* ── .contrib-stats : 4 static cards, sharp border grid, no radius,
                same bg-border + gap-px + border border-border language as the
                projects grid in Projects.tsx ── */}
          <div className="reveal mb-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            <div className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-baseline gap-1 font-sans text-[1.6rem] sm:text-[1.9rem] font-bold leading-none">
                <span className="bg-linear-to-br from-primary to-cyan bg-clip-text text-transparent">
                  1,847
                </span>
              </div>
              <div className="mt-2 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                Contributions
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute right-4 top-4 sm:right-[1.3rem] sm:top-[1.2rem] text-base opacity-50">
                🔥
              </span>
              <div className="flex items-baseline gap-1 font-sans text-[1.6rem] sm:text-[1.9rem] font-bold leading-none">
                <span className="bg-linear-to-br from-primary to-cyan bg-clip-text text-transparent">
                  23
                </span>
                <span className="font-mono text-[0.85rem] sm:text-[0.95rem] font-normal text-muted-foreground">
                  days
                </span>
              </div>
              <div className="mt-2 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                Current Streak
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-baseline gap-1 font-sans text-[1.6rem] sm:text-[1.9rem] font-bold leading-none">
                <span className="bg-linear-to-br from-primary to-cyan bg-clip-text text-transparent">
                  41
                </span>
                <span className="font-mono text-[0.85rem] sm:text-[0.95rem] font-normal text-muted-foreground">
                  days
                </span>
              </div>
              <div className="mt-2 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                Longest Streak
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card px-5 py-5 sm:px-6 sm:py-[1.4rem] transition-colors hover:bg-card-h">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-baseline gap-1 font-sans text-[1.6rem] sm:text-[1.9rem] font-bold leading-none">
                <span className="bg-linear-to-br from-primary to-cyan bg-clip-text text-transparent">
                  14
                </span>
              </div>
              <div className="mt-2 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                Best Day
              </div>
            </div>
          </div>

          {/* ── .contrib-wrapper : sharp border box, no radius, no shadow,
                matches .proj-card's flat bg-card + border-border language ── */}
          <div
            ref={wrapperRef}
            className="reveal overflow-x-auto border border-border bg-card p-4 sm:p-6 [-webkit-overflow-scrolling:touch]"
          >
            <div className="flex min-w-[600px] flex-col gap-2">
              {/* month labels, absolutely positioned exactly like .contrib-months */}
              <div className="relative mb-2 h-3.5 pl-[34px]">
                {monthLabels.map((m, i) => (
                  <span
                    key={`${m.label}-${i}`}
                    className="absolute whitespace-nowrap font-mono text-[0.63rem] text-muted-foreground"
                    style={{ left: `${34 + m.weekIndex * (CELL + GAP)}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-1">
                {/* day-of-week labels, exactly like .contrib-day-labels */}
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

                {/* weeks → cells, exactly like .contrib-weeks > .contrib-week > .contrib-cell */}
                <div className="flex flex-1 gap-1">
                  {weeks.map((week, wi) => (
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

            {/* ── .contrib-footer : summary text + legend ── */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <p className="font-mono text-[0.68rem] sm:text-xs text-muted-foreground">
                Most active on{" "}
                <span className="font-semibold text-green">Tuesdays</span> · avg{" "}
                <span className="font-semibold text-green">5.1</span>/day
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.62rem] text-muted-foreground">
                  Less
                </span>
                <div className="flex gap-[3px]">
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: LEVEL_BG[0] }}
                  />
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: LEVEL_BG[1] }}
                  />
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: LEVEL_BG[2] }}
                  />
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: LEVEL_BG[3] }}
                  />
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: LEVEL_BG[4] }}
                  />
                </div>
                <span className="font-mono text-[0.62rem] text-muted-foreground">
                  More
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* native title= attribute on each cell already gives a tooltip on hover,
          this floating one mirrors the original's hover affordance for nicer styling */}
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
