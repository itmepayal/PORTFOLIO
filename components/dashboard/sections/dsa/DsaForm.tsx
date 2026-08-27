import FormField from "@/components/form/FormField";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormSelect from "@/components/form/FormSelect";
import { LeetCodeSyncBanner } from "@/components/dashboard/sections/dsa/LeetCodeSyncBanner";
import { dsaCategories, type DSACategory } from "@/models/shared/enums";
import type { DsaFormValues } from "@/hooks/use-dsa-form";
import type { LeetCodeSyncedStats } from "@/hooks/use-leetcode-sync";
import { Layers3 } from "lucide-react";

type DsaFormProps = {
  values: DsaFormValues;
  onChange: <K extends keyof DsaFormValues>(key: K, value: DsaFormValues[K]) => void;
  isLeetCode: boolean;
  leetcodeUsername: string;
  leetcodeSyncing: boolean;
  onSyncLeetCode: () => void;
  leetCodeBreakdown: LeetCodeSyncedStats | null;
};

export const DsaForm = ({
  values,
  onChange,
  isLeetCode,
  leetcodeUsername,
  leetcodeSyncing,
  onSyncLeetCode,
  leetCodeBreakdown,
}: DsaFormProps) => (
  <FormCard
    title="DSA Details"
    description="Manage and update your coding profiles, problem-solving progress, and achievements"
    icon={<Layers3 className="h-5 w-5" />}
  >
    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Basic Information"
        description="Enter your DSA profile details"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Title"
          value={values.title}
          onChange={(value) => onChange("title", value)}
          placeholder="LeetCode Journey"
        />
        <FormField
          label="Subtitle"
          value={values.subtitle}
          onChange={(value) => onChange("subtitle", value)}
          placeholder="Solving DSA problems daily"
          disabled={isLeetCode}
        />
      </div>
      <FormField
        label="Description"
        value={values.desc}
        onChange={(value) => onChange("desc", value)}
        placeholder="Describe your coding journey..."
      />
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Statistics & Configuration"
        description="Manage your DSA progress and platform details"
      />

      {isLeetCode && (
        <LeetCodeSyncBanner
          username={leetcodeUsername}
          syncing={leetcodeSyncing}
          onSync={onSyncLeetCode}
          easy={leetCodeBreakdown?.easy}
          medium={leetCodeBreakdown?.medium}
          hard={leetCodeBreakdown?.hard}
          ranking={leetCodeBreakdown?.ranking}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Progress"
          value={values.progress}
          onChange={(value) => onChange("progress", value)}
          placeholder="75%"
          disabled={isLeetCode}
        />
        <FormField
          label="Problems Solved"
          value={String(values.problemsSolved)}
          onChange={(value) => onChange("problemsSolved", Number(value) || 0)}
          placeholder="500"
          type="number"
          disabled={isLeetCode}
        />
        <FormField
          label="Display Order"
          value={String(values.order)}
          onChange={(value) => onChange("order", Number(value) || 0)}
          placeholder="1"
          type="number"
        />
        <FormSelect
          label="Category"
          value={values.category}
          onValueChange={(value) => onChange("category", value as DSACategory)}
          options={[...dsaCategories]}
        />
      </div>
    </div>

    <FormFeatureToggle
      title="Featured Entry"
      description="Highlight this DSA profile"
      value={values.featured}
      onChange={(value) => onChange("featured", value)}
    />
  </FormCard>
);
