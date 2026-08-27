"use client";

import { FolderKanban } from "lucide-react";
import { useParams } from "next/navigation";
import { DashboardFormLayout } from "@/components/dashboard/pages/DashboardFormLayout";
import { DashboardResourceLoader } from "@/components/dashboard/pages/DashboardResourceLoader";
import { SkillForm } from "@/components/dashboard/sections/skills/SkillForm";
import { SkillPreviewPanel } from "@/components/dashboard/sections/skills/SkillPreviewPanel";
import { useSkillForm } from "@/hooks/use-skill-form";

type SkillFormPageProps = {
  mode: "create" | "edit";
};

export const SkillFormPage = ({ mode }: SkillFormPageProps) => {
  const params = useParams();
  const id = mode === "edit" ? (params.id as string) : undefined;

  const { values, setField, loading, fetching, formProgress, handleSubmit } =
    useSkillForm({ mode, id });

  if (mode === "edit" && fetching) {
    return <DashboardResourceLoader label="Loading skill..." />;
  }

  const header = {
    title: mode === "create" ? "Create Skill" : "Edit Skill",
    description: "Track your coding progress professionally",
    icon: <FolderKanban className="h-8 w-8" />,
    backHref: "/dashboard/skills",
    progress: formProgress,
  };

  return (
    <DashboardFormLayout
      header={header}
      form={<SkillForm values={values} onChange={setField} />}
      preview={
        <SkillPreviewPanel
          values={values}
          formProgress={formProgress}
          loading={loading}
          onSubmit={handleSubmit}
          mode={mode}
        />
      }
    />
  );
};
