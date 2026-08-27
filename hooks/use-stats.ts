"use client";
import { getErrorMessage } from "@/lib/utils";

import { useEffect, useState } from "react";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";

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

        if (!json.success) throw new Error(json.message || "API failed");

        const profile = json.profile;
        const submissions: Array<{ difficulty: Difficulty; count: number }> =
          profile?.solved
            ? [
                { difficulty: "All", count: profile.solved.all },
                { difficulty: "Easy", count: profile.solved.easy },
                { difficulty: "Medium", count: profile.solved.medium },
                { difficulty: "Hard", count: profile.solved.hard },
              ]
            : profile?.submitStats?.acSubmissionNum || [];

        const map = submissions.reduce<Record<Difficulty, number>>(
          (acc, curr) => {
            acc[curr.difficulty] = curr.count;
            return acc;
          },
          { All: 0, Easy: 0, Medium: 0, Hard: 0 },
        );

        const formatted: LeetCodeStats = {
          title: "LeetCode",
          solved: json.stats?.problemsSolved ?? map.All,
          easy: json.stats?.easy ?? map.Easy,
          medium: json.stats?.medium ?? map.Medium,
          hard: json.stats?.hard ?? map.Hard,
          description:
            "Consistently solving algorithmic challenges with strong focus on optimization.",
        };

        setStats(formatted);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Something went wrong"));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
