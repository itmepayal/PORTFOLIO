import { requireAuthSessionOrResponse } from "@/lib/api/auth";
import { skillCrud } from "@/lib/api/handlers/skill";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return skillCrud.getById(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuthSessionOrResponse();
  if (auth.response) return auth.response;

  const { id } = await params;
  const body = await req.json();
  return skillCrud.updateById(id, body);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuthSessionOrResponse();
  if (auth.response) return auth.response;

  const { id } = await params;
  return skillCrud.deleteById(id);
}
