import FormCard from "@/components/form/FormCard";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormField from "@/components/form/FormField";
import FormTextarea from "@/components/form/FormTextarea";
import FormSelect from "@/components/form/FormSelect";
import FormChipInput from "@/components/form/FormChipInput";
import {
  projectWorkTypes,
  statusCategories,
  type ProjectWorkType,
} from "@/lib/project";
import { projectCategories, type ProjectCategory } from "@/models/shared/enums";
import type { ProjectFormValues, StatusCategory } from "@/lib/project";
import { Layers3 } from "lucide-react";

type ProjectFormProps = {
  values: ProjectFormValues;
  onChange: <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) => void;
  featureInput: string;
  setFeatureInput: (value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (feature: string) => void;
  techInput: string;
  setTechInput: (value: string) => void;
  onAddTech: () => void;
  onRemoveTech: (tech: string) => void;
  basicInfoDescription?: string;
};

export const ProjectForm = ({
  values,
  onChange,
  featureInput,
  setFeatureInput,
  onAddFeature,
  onRemoveFeature,
  techInput,
  setTechInput,
  onAddTech,
  onRemoveTech,
  basicInfoDescription = "Provide your project details and overview",
}: ProjectFormProps) => (
  <FormCard
    title="Project Details"
    description="Add and manage your project information"
    icon={<Layers3 className="h-5 w-5" />}
  >
    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Basic Information"
        description={basicInfoDescription}
      />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <FormField
          label="Title"
          value={values.title}
          placeholder="TaskFlow AI"
          onChange={(value) => onChange("title", value)}
        />
        <FormTextarea
          label="Description"
          value={values.description}
          onChange={(value) => onChange("description", value)}
          placeholder="Describe your project, features, architecture, and key functionalities..."
          className="md:col-span-2"
        />
      </div>
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Project Configuration"
        description="Manage project category and publishing state"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Category"
          value={values.category}
          onValueChange={(value) =>
            onChange("category", value as ProjectCategory)
          }
          options={[...projectCategories]}
        />
        <FormSelect
          label="Work Type"
          value={values.workType}
          onValueChange={(value) => {
            const next = value as ProjectWorkType;
            onChange("workType", next);
            if (next !== "company") onChange("company", "");
          }}
          options={[...projectWorkTypes]}
        />
        <FormSelect
          label="Status"
          value={values.status}
          onValueChange={(value) => onChange("status", value as StatusCategory)}
          options={[...statusCategories]}
        />
        {values.workType === "company" && (
          <FormField
            label="Company Name"
            value={values.company}
            placeholder="Laneway Software"
            onChange={(value) => onChange("company", value)}
          />
        )}
      </div>
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Project Links"
        description="Add deployment and source code URLs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Live URL"
          value={values.live}
          placeholder="https://yourproject.com"
          onChange={(value) => onChange("live", value)}
        />
        <FormField
          label="GitHub URL"
          value={values.github}
          onChange={(value) => onChange("github", value)}
          placeholder="https://github.com/..."
        />
      </div>
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Project Features"
        description="Add key functionalities and highlights of your project"
      />
      <FormChipInput
        value={values.features}
        inputValue={featureInput}
        setInputValue={setFeatureInput}
        onAdd={onAddFeature}
        onRemove={onRemoveFeature}
        placeholder="Authentication, Dashboard, Payments..."
      />
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Technology Stack"
        description="Add technologies used to build this project"
      />
      <FormChipInput
        value={values.techs.map((item) => item.name)}
        inputValue={techInput}
        setInputValue={setTechInput}
        onAdd={onAddTech}
        onRemove={onRemoveTech}
        placeholder="React, Next.js, Node.js..."
      />
    </div>
  </FormCard>
);
