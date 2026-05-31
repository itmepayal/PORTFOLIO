import { connectDB } from "@/lib/db";
import Skill from "@/models/skills";

/* ====================================================== */
/* GET SKILL STATS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    /* ====================================================== */
    /* TOTAL SKILLS */
    /* ====================================================== */

    const totalSkills = await Skill.countDocuments();

    /* ====================================================== */
    /* FEATURED SKILLS */
    /* ====================================================== */

    const featuredSkills = await Skill.countDocuments({
      featured: true,
    });

    /* ====================================================== */
    /* FRONTEND */
    /* ====================================================== */

    const frontendSkills = await Skill.countDocuments({
      category: "frontend",
    });

    /* ====================================================== */
    /* BACKEND */
    /* ====================================================== */

    const backendSkills = await Skill.countDocuments({
      category: "backend",
    });

    /* ====================================================== */
    /* AVERAGE LEVEL */
    /* ====================================================== */

    const levels = await Skill.aggregate([
      {
        $group: {
          _id: null,

          averageLevel: {
            $avg: "$level",
          },
        },
      },
    ]);

    const averageLevel = Math.round(levels[0]?.averageLevel || 0);

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    const stats = [
      {
        label: "Total Skills",
        value: totalSkills,
        growth: "+12.4%",
        icon: "Layers3",
      },

      {
        label: "Frontend",
        value: frontendSkills,
        growth: "+9.1%",
        icon: "Monitor",
      },

      {
        label: "Backend",
        value: backendSkills,
        growth: "+14.2%",
        icon: "Server",
      },

      {
        label: "Featured",
        value: featuredSkills,
        growth: "+18.3%",
        icon: "Zap",
      },

      {
        label: "Avg Level",
        value: `${averageLevel}%`,
        growth: "+6.8%",
        icon: "TrendingUp",
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
