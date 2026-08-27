export type LeetCodeDifficulty = "All" | "Easy" | "Medium" | "Hard";

export type LeetCodeSolvedStats = {
  all: number;
  easy: number;
  medium: number;
  hard: number;
};

export type LeetCodeProfile = {
  username: string;
  ranking?: number;
  reputation?: number;
  solved: LeetCodeSolvedStats;
};

export type LeetCodeSyncFields = {
  username?: string;
  problemsSolved: number;
  progress: string;
  subtitle: string;
  easy: number;
  medium: number;
  hard: number;
  ranking?: number;
};

const GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
        reputation
      }
    }
  }
`;

export function getLeetCodeUsername(): string {
  return process.env.LEETCODE_USERNAME || "Payal_Leet_Code";
}

export function getLeetCodeProgressGoal(): number {
  const goal = Number(process.env.LEETCODE_PROGRESS_GOAL || 1000);
  return goal > 0 ? goal : 1000;
}

export function computeLeetCodeProgress(totalSolved: number): string {
  const pct = Math.min(
    100,
    Math.round((totalSolved / getLeetCodeProgressGoal()) * 100),
  );
  return `${pct}%`;
}

export function buildLeetCodeSubtitle(totalSolved: number): string {
  return `${totalSolved}+ Problems Solved`;
}

export function toLeetCodeSyncFields(profile: LeetCodeProfile): LeetCodeSyncFields {
  const total = profile.solved.all;
  return {
    username: profile.username,
    problemsSolved: total,
    progress: computeLeetCodeProgress(total),
    subtitle: buildLeetCodeSubtitle(total),
    easy: profile.solved.easy,
    medium: profile.solved.medium,
    hard: profile.solved.hard,
    ranking: profile.ranking,
  };
}

function mapSubmissionCounts(
  submissions: Array<{ difficulty: string; count: number }>,
): LeetCodeSolvedStats {
  const map = submissions.reduce<Record<LeetCodeDifficulty, number>>(
    (acc, item) => {
      const key = item.difficulty as LeetCodeDifficulty;
      if (key in acc) acc[key] = item.count;
      return acc;
    },
    { All: 0, Easy: 0, Medium: 0, Hard: 0 },
  );

  return {
    all: map.All,
    easy: map.Easy,
    medium: map.Medium,
    hard: map.Hard,
  };
}

async function fetchFromGraphQL(username: string): Promise<LeetCodeProfile> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      Origin: "https://leetcode.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { username },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`LeetCode GraphQL failed (${res.status})`);
  }

  const json = await res.json();
  const matchedUser = json?.data?.matchedUser;

  if (!matchedUser) {
    throw new Error("LeetCode user not found");
  }

  return {
    username: matchedUser.username,
    ranking: matchedUser.profile?.ranking,
    reputation: matchedUser.profile?.reputation,
    solved: mapSubmissionCounts(matchedUser.submitStats.acSubmissionNum),
  };
}

async function fetchFromWrapper(username: string): Promise<LeetCodeProfile> {
  const base =
    process.env.LEETCODE_API_BASE || "https://leetcode-api-pied.vercel.app";
  const res = await fetch(`${base}/user/${encodeURIComponent(username)}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`LeetCode wrapper API failed (${res.status})`);
  }

  const json = await res.json();

  if (!json?.submitStats?.acSubmissionNum) {
    throw new Error("Invalid LeetCode wrapper response");
  }

  return {
    username: json.username || username,
    ranking: json.profile?.ranking,
    reputation: json.profile?.reputation,
    solved: mapSubmissionCounts(json.submitStats.acSubmissionNum),
  };
}

export async function fetchLeetCodeProfile(
  username?: string,
): Promise<LeetCodeProfile> {
  const resolvedUsername = username || getLeetCodeUsername();

  try {
    return await fetchFromGraphQL(resolvedUsername);
  } catch {
    return await fetchFromWrapper(resolvedUsername);
  }
}
