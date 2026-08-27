"use client";

import { getErrorMessage } from "@/lib/utils";
import { defaultCreateTechs, getTechIcon } from "@/lib/project-tech-icons";
import {
  buildProjectFormPayload,
  calculateProjectFormProgress,
  emptyProjectFormValues,
  getProjectFormValidationError,
  type ProjectFormValues,
} from "@/lib/project";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type { ProjectFormValues, ProjectTech } from "@/lib/project";

type UseProjectFormOptions = {
  mode: "create" | "edit";
  id?: string;
};

export const useProjectForm = ({ mode, id }: UseProjectFormOptions) => {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>({
    ...emptyProjectFormValues,
    techs: mode === "create" ? [...defaultCreateTechs] : [],
  });
  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");

  const setField = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const fetchProject = useCallback(async () => {
    if (!id) return;

    try {
      setFetching(true);
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load project");
      }

      const project = data.project;
      setValues({
        title: project.title || "",
        description: project.description || "",
        status: project.isPublished ? "Published" : "Draft",
        live: project.live || "",
        github: project.github || "",
        category: project.category || "fullstack",
        workType: project.workType || "self",
        company: project.company || "",
        features: project.features || [],
        techs: project.tech || [],
      });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to load project"));
      router.push("/dashboard/projects");
    } finally {
      setFetching(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (mode === "edit") fetchProject();
  }, [mode, fetchProject]);

  const formProgress = useMemo(
    () => calculateProjectFormProgress(values),
    [values],
  );

  const addTech = () => {
    if (!techInput.trim()) return;
    const value = techInput.trim();
    if (
      values.techs.some((item) => item.name.toLowerCase() === value.toLowerCase())
    ) {
      toast.error("Technology already exists");
      return;
    }
    setValues((prev) => ({
      ...prev,
      techs: [...prev.techs, { name: value, icon: getTechIcon(value) }],
    }));
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setValues((prev) => ({
      ...prev,
      techs: prev.techs.filter((item) => item.name !== tech),
    }));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const value = featureInput.trim();
    if (values.features.includes(value)) {
      toast.error("Feature already exists");
      return;
    }
    setValues((prev) => ({ ...prev, features: [...prev.features, value] }));
    setFeatureInput("");
  };

  const removeFeature = (feature: string) => {
    setValues((prev) => ({
      ...prev,
      features: prev.features.filter((item) => item !== feature),
    }));
  };

  const handleSubmit = async () => {
    const validationError = getProjectFormValidationError(values);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const url = mode === "create" ? "/api/projects" : `/api/projects/${id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildProjectFormPayload(values)),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        mode === "create"
          ? "Project created successfully"
          : "Project updated successfully",
      );

      if (mode === "create") {
        setValues({ ...emptyProjectFormValues, techs: [] });
        setFeatureInput("");
        setTechInput("");
      } else {
        router.push("/dashboard/projects");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    setField,
    featureInput,
    setFeatureInput,
    techInput,
    setTechInput,
    addFeature,
    removeFeature,
    addTech,
    removeTech,
    loading,
    fetching,
    formProgress,
    handleSubmit,
  };
};
