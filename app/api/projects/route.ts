import { getErrorMessage } from "@/lib/utils";
import {
  isProjectWorkType,
  sanitizeProjectPayload,
  validateProjectWorkType,
} from "@/lib/project";
import { connectDB } from "@/lib/db";
import Project from "@/models/project";

/* ====================================================== */
/* GET ALL PROJECTS */
/* ====================================================== */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "All";
    const workType = searchParams.get("workType") || "";
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (filter === "Published") {
      query.isPublished = true;
    }

    if (filter === "Draft") {
      query.isPublished = false;
    }

    if (workType && isProjectWorkType(workType)) {
      query.workType = workType;
    }

    const totalProjects = await Project.countDocuments(query);

    const projects = await Project.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProjects / limit);

    return Response.json(
      {
        success: true,

        projects,

        pagination: {
          totalProjects,
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

/* ====================================================== */
/* CREATE PROJECT */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const validationError = validateProjectWorkType(body.workType, body.company);

    if (validationError) {
      return Response.json(
        {
          success: false,
          message: validationError,
        },
        {
          status: 400,
        },
      );
    }

    const project = await Project.create(sanitizeProjectPayload(body));

    return Response.json(
      {
        success: true,
        message: "Project created successfully",
        project,
      },
      {
        status: 201,
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
