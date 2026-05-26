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
