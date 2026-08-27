"use client";

import { RefreshCw, Target } from "lucide-react";

type LeetCodeSyncBannerProps = {
  username: string;
  syncing: boolean;
  onSync: () => void;
  easy?: number;
  medium?: number;
  hard?: number;
  ranking?: number;
};

export const LeetCodeSyncBanner = ({
  username,
  syncing,
  onSync,
  easy,
  medium,
  hard,
  ranking,
}: LeetCodeSyncBannerProps) => {
  return (
    <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center border border-yellow-500/30 bg-yellow-500/10 text-yellow-500">
            <Target className="size-4" />
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-yellow-500">
              LeetCode auto-sync
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Problems solved, progress, and subtitle are fetched from LeetCode
              for <span className="text-foreground font-medium">{username}</span>.
              Manual edits are disabled.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSync}
          disabled={syncing}
          className="inline-flex items-center justify-center gap-2 border border-yellow-500/40 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest text-yellow-500 transition-colors hover:bg-yellow-500/10 disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Sync now"}
        </button>
      </div>

      {(easy !== undefined || medium !== undefined || hard !== undefined) && (
        <div className="flex flex-wrap gap-2 font-mono text-[0.62rem] uppercase tracking-widest">
          {easy !== undefined && (
            <span className="border border-border bg-background/60 px-2 py-1 text-emerald-500">
              Easy {easy}
            </span>
          )}
          {medium !== undefined && (
            <span className="border border-border bg-background/60 px-2 py-1 text-amber-500">
              Medium {medium}
            </span>
          )}
          {hard !== undefined && (
            <span className="border border-border bg-background/60 px-2 py-1 text-rose-500">
              Hard {hard}
            </span>
          )}
          {ranking !== undefined && (
            <span className="border border-border bg-background/60 px-2 py-1 text-muted-foreground">
              Rank #{ranking.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
