"use client";

import { getErrorMessage } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { SkillCategory } from "@/models/shared/enums";

export type SkillFormValues = {
  title: string;
  icon: string;
  level: string;
  category: SkillCategory;
  featured: boolean;
  order: number;
};

const emptyValues: SkillFormValues = {
  title: "",
  icon: "",
  level: "",
  category: "frontend",
  featured: false,
  order: 0,
};

type UseSkillFormOptions = {
  mode: "create" | "edit";
  id?: string;
};

export const useSkillForm = ({ mode, id }: UseSkillFormOptions) => {
  const router = useRouter();
  const [values, setValues] = useState<SkillFormValues>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");

  const setField = <K extends keyof SkillFormValues>(
    key: K,
    value: SkillFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const fetchSkill = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch skill");
        }

        const skill = data.skill;
        setValues({
          title: skill.title || "",
          icon: skill.icon || "",
          level: String(skill.level ?? ""),
          category: skill.category || "frontend",
          featured: skill.featured || false,
          order: skill.order || 0,
        });
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      } finally {
        setFetching(false);
      }
    };

    fetchSkill();
  }, [mode, id]);

  const formProgress = useMemo(() => {
    let done = 0;
    if (values.title.trim()) done++;
    if (values.icon.trim()) done++;
    if (values.level) done++;
    if (values.category) done++;
    if (values.order >= 0) done++;
    return Math.round((done / 5) * 100);
  }, [values]);

  const validate = () => {
    if (!values.title.trim()) {
      toast.error("Skill title is required");
      return false;
    }
    if (!values.icon.trim()) {
      toast.error("Skill icon is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const url = mode === "create" ? "/api/skills" : `/api/skills/${id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          level: Number(values.level) || 0,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        mode === "create"
          ? "Skill created successfully"
          : "Skill updated successfully",
      );

      if (mode === "create") {
        setValues(emptyValues);
      } else {
        router.push("/dashboard/skills");
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
  };
};
