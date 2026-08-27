"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DetailLoading } from "@/components/pages/shared/DetailLoading";
import { DetailNotFound } from "@/components/pages/shared/DetailNotFound";
import { getAccentLine } from "@/components/pages/shared/detail-constants";
import { ProjectDetailHero } from "./ProjectDetailHero";
import {
  ProjectDetailAbout,
  ProjectDetailStats,
} from "./ProjectDetailStats";
import {
  ProjectDetailFeatures,
  ProjectDetailTechStack,
} from "./ProjectDetailSections";
import {
  ProjectDetailActions,
  ProjectDetailCta,
} from "./ProjectDetailFooter";
import type { Project } from "./project-types";

export const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (data.success) {
          setProject(data.project);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <DetailLoading />;
  if (error || !project) {
    return (
      <DetailNotFound entity="Project" onBack={() => router.back()} />
    );
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <div className="min-h-screen bg-background pt-8">
      <ProjectDetailHero
        project={project}
        accentLine={getAccentLine(project._id)}
        formattedDate={formattedDate}
        onBackHome={() => router.push("/")}
      />
      <ProjectDetailStats project={project} />
      <ProjectDetailAbout project={project} />
      <ProjectDetailTechStack project={project} />
      <ProjectDetailFeatures project={project} />
      <ProjectDetailActions
        project={project}
        formattedDate={formattedDate}
      />
      <ProjectDetailCta onBack={() => router.back()} />
    </div>
  );
};
