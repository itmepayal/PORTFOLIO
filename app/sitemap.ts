import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Experience from "@/models/experience";
import Project from "@/models/project";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    await connectDB();

    const [projects, experiences] = await Promise.all([
      Project.find({ isPublished: true }).select("_id updatedAt").lean(),
      Experience.find().select("_id updatedAt").lean(),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${siteUrl}/projects/${project._id}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const experienceRoutes: MetadataRoute.Sitemap = experiences.map(
      (experience) => ({
        url: `${siteUrl}/experiences/${experience._id}`,
        lastModified: experience.updatedAt
          ? new Date(experience.updatedAt)
          : now,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    );

    return [...staticRoutes, ...projectRoutes, ...experienceRoutes];
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return staticRoutes;
  }
}
