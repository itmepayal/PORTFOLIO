import { connectDB } from "@/lib/db";
import Skill from "@/models/skills";

/* ====================================================== */
/* GET ALL SKILLS */
/* ====================================================== */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const featured = searchParams.get("featured") || "";
    const skip = (page - 1) * limit;

    /* ====================================================== */
    /* QUERY */
    /* ====================================================== */

    const query: any = {};

    /* SEARCH */

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          category: {
            $regex: search,
            $options: "i",
          },
        },

        {
          icon: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* CATEGORY FILTER */

    if (category !== "All") {
      query.category = category;
    }

    /* FEATURED FILTER */

    if (featured === "true") {
      query.featured = true;
    }

    /* ====================================================== */
    /* TOTAL COUNT */
    /* ====================================================== */

    const totalSkills = await Skill.countDocuments(query);

    /* ====================================================== */
    /* GET SKILLS */
    /* ====================================================== */

    const skills = await Skill.find(query)
      .sort({
        order: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    /* ====================================================== */
    /* PAGINATION */
    /* ====================================================== */

    const totalPages = Math.ceil(totalSkills / limit);

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    return Response.json(
      {
        success: true,

        count: skills.length,

        skills,

        pagination: {
          totalSkills,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
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

/* ====================================================== */
/* CREATE SKILL */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const skill = await Skill.create(body);

    return Response.json(
      {
        success: true,

        message: "Skill created successfully",

        skill,
      },
      {
        status: 201,
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
