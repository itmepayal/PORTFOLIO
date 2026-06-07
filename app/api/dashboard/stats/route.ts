import { connectDB } from "@/lib/db";

import DSA from "@/models/dsa";
import Enquiry from "@/models/enquiry";
import Experience from "@/models/experience";
import Project from "@/models/project";
import Skill from "@/models/skills";

export async function GET() {
  try {
    await connectDB();

    const [
      totalDSA,
      totalEnquiries,
      totalExperiences,
      totalProjects,
      totalSkills,
    ] = await Promise.all([
      DSA.countDocuments(),
      Enquiry.countDocuments(),
      Experience.countDocuments(),
      Project.countDocuments(),
      Skill.countDocuments(),
    ]);

    const [problemStats] = await DSA.aggregate([
      {
        $group: {
          _id: null,
          totalSolved: { $sum: "$problemsSolved" },
        },
      },
    ]);

    const totalSolved = problemStats?.totalSolved || 0;

    const sections = [
      totalProjects,
      totalExperiences,
      totalSkills,
      totalDSA,
      totalEnquiries,
    ];

    const completedSections = sections.filter((value) => value > 0).length;

    const completionPercentage = Math.round(
      (completedSections / sections.length) * 100,
    );

    const stats = [
      {
        label: "Projects",
        value: totalProjects,
        icon: "FolderKanban",
      },
      {
        label: "Experiences",
        value: totalExperiences,
        icon: "BriefcaseBusiness",
      },
      {
        label: "Skills",
        value: totalSkills,
        icon: "Brain",
      },
      {
        label: "DSA Records",
        value: totalDSA,
        icon: "Code2",
      },
      {
        label: "Enquiries",
        value: totalEnquiries,
        icon: "MessageSquareMore",
      },
    ];

    return Response.json(
      {
        success: true,
        stats,
        completionPercentage,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("Dashboard stats error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to fetch dashboard statistics",
      },
      {
        status: 500,
      },
    );
  }
}
