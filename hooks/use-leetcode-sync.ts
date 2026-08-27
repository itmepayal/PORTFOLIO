"use client";

import { getErrorMessage } from "@/lib/utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export type LeetCodeSyncedStats = {
  username?: string;
  problemsSolved: number;
  progress: string;
  subtitle: string;
  easy: number;
  medium: number;
  hard: number;
  ranking?: number;
};

type UseLeetCodeSyncOptions = {
  dsaId?: string;
  onSynced?: (stats: LeetCodeSyncedStats) => void;
};

export const useLeetCodeSync = ({ dsaId, onSynced }: UseLeetCodeSyncOptions = {}) => {
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState<LeetCodeSyncedStats | null>(null);

  const sync = useCallback(
    async (options?: { silent?: boolean }) => {
      try {
        setSyncing(true);

        const response = dsaId
          ? await fetch("/api/dsa/sync-leetcode", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: dsaId, force: true }),
            })
          : await fetch("/api/leetcode");

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to sync LeetCode stats");
        }

        if (data.stats) {
          setStats(data.stats);
          onSynced?.(data.stats);
        }

        if (!options?.silent && dsaId && data.synced) {
          toast.success("LeetCode stats updated");
        }

        return data.stats as LeetCodeSyncedStats | undefined;
      } catch (error: unknown) {
        if (!options?.silent) {
          toast.error(getErrorMessage(error));
        }
        return undefined;
      } finally {
        setSyncing(false);
      }
    },
    [dsaId, onSynced],
  );

  return { sync, syncing, stats };
};
