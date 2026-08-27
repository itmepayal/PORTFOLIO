"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DetailLoading } from "@/components/pages/shared/DetailLoading";
import { DetailNotFound } from "@/components/pages/shared/DetailNotFound";
import { getAccentLine } from "@/components/pages/shared/detail-constants";
import { ExperienceDetailHero } from "./ExperienceDetailHero";
import {
  ExperienceDetailAbout,
  ExperienceDetailStats,
} from "./ExperienceDetailStats";
import {
  ExperienceDetailResponsibilities,
  ExperienceDetailTechStack,
} from "./ExperienceDetailSections";
import {
  ExperienceDetailActions,
  ExperienceDetailCta,
} from "./ExperienceDetailFooter";
import {
  getExperienceDuration,
  getExperienceTenure,
  type Experience,
} from "./experience-types";

export const ExperienceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/experiences/${id}`);
        const data = await res.json();
        if (data.success) {
          setExperience(data.experience);
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
  if (error || !experience) {
    return (
      <DetailNotFound entity="Experience" onBack={() => router.back()} />
    );
  }

  const tenure = getExperienceTenure(experience);
  const durationLabel = getExperienceDuration(experience);

  return (
    <div className="min-h-screen bg-background pt-8">
      <ExperienceDetailHero
        experience={experience}
        accentLine={getAccentLine(experience._id)}
        tenure={tenure}
        onBackHome={() => router.push("/")}
      />
      <ExperienceDetailStats
        experience={experience}
        durationLabel={durationLabel}
      />
      <ExperienceDetailAbout experience={experience} />
      <ExperienceDetailTechStack experience={experience} />
      <ExperienceDetailResponsibilities experience={experience} />
      <ExperienceDetailActions
        experience={experience}
        tenure={tenure}
        onBack={() => router.back()}
      />
      <ExperienceDetailCta onBack={() => router.back()} />
    </div>
  );
};
