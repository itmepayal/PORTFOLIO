"use client";

import { useEffect, useState } from "react";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";

type Submission = {
  difficulty: Difficulty;
  count: number;
};

type LeetCodeStats = {
  title: string;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  description: string;
};

export const useLeetCodeStats = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/leetcode");
        const json = await res.json();

        if (!json.success) throw new Error("API failed");

        const submissions: Submission[] = json.data.submitStats.acSubmissionNum;

        const map = submissions.reduce<Record<Difficulty, number>>(
          (acc, curr) => {
            acc[curr.difficulty] = curr.count;
            return acc;
          },
          { All: 0, Easy: 0, Medium: 0, Hard: 0 },
        );

        const formatted: LeetCodeStats = {
          title: "LeetCode",
          solved: map.All,
          easy: map.Easy,
          medium: map.Medium,
          hard: map.Hard,
          description:
            "Consistently solving algorithmic challenges with strong focus on optimization.",
        };

        setStats(formatted);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
