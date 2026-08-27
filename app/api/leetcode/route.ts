import { getErrorMessage } from "@/lib/utils";
import { fetchLeetCodeProfile, toLeetCodeSyncFields } from "@/lib/leetcode";

export async function GET() {
  try {
    const profile = await fetchLeetCodeProfile();
    const stats = toLeetCodeSyncFields(profile);

    return Response.json({
      success: true,
      username: profile.username,
      profile,
      stats,
    });
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error, "Failed to fetch LeetCode data"),
      },
      { status: 500 },
    );
  }
}
