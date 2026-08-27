import { getErrorMessage } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { fetchLeetCodeProfile, toLeetCodeSyncFields } from "@/lib/leetcode";
import { syncLeetCodeDSARecords } from "@/lib/sync-leetcode-dsa";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const id = typeof body.id === "string" ? body.id : undefined;
    const force = body.force === true;

    const stats = await syncLeetCodeDSARecords(id, force || Boolean(id));
    const profile = await fetchLeetCodeProfile();

    if (!stats) {
      const fields = toLeetCodeSyncFields(profile);
      return Response.json({
        success: true,
        message: "LeetCode stats are already up to date",
        stats: fields,
        synced: false,
      });
    }

    return Response.json({
      success: true,
      message: "LeetCode stats synced successfully",
      stats: { ...stats, username: profile.username },
      synced: true,
    });
  } catch (error: unknown) {
    return Response.json(
      { success: false, message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
