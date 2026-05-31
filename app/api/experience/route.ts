import { connectDB } from "@/lib/db";
import Experience from "@/models/experience";

/* ====================================================== */
/* GET ALL EXPERIENCES */
/* ====================================================== */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";
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
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          position: {
            $regex: search,
            $options: "i",
          },
        },
        {
          technologies: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* FEATURED FILTER */

    if (featured === "true") {
      query.featured = true;
    }

    /* ====================================================== */
    /* TOTAL COUNT */
    /* ====================================================== */

    const totalExperiences = await Experience.countDocuments(query);

    /* ====================================================== */
    /* GET EXPERIENCES */
    /* ====================================================== */

    const experiences = await Experience.find(query)
      .sort({
        order: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    /* ====================================================== */
    /* PAGINATION */
    /* ====================================================== */

    const totalPages = Math.ceil(totalExperiences / limit);

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    return Response.json(
      {
        success: true,

        count: experiences.length,

        experiences,

        pagination: {
          totalExperiences,
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
/* CREATE EXPERIENCE */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const experience = await Experience.create(body);
    return Response.json(
      {
        success: true,
        message: "Experience created successfully",
        experience,
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
