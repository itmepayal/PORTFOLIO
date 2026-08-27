import FormField from "@/components/form/FormField";
import FormTextarea from "@/components/form/FormTextarea";
import FormToggle from "@/components/form/FormToggle";
import FormChipInput from "@/components/form/FormChipInput";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import type { ExperienceFormValues } from "@/hooks/use-experience-form";
import { Layers3 } from "lucide-react";

type ExperienceFormProps = {
  values: ExperienceFormValues;
  onChange: <K extends keyof ExperienceFormValues>(
    key: K,
    value: ExperienceFormValues[K],
  ) => void;
  responsibilityInput: string;
  setResponsibilityInput: (value: string) => void;
  techInput: string;
  setTechInput: (value: string) => void;
  onAddResponsibility: () => void;
  onRemoveResponsibility: (value: string) => void;
  onAddTech: () => void;
  onRemoveTech: (value: string) => void;
};

export const ExperienceForm = ({
  values,
  onChange,
  responsibilityInput,
  setResponsibilityInput,
  techInput,
  setTechInput,
  onAddResponsibility,
  onRemoveResponsibility,
  onAddTech,
  onRemoveTech,
}: ExperienceFormProps) => (
  <FormCard
    title="Experience Details"
    description="Update your professional experience information"
    icon={<Layers3 className="h-5 w-5" />}
  >
    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Basic Information"
        description="Enter your experience details"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Company Name"
          value={values.company}
          onChange={(value) => onChange("company", value)}
          placeholder="e.g. Google"
        />
        <FormField
          label="Company Website"
          value={values.companyWebsite}
          onChange={(value) => onChange("companyWebsite", value)}
          placeholder="https://company.com"
        />
        <FormField
          label="Company Logo"
          value={values.companyLogo}
          onChange={(value) => onChange("companyLogo", value)}
          placeholder="https://example.com/logo.png"
        />
        <FormField
          label="Position Name"
          value={values.position}
          onChange={(value) => onChange("position", value)}
          placeholder="e.g. Senior Backend Developer"
        />
        <FormField
          label="Location"
          value={values.location}
          onChange={(value) => onChange("location", value)}
          placeholder="e.g. Ahmedabad, Gujarat, India"
        />
        <FormTextarea
          label="Description"
          value={values.description}
          onChange={(value) => onChange("description", value)}
          placeholder="Describe your responsibilities, achievements, technologies used, and overall impact in this role..."
          className="md:col-span-2"
        />
      </div>
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Duration"
        description="Set your working time period"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          type="date"
          label="Start Date"
          value={values.startDate}
          onChange={(value) => onChange("startDate", value)}
        />
        <FormField
          type="date"
          label="End Date"
          value={values.endDate}
          disabled={values.current}
          onChange={(value) => onChange("endDate", value)}
        />
      </div>
      <FormToggle
        label="Currently Working Here"
        description="Enable if you are still working in this role"
        checked={values.current}
        onChange={(value) => onChange("current", value)}
      />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="border border-border bg-card/30 p-6">
        <FormChipInput
          title="Responsibilities"
          description="Add key responsibilities of your role"
          value={values.responsibilities}
          inputValue={responsibilityInput}
          setInputValue={setResponsibilityInput}
          onAdd={onAddResponsibility}
          onRemove={onRemoveResponsibility}
          placeholder="Worked on backend APIs..."
        />
      </div>
      <div className="border border-border bg-card/30 p-6">
        <FormChipInput
          title="Technology Stack"
          description="Add technologies used in this experience"
          value={values.technologies}
          inputValue={techInput}
          setInputValue={setTechInput}
          onAdd={onAddTech}
          onRemove={onRemoveTech}
          placeholder="React, Node.js..."
        />
      </div>
    </div>

    <FormFeatureToggle
      title="Featured Entry"
      description="Highlight this experience"
      value={values.featured}
      onChange={(value) => onChange("featured", value)}
    />
  </FormCard>
);
