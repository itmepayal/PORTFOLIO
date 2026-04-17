export async function GET(req) {
  const username = "Payal_Leet_Code";

  const query = `
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

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return Response.json({
      success: true,
      data: data.data.matchedUser,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch LeetCode data",
    });
  }
}
