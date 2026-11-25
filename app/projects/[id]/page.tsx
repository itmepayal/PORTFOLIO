import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/project";
import { ProjectDetailPage } from "@/components/pages/projects/ProjectDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCreativeWorkJsonLd, buildProjectMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getPublishedProject(id: string) {
  await connectDB();
  return Project.findOne({ _id: id, isPublished: true }).lean();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await getPublishedProject(id);
    if (!project) {
      return { title: "Project Not Found" };
    }

    return buildProjectMetadata({
      title: project.title,
      description: project.description,
      image: project.image,
      _id: String(project._id),
    });
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  let jsonLd: Record<string, unknown> | null = null;

  try {
    const project = await getPublishedProject(id);
    if (project) {
      jsonLd = buildCreativeWorkJsonLd({
        title: project.title,
        description: project.description,
        image: project.image,
        _id: String(project._id),
        createdAt: project.createdAt,
      });
    }
  } catch {
    // Client page handles not-found UI if fetch fails.
  }

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <ProjectDetailPage />
    </>
  );
}
