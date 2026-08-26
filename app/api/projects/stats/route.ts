import { getErrorMessage } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import Project from "@/models/project";

/* ====================================================== */
/* GET PROJECT STATS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    /* ====================================================== */
    /* TOTAL */
    /* ====================================================== */

    const totalProjects = await Project.countDocuments();

    /* ====================================================== */
    /* PUBLISHED */
    /* ====================================================== */

    const publishedProjects = await Project.countDocuments({
      isPublished: true,
    });

    /* ====================================================== */
    /* DRAFT */
    /* ====================================================== */

    const draftProjects = await Project.countDocuments({
      isPublished: false,
    });

    /* ====================================================== */
    /* FEATURED */
    /* ====================================================== */

    const featuredProjects = await Project.countDocuments({
      featured: true,
    });

    const [companyProjects, freelanceProjects, selfProjects] = await Promise.all([
      Project.countDocuments({ workType: "company" }),
      Project.countDocuments({ workType: "freelance" }),
      Project.countDocuments({ workType: "self" }),
    ]);

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    const stats = [
      {
        label: "Total Projects",
        value: totalProjects,
        growth: "+12.4%",
        icon: "FolderKanban",
      },

      {
        label: "Published",
        value: publishedProjects,
        growth: "+8.2%",
        icon: "CheckCircle2",
      },

      {
        label: "Draft Projects",
        value: draftProjects,
        growth: "+2.1%",
        icon: "CircleDashed",
      },

      {
        label: "Featured",
        value: featuredProjects,
        growth: "+18.3%",
        icon: "Zap",
      },
    ];

    const workTypeStats = [
      {
        label: "Company",
        value: companyProjects,
        workType: "company",
      },
      {
        label: "Freelance",
        value: freelanceProjects,
        workType: "freelance",
      },
      {
        label: "Self",
        value: selfProjects,
        workType: "self",
      },
    ];

    return Response.json(
      {
        success: true,
        stats,
        workTypeStats,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
