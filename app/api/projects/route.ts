import { connectDB } from "@/lib/db";
import Project from "@/models/project";

/* ====================================================== */
/* GET ALL PROJECTS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({
      createdAt: -1,
    });

    return Response.json(
      {
        success: true,
        count: projects.length,
        projects,
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
/* CREATE PROJECT */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const project = await Project.create(body);

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
