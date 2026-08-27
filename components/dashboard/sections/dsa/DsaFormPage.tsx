"use client";

import { Brain, FolderKanban } from "lucide-react";
import { useParams } from "next/navigation";
import { DashboardFormLayout } from "@/components/dashboard/pages/DashboardFormLayout";
import { DashboardResourceLoader } from "@/components/dashboard/pages/DashboardResourceLoader";
import { DsaForm } from "@/components/dashboard/sections/dsa/DsaForm";
import { DsaPreviewPanel } from "@/components/dashboard/sections/dsa/DsaPreviewPanel";
import { useDsaForm } from "@/hooks/use-dsa-form";

type DsaFormPageProps = {
  mode: "create" | "edit";
};

export const DsaFormPage = ({ mode }: DsaFormPageProps) => {
  const params = useParams();
  const id = mode === "edit" ? (params.id as string) : undefined;

  const {
    values,
    setField,
    loading,
    fetching,
    formProgress,
    handleSubmit,
    isLeetCode,
    leetcodeUsername,
    leetCodeBreakdown,
    syncLeetCode,
    leetcodeSyncing,
  } = useDsaForm({ mode, id });

  if (mode === "edit" && fetching) {
    return <DashboardResourceLoader label="Loading DSA..." />;
  }

  const header = {
    title: mode === "create" ? "Create DSA Profile" : "Edit DSA Profile",
    description: "Track your problem-solving journey and coding achievements",
    icon:
      mode === "create" ? (
        <Brain className="h-8 w-8" />
      ) : (
        <FolderKanban className="h-8 w-8" />
      ),
    backHref: "/dashboard/dsa",
    progress: formProgress,
  };

  return (
    <DashboardFormLayout
      header={header}
      form={
        <DsaForm
          values={values}
          onChange={setField}
          isLeetCode={isLeetCode}
          leetcodeUsername={leetcodeUsername}
          leetcodeSyncing={leetcodeSyncing}
          onSyncLeetCode={syncLeetCode}
          leetCodeBreakdown={leetCodeBreakdown}
        />
      }
      preview={
        <DsaPreviewPanel
          values={values}
          loading={loading}
          onSubmit={handleSubmit}
          mode={mode}
        />
      }
    />
  );
};
