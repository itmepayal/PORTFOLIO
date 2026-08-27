import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Experience from "@/models/experience";
import { ExperienceDetailPage } from "@/components/pages/experiences/ExperienceDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildExperienceMetadata,
  buildWorkExperienceJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getExperience(id: string) {
  await connectDB();
  return Experience.findById(id).lean();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const experience = await getExperience(id);
    if (!experience) {
      return { title: "Experience Not Found" };
    }

    return buildExperienceMetadata({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      _id: String(experience._id),
    });
  } catch {
    return { title: "Experience" };
  }
}

export default async function ExperiencePage({ params }: PageProps) {
  const { id } = await params;
  let jsonLd: Record<string, unknown> | null = null;

  try {
    const experience = await getExperience(id);
    if (experience) {
      jsonLd = buildWorkExperienceJsonLd({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        _id: String(experience._id),
      });
    }
  } catch {
    // Client page handles not-found UI if fetch fails.
  }

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <ExperienceDetailPage />
    </>
  );
}
