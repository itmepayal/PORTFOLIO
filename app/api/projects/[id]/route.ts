import { requireAuthSessionOrResponse } from "@/lib/api/auth";
import { jsonError, jsonFromError, jsonSuccess } from "@/lib/api/http";
import { updateProject } from "@/lib/api/handlers/project";
import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/project";
import mongoose from "mongoose";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid project ID", 400);
    }

    const project = await Project.findById(id);
    if (!project) {
      return jsonError("Project not found", 404);
    }

    const session = await getAuthSession();
    if (!session && !project.isPublished) {
      return jsonError("Project not found", 404);
    }

    return jsonSuccess({ project });
  } catch (error) {
    return jsonFromError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuthSessionOrResponse();
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const body = await req.json();
    return await updateProject(id, body);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Work type")) {
      return jsonError(error.message, 400);
    }
    if (error instanceof Error && error.message.includes("Company name")) {
      return jsonError(error.message, 400);
    }
    return jsonFromError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuthSessionOrResponse();
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid project ID", 400);
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError("Project not found", 404);
    }

    return jsonSuccess({ message: "Project deleted successfully" });
  } catch (error) {
    return jsonFromError(error);
  }
}
