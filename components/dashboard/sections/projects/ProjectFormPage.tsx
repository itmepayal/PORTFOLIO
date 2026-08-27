"use client";

import { FolderKanban } from "lucide-react";
import { useParams } from "next/navigation";
import { DashboardFormLayout } from "@/components/dashboard/pages/DashboardFormLayout";
import { DashboardResourceLoader } from "@/components/dashboard/pages/DashboardResourceLoader";
import { ProjectForm } from "@/components/dashboard/sections/projects/ProjectForm";
import { ProjectPreviewPanel } from "@/components/dashboard/sections/projects/ProjectPreviewPanel";
import { useProjectForm } from "@/hooks/use-project-form";

type ProjectFormPageProps = {
  mode: "create" | "edit";
};

export const ProjectFormPage = ({ mode }: ProjectFormPageProps) => {
  const params = useParams();
  const id = mode === "edit" ? (params.id as string) : undefined;

  const {
    values,
    setField,
    featureInput,
    setFeatureInput,
    addFeature,
    removeFeature,
    techInput,
    setTechInput,
    addTech,
    removeTech,
    loading,
    fetching,
    formProgress,
    handleSubmit,
  } = useProjectForm({ mode, id });

  if (mode === "edit" && fetching) {
    return <DashboardResourceLoader label="Loading Project..." />;
  }

  const header = {
    title: mode === "create" ? "Create Project" : "Edit Project",
    description:
      mode === "create"
        ? "Showcase your work with detailed project information and technology stack"
        : "Update your project information and technology stack",
    icon: <FolderKanban className="h-8 w-8" />,
    backHref: "/dashboard/projects",
    progress: formProgress,
  };

  return (
    <DashboardFormLayout
      header={header}
      form={
        <ProjectForm
          values={values}
          onChange={setField}
          featureInput={featureInput}
          setFeatureInput={setFeatureInput}
          onAddFeature={addFeature}
          onRemoveFeature={removeFeature}
          techInput={techInput}
          setTechInput={setTechInput}
          onAddTech={addTech}
          onRemoveTech={removeTech}
          basicInfoDescription={
            mode === "edit"
              ? "Provide your professional experience details"
              : undefined
          }
        />
      }
      preview={
        <ProjectPreviewPanel
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
