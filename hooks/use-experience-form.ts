"use client";

import { getErrorMessage } from "@/lib/utils";
import {
  addExperienceChip,
  emptyExperienceValues,
  getExperienceFormProgress,
  mapExperienceToFormValues,
  validateExperienceForm,
  type ExperienceFormValues,
} from "@/lib/experience-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type { ExperienceFormValues };

type UseExperienceFormOptions = {
  mode: "create" | "edit";
  id?: string;
};

export const useExperienceForm = ({ mode, id }: UseExperienceFormOptions) => {
  const router = useRouter();
  const [values, setValues] = useState<ExperienceFormValues>(emptyExperienceValues);
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");

  const setField = <K extends keyof ExperienceFormValues>(
    key: K,
    value: ExperienceFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const addChip = (
    field: "responsibilities" | "technologies",
    next: string[],
  ) => {
    setField(field, next);
  };

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const fetchExperience = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/experiences/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch experience");
        setValues(mapExperienceToFormValues(data.experience));
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      } finally {
        setFetching(false);
      }
    };

    fetchExperience();
  }, [mode, id]);

  const formProgress = useMemo(() => getExperienceFormProgress(values), [values]);

  const addTech = () =>
    addExperienceChip(
      techInput,
      values.technologies,
      "technologies",
      "Technology already exists",
      addChip,
      () => setTechInput(""),
    );

  const removeTech = (tech: string) =>
    setField(
      "technologies",
      values.technologies.filter((item) => item !== tech),
    );

  const addResponsibility = () =>
    addExperienceChip(
      responsibilityInput,
      values.responsibilities,
      "responsibilities",
      "Responsibility already exists",
      addChip,
      () => setResponsibilityInput(""),
    );

  const removeResponsibility = (responsibility: string) =>
    setField(
      "responsibilities",
      values.responsibilities.filter((item) => item !== responsibility),
    );

  const handleSubmit = async () => {
    if (!validateExperienceForm(values)) return;

    try {
      setLoading(true);
      const url = mode === "create" ? "/api/experiences" : `/api/experiences/${id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          endDate: values.current ? "Present" : values.endDate,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      toast.success(
        mode === "create"
          ? "Experience created successfully"
          : "Experience updated successfully",
      );

      if (mode === "create") {
        setValues(emptyExperienceValues);
        setResponsibilityInput("");
        setTechInput("");
      } else {
        router.push("/dashboard/experiences");
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
  };
};
