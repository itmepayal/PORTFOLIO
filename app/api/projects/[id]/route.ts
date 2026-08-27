import { projectCrud, updateProject } from "@/lib/api/handlers/project";
import { jsonError, jsonFromError } from "@/lib/api/http";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return projectCrud.getById(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const { id } = await params;
  return projectCrud.deleteById(id);
}
