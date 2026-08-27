import { connectDB } from "@/lib/db";
import DSA from "@/models/dsa";
import {
  fetchLeetCodeProfile,
  getLeetCodeUsername,
  toLeetCodeSyncFields,
  type LeetCodeSyncFields,
} from "@/lib/leetcode";

const SYNC_INTERVAL_MS = 60 * 60 * 1000;
let lastSyncAt = 0;
let syncInFlight: Promise<LeetCodeSyncFields | null> | null = null;

export async function syncLeetCodeDSARecords(
  dsaId?: string,
  force = false,
): Promise<LeetCodeSyncFields | null> {
  if (!force && !dsaId && Date.now() - lastSyncAt < SYNC_INTERVAL_MS) {
    return null;
  }

  if (syncInFlight && !force && !dsaId) {
    return syncInFlight;
  }

  const run = async (): Promise<LeetCodeSyncFields | null> => {
    await connectDB();

    const profile = await fetchLeetCodeProfile(getLeetCodeUsername());
    const fields = toLeetCodeSyncFields(profile);

    const updatePayload = {
      problemsSolved: fields.problemsSolved,
      progress: fields.progress,
      subtitle: fields.subtitle,
    };

    if (dsaId) {
      const record = await DSA.findById(dsaId);
      if (!record || record.category !== "leetcode") {
        throw new Error("DSA record is not a LeetCode profile");
      }

      await DSA.findByIdAndUpdate(dsaId, updatePayload, {
        runValidators: true,
      });
    } else {
      await DSA.updateMany({ category: "leetcode" }, updatePayload);
      lastSyncAt = Date.now();
    }

    return fields;
  };

  if (!dsaId && !force) {
    syncInFlight = run().finally(() => {
      syncInFlight = null;
    });
    return syncInFlight;
  }

  return run();
}

export async function maybeSyncLeetCodeDSA(): Promise<void> {
  try {
    await syncLeetCodeDSARecords();
  } catch (error) {
    console.error("LeetCode auto-sync failed:", error);
  }
}
