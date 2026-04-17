"use client";

import { useEffect, useState } from "react";

type LeetCodeStats = {
  title: string;
  solved: number;
  total: number;
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

        if (!json.success) {
          throw new Error("API failed");
        }

        const data = json.data.submitStats.acSubmissionNum;

        const formatted: LeetCodeStats = {
          title: "LeetCode",
          solved: data.find((d: any) => d.difficulty === "All")?.count || 0,
          easy: data.find((d: any) => d.difficulty === "Easy")?.count || 0,
          medium: data.find((d: any) => d.difficulty === "Medium")?.count || 0,
          hard: data.find((d: any) => d.difficulty === "Hard")?.count || 0,
          total: 3902,
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
