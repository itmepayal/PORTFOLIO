import { getErrorMessage } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { maybeSyncLeetCodeDSA } from "@/lib/sync-leetcode-dsa";
import DSA from "@/models/dsa";
import Experience from "@/models/experience";
import Project from "@/models/project";
import Skill from "@/models/skills";

export async function GET() {
  try {
    await connectDB();
    await maybeSyncLeetCodeDSA();

    const [publishedProjects, experiences, skills, dsaRecords] = await Promise.all([
      Project.countDocuments({ isPublished: true }),
      Experience.countDocuments(),
      Skill.countDocuments(),
      DSA.find().select("problemsSolved"),
    ]);

    const totalProblemsSolved = dsaRecords.reduce(
      (sum, record) => sum + (record.problemsSolved || 0),
      0,
    );

    return Response.json({
      success: true,
      stats: {
        projects: publishedProjects,
        experiences: experiences,
        skills: skills,
        problemsSolved: totalProblemsSolved,
      },
    });
  } catch (error: unknown) {
    return Response.json(
      { success: false, message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
