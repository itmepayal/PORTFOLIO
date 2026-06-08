import { connectDB } from "@/lib/db";
import Experience from "@/models/experience";

/* ====================================================== */
/* GET EXPERIENCE STATS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    /* ====================================================== */
    /* TOTAL EXPERIENCES */
    /* ====================================================== */

    const totalExperiences = await Experience.countDocuments();

    /* ====================================================== */
    /* CURRENT JOBS */
    /* ====================================================== */

    const currentExperiences = await Experience.countDocuments({
      current: true,
    });

    /* ====================================================== */
    /* PREVIOUS JOBS */
    /* ====================================================== */

    const previousExperiences = await Experience.countDocuments({
      current: false,
    });

    /* ====================================================== */
    /* FEATURED EXPERIENCES */
    /* ====================================================== */

    const featuredExperiences = await Experience.countDocuments({
      featured: true,
    });

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    const stats = [
      {
        label: "Total Experiences",
        value: totalExperiences,
        growth: "+12.4%",
        icon: "Briefcase",
      },

      {
        label: "Current Roles",
        value: currentExperiences,
        growth: "+8.2%",
        icon: "BadgeCheck",
      },

      {
        label: "Past Roles",
        value: previousExperiences,
        growth: "+5.1%",
        icon: "History",
      },

      {
        label: "Featured",
        value: featuredExperiences,
        growth: "+18.3%",
        icon: "Sparkles",
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
