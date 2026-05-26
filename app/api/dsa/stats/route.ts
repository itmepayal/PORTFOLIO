import { connectDB } from "@/lib/db";
import DSA from "@/models/dsa";

/* ====================================================== */
/* GET DSA STATS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    const totalDSA = await DSA.countDocuments();

    const featuredDSA = await DSA.countDocuments({
      featured: true,
    });

    const leetcodeCount = await DSA.countDocuments({
      category: "leetcode",
    });

    const striverCount = await DSA.countDocuments({
      category: "striver",
    });

    const problems = await DSA.aggregate([
      {
        $group: {
          _id: null,
          totalSolved: {
            $sum: "$problemsSolved",
          },
        },
      },
    ]);

    const totalSolved = problems[0]?.totalSolved || 0;

    const stats = [
      {
        label: "Total Records",
        value: totalDSA,
        growth: "+12.4%",
        icon: "FolderKanban",
      },

      {
        label: "Problems Solved",
        value: totalSolved,
        growth: "+18.6%",
        icon: "Brain",
      },

      {
        label: "LeetCode",
        value: leetcodeCount,
        growth: "+9.1%",
        icon: "Code2",
      },

      {
        label: "Striver A2Z",
        value: striverCount,
        growth: "+6.8%",
        icon: "Target",
      },

      {
        label: "Featured",
        value: featuredDSA,
        growth: "+15.2%",
        icon: "Zap",
      },
    ];

    return Response.json(
      {
        success: true,
        stats,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
