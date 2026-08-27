import FormField from "@/components/form/FormField";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormSelect from "@/components/form/FormSelect";
import { skillCategories, type SkillCategory } from "@/models/shared/enums";
import type { SkillFormValues } from "@/hooks/use-skill-form";
import { Layers3 } from "lucide-react";

type SkillFormProps = {
  values: SkillFormValues;
  onChange: <K extends keyof SkillFormValues>(
    key: K,
    value: SkillFormValues[K],
  ) => void;
};

export const SkillForm = ({ values, onChange }: SkillFormProps) => (
  <FormCard
    title="Skills Details"
    description="Manage and update your technical skills and technologies"
    icon={<Layers3 className="h-5 w-5" />}
  >
    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Basic Information"
        description="Enter your skill details"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Skill Title"
          value={values.title}
          onChange={(value) => onChange("title", value)}
          placeholder="React.js"
        />
        <FormField
          label="Icon Name"
          value={values.icon}
          onChange={(value) => onChange("icon", value)}
          placeholder="FaReact"
        />
      </div>
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Configuration"
        description="Manage your skill settings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Level"
          value={values.level}
          onChange={(value) => onChange("level", value)}
          placeholder="70"
        />
        <FormSelect
          label="Category"
          value={values.category}
          onValueChange={(value) => onChange("category", value as SkillCategory)}
          options={[...skillCategories]}
        />
        <FormField
          label="Display Order"
          value={String(values.order)}
          onChange={(value) => onChange("order", Number(value) || 0)}
          placeholder="1"
          type="number"
        />
      </div>
    </div>

    <FormFeatureToggle
      title="Featured Entry"
      description="Highlight this skill"
      value={values.featured}
      onChange={(value) => onChange("featured", value)}
    />
  </FormCard>
);
