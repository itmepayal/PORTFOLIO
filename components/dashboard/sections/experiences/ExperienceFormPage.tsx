"use client";

import { Building2, FolderKanban } from "lucide-react";
import { useParams } from "next/navigation";
import { DashboardFormLayout } from "@/components/dashboard/pages/DashboardFormLayout";
import { DashboardResourceLoader } from "@/components/dashboard/pages/DashboardResourceLoader";
import { ExperienceForm } from "@/components/dashboard/sections/experiences/ExperienceForm";
import { ExperiencePreviewPanel } from "@/components/dashboard/sections/experiences/ExperiencePreviewPanel";
import { useExperienceForm } from "@/hooks/use-experience-form";

type ExperienceFormPageProps = {
  mode: "create" | "edit";
};

export const ExperienceFormPage = ({ mode }: ExperienceFormPageProps) => {
  const params = useParams();
  const id = mode === "edit" ? (params.id as string) : undefined;

  const {
    values,
    setField,
    loading,
    fetching,
    formProgress,
    handleSubmit,
    responsibilityInput,
    setResponsibilityInput,
    techInput,
    setTechInput,
    addResponsibility,
    removeResponsibility,
    addTech,
    removeTech,
  } = useExperienceForm({ mode, id });

  if (mode === "edit" && fetching) {
    return <DashboardResourceLoader label="Loading Experience..." />;
  }

  const header = {
    title: mode === "create" ? "Create Experience" : "Edit Experience",
    description:
      mode === "create"
        ? "Add your professional work history with responsibilities and tech stack"
        : "Update your professional experience information",
    icon:
      mode === "create" ? (
        <Building2 className="h-8 w-8" />
      ) : (
        <FolderKanban className="h-8 w-8" />
      ),
    backHref: "/dashboard/experiences",
    progress: formProgress,
  };

  return (
    <DashboardFormLayout
      header={header}
      form={
        <ExperienceForm
          values={values}
          onChange={setField}
          responsibilityInput={responsibilityInput}
          setResponsibilityInput={setResponsibilityInput}
          techInput={techInput}
          setTechInput={setTechInput}
          onAddResponsibility={addResponsibility}
          onRemoveResponsibility={removeResponsibility}
          onAddTech={addTech}
          onRemoveTech={removeTech}
        />
      }
      preview={
        <ExperiencePreviewPanel
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
