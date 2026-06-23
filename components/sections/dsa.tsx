"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../common/container";

interface DSACard {
  tag: string;
  title: string;
  desc: string;
  pills: { label: string; variant: "hard" | "med" | "easy" | "neutral" }[];
}

const dsaCards: DSACard[] = [
  {
    tag: "Core Topic",
    title: "Dynamic Programming",
    desc: "Mastered patterns: knapsack, LCS, matrix chain, bitmask DP, digit DP. Solved 120+ DP problems.",
    pills: [
      { label: "Hard", variant: "hard" },
      { label: "Memoization", variant: "neutral" },
      { label: "Tabulation", variant: "neutral" },
    ],
  },
  {
    tag: "Core Topic",
    title: "Graph Algorithms",
    desc: "BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Topological sort, SCC with Tarjan/Kosaraju.",
    pills: [
      { label: "Hard", variant: "hard" },
      { label: "Shortest Path", variant: "neutral" },
      { label: "Union-Find", variant: "neutral" },
    ],
  },
  {
    tag: "Core Topic",
    title: "Trees & Segment Trees",
    desc: "Binary trees, BSTs, AVL, Red-Black. Segment trees with lazy propagation for range queries.",
    pills: [
      { label: "Medium", variant: "med" },
      { label: "LCA", variant: "neutral" },
      { label: "BIT / Fenwick", variant: "neutral" },
    ],
  },
  {
    tag: "Core Topic",
    title: "Sliding Window & Two Pointer",
    desc: "Variable-window problems, subarray patterns, monotonic deque, and frequency maps.",
    pills: [
      { label: "Medium", variant: "med" },
      { label: "Arrays", variant: "neutral" },
      { label: "Strings", variant: "neutral" },
    ],
  },
  {
    tag: "Core Topic",
    title: "Backtracking",
    desc: "Permutations, combinations, N-Queens, Sudoku solver. Pruning techniques for exponential problems.",
    pills: [
      { label: "Hard", variant: "hard" },
      { label: "Pruning", variant: "neutral" },
      { label: "State Space", variant: "neutral" },
    ],
  },
  {
    tag: "Core Topic",
    title: "Greedy & Heaps",
    desc: "Interval scheduling, activity selection, median stream, K closest points, Huffman coding.",
    pills: [
      { label: "Easy–Hard", variant: "easy" },
      { label: "Priority Queue", variant: "neutral" },
    ],
  },
];

const proficiency = [
  { label: "Dynamic Programming", pct: 90 },
  { label: "Graph Theory", pct: 85 },
  { label: "Trees & Heaps", pct: 88 },
  { label: "Sliding Window", pct: 95 },
  { label: "Backtracking", pct: 78 },
  { label: "Greedy", pct: 82 },
];

const pillStyles: Record<string, string> = {
  hard: "border-chart-5/40 text-chart-5",
  med: "border-secondary-foreground/40 text-secondary-foreground",
  easy: "border-chart-4/40 text-chart-4",
  neutral: "border-border text-muted-foreground",
};

function useVisibleCount() {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 580) setVisible(1);
      else if (window.innerWidth <= 900) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

export const DSA = () => {
  const visible = useVisibleCount();
  const [step, setStep] = useState(0);
  const touchX = useRef(0);

  const totalSteps = Math.ceil(dsaCards.length / visible);
  const maxStep = totalSteps - 1;

  useEffect(() => {
    if (step > maxStep) setStep(maxStep);
  }, [maxStep, step]);

  const goToStep = (s: number) => setStep(Math.max(0, Math.min(maxStep, s)));
  const slide = (dir: number) => goToStep(step + dir);

  const from = step * visible + 1;
  const to = Math.min((step + 1) * visible, dsaCards.length);

  return (
    <Container>
      <section
        id="dsa"
        className="relative overflow-hidden py-16 sm:py-20 bg-secondary"
      >
        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-10 flex flex-wrap items-end gap-6">
              <div>
                <div className="mb-1 font-mono text-[0.68rem] tracking-[0.15em] text-primary">
                  01 — DSA
                </div>
                <h2 className="text-[clamp(1.6rem,3vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                  Algorithmic Thinking
                </h2>
              </div>
              <div className="h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
            </div>

            <p className="mb-12 max-w-150 font-light text-muted-foreground">
              Competitive programming isn&apos;t just about speed — it&apos;s a
              mindset. I&apos;ve solved 600+ problems across LeetCode,
              Codeforces, and CodeChef, with focus on patterns that translate
              directly to production systems.
            </p>

            <div className="relative mb-12">
              <div
                className="overflow-hidden border border-border"
                onTouchStart={(e) => {
                  touchX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const d = touchX.current - e.changedTouches[0].clientX;
                  if (Math.abs(d) > 50) slide(d > 0 ? 1 : -1);
                }}
              >
                <motion.div
                  className="flex"
                  animate={{ x: `-${step * (100 / visible) * visible}%` }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  {dsaCards.map((card, i) => (
                    <div
                      key={card.title}
                      className="shrink-0 border-r border-border bg-card p-7 transition-colors hover:bg-accent"
                      style={{
                        minWidth: `calc(${100 / visible}% - 1px)`,
                      }}
                    >
                      <div className="mb-3 font-mono text-[0.63rem] uppercase tracking-[0.15em] text-primary">
                        {card.tag}
                      </div>
                      <div className="mb-2 text-[1.05rem] font-bold">
                        {card.title}
                      </div>
                      <div className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {card.desc}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {card.pills.map((pill) => (
                          <span
                            key={pill.label}
                            className={`border px-2.5 py-1 font-mono text-[0.63rem] tracking-[0.05em] ${pillStyles[pill.variant]}`}
                          >
                            {pill.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="font-mono text-[0.68rem] text-muted-foreground">
                  {from}
                  {to > from ? `–${to}` : ""} / {dsaCards.length}
                </div>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToStep(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        i === step ? "scale-[1.4] bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => slide(-1)}
                    disabled={step === 0}
                    aria-label="Previous"
                    className="flex h-9 w-9 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => slide(1)}
                    disabled={step >= maxStep}
                    aria-label="Next"
                    className="flex h-9 w-9 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
            <ProficiencyBars />
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

function ProficiencyBars() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {proficiency.map((item) => (
        <div key={item.label} className="flex items-center gap-4">
          <div className="min-w-32.5 font-mono text-xs tracking-[0.04em] text-muted-foreground">
            {item.label}
          </div>
          <div className="relative h-0.75 flex-1 overflow-hidden bg-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-primary to-chart-3"
            />
          </div>
          <div className="min-w-8.75 text-right font-mono text-xs text-primary">
            {item.pct}%
          </div>
        </div>
      ))}
    </div>
  );
}
