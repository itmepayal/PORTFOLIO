"use client";

import { getErrorMessage } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { DSACategory } from "@/models/shared/enums";
import {
  useLeetCodeSync,
  type LeetCodeSyncedStats,
} from "@/hooks/use-leetcode-sync";

export type DsaFormValues = {
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: DSACategory;
  problemsSolved: number;
  featured: boolean;
  order: number;
};

const emptyValues: DsaFormValues = {
  title: "",
  subtitle: "",
  desc: "",
  progress: "0%",
  category: "custom",
  problemsSolved: 0,
  featured: false,
  order: 0,
};

type UseDsaFormOptions = {
  mode: "create" | "edit";
  id?: string;
};

export const useDsaForm = ({ mode, id }: UseDsaFormOptions) => {
  const router = useRouter();
  const [values, setValues] = useState<DsaFormValues>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");
  const [leetcodeUsername, setLeetcodeUsername] = useState("Payal_Leet_Code");

  const applyLeetCodeStats = useCallback((stats: LeetCodeSyncedStats) => {
    setValues((prev) => ({
      ...prev,
      problemsSolved: stats.problemsSolved,
      progress: stats.progress,
      subtitle: stats.subtitle,
    }));
    if (stats.username) setLeetcodeUsername(stats.username);
  }, []);

  const { sync, syncing, stats: leetCodeStats } = useLeetCodeSync({
    dsaId: mode === "edit" ? id : undefined,
  });

  const setField = <K extends keyof DsaFormValues>(
    key: K,
    value: DsaFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const isLeetCode = values.category === "leetcode";

  useEffect(() => {
    if (!isLeetCode) return;
    sync({ silent: true }).then((stats) => {
      if (stats) applyLeetCodeStats(stats);
    });
  }, [isLeetCode, sync, applyLeetCodeStats]);

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const fetchDsa = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/dsa/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch DSA");

        const dsa = data.dsa;
        setValues({
          title: dsa.title || "",
          subtitle: dsa.subtitle || "",
          desc: dsa.desc || "",
          progress: dsa.progress || "0%",
          category: dsa.category || "custom",
          problemsSolved: dsa.problemsSolved || 0,
          featured: dsa.featured || false,
          order: dsa.order || 0,
        });

        if (dsa.category === "leetcode") {
          const syncedStats = await sync({ silent: true });
          if (syncedStats) applyLeetCodeStats(syncedStats);
        }
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      } finally {
        setFetching(false);
      }
    };

    fetchDsa();
  }, [mode, id, sync, applyLeetCodeStats]);

  const formProgress = useMemo(() => {
    let done = 0;
    if (values.title.trim()) done++;
    if (values.subtitle.trim()) done++;
    if (values.desc.trim()) done++;
    if (values.progress.trim()) done++;
    if (values.category) done++;
    if (values.problemsSolved > 0) done++;
    if (values.order >= 0) done++;
    return Math.round((done / 7) * 100);
  }, [values]);

  const validate = () => {
    if (!values.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!values.subtitle.trim()) {
      toast.error("Subtitle is required");
      return false;
    }
    if (mode === "edit" && values.desc.trim().length < 20) {
      toast.error("Description must be at least 20 characters");
      return false;
    }
    if (mode === "create" && !values.desc.trim()) {
      toast.error("Description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const url = mode === "create" ? "/api/dsa" : `/api/dsa/${id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        mode === "create"
          ? "DSA profile created successfully"
          : "DSA updated successfully",
      );

      if (mode === "create") {
        setValues(emptyValues);
      } else {
        router.push("/dashboard/dsa");
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
    isLeetCode,
    leetcodeUsername,
    leetCodeBreakdown: leetCodeStats,
    syncLeetCode: () => sync(),
    leetcodeSyncing: syncing,
  };
};
