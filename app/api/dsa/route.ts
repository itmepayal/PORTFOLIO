import { connectDB } from "@/lib/db";
import DSA from "@/models/dsa";

/* ====================================================== */
/* GET ALL DSA */
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

    const query: any = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          subtitle: {
            $regex: search,
            $options: "i",
          },
        },

        {
          desc: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.featured = true;
    }

    const totalDSA = await DSA.countDocuments(query);

    const dsa = await DSA.find(query)
      .sort({
        order: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalDSA / limit);

    return Response.json(
      {
        success: true,
        count: dsa.length,
        dsa,
        pagination: {
          totalDSA,
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
/* CREATE DSA */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const dsa = await DSA.create(body);

    return Response.json(
      {
        success: true,
        message: "DSA record created successfully",
        dsa,
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
