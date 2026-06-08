"use client";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Sparkles,
  Layers3,
  Globe,
  Star,
  Activity,
  BadgeCheck,
  Rocket,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/form/FormField";
import FormTextarea from "@/components/form/FormTextarea";
import FormToggle from "@/components/form/FormToggle";
import FormChipInput from "@/components/form/FormChipInput";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/page";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";

const CreateExperiance = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("Remote");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const progress = useMemo(() => {
    let completed = 0;

    if (company) completed++;
    if (position) completed++;
    if (startDate) completed++;
    if (description.length >= 20) completed++;
    if (responsibilities.length > 0) completed++;
    if (technologies.length > 0) completed++;

    return Math.round((completed / 6) * 100);
  }, [
    company,
    position,
    startDate,
    description,
    responsibilities,
    technologies,
  ]);

  const addTech = () => {
    if (!techInput.trim()) return;
    const value = techInput.trim();
    const exists = technologies.some(
      (tech) => tech.toLowerCase() === value.toLowerCase(),
    );
    if (exists) {
      toast.error("Technology already exists");
      return;
    }
    setTechnologies((prev) => [...prev, value]);
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setTechnologies((prev) => prev.filter((item) => item !== tech));
  };

  const addResponsibility = () => {
    if (!responsibilityInput.trim()) return;
    const value = responsibilityInput.trim();
    const exists = responsibilities.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );
    if (exists) {
      toast.error("Responsibility already exists");
      return;
    }
    setResponsibilities((prev) => [...prev, value]);
    setResponsibilityInput("");
  };

  const removeResponsibility = (responsibility: string) => {
    setResponsibilities((prev) =>
      prev.filter((item) => item !== responsibility),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!company.trim()) {
        toast.error("Company name is required");
        return;
      }
      if (!position.trim()) {
        toast.error("Position is required");
        return;
      }
      if (!startDate) {
        toast.error("Start date is required");
        return;
      }
      if (!current && !endDate) {
        toast.error("End date is required");
        return;
      }
      if (description.trim().length < 20) {
        toast.error("Description must be at least 20 characters");
        return;
      }
      if (responsibilities.length === 0) {
        toast.error("Please add at least one responsibility");
        return;
      }
      if (technologies.length === 0) {
        toast.error("Please add at least one technology");
        return;
      }
      const payload = {
        company,
        position,
        location,
        startDate,
        endDate: current ? "Present" : endDate,
        current,
        description,
        responsibilities,
        technologies,
        companyLogo,
        companyWebsite,
        featured,
        order,
      };
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Experience created successfully");
      setCompany("");
      setPosition("");
      setLocation("Remote");
      setStartDate("");
      setEndDate("");
      setCurrent(false);
      setDescription("");
      setResponsibilities([]);
      setTechnologies([]);
      setCompanyLogo("");
      setCompanyWebsite("");
      setFeatured(false);
      setOrder(0);
      setTechInput("");
      setResponsibilityInput("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create Experiance"
        description="Build premium portfolio projects with professional details"
        icon={<FolderKanban className="h-8 w-8" />}
        backHref="/dashboard/experiences"
        progress={progress}
      />
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FormCard
            title="Experience Details"
            description="Update your professional experience information"
            icon={<Layers3 className="h-5 w-5" />}
          >
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Enter your experience details"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Company Name"
                  value={company}
                  onChange={setCompany}
                  placeholder="e.g. Google"
                />

                <FormField
                  label="Company Website"
                  value={companyWebsite}
                  onChange={setCompanyWebsite}
                  placeholder="https://company.com"
                />

                <FormField
                  label="Company Logo"
                  value={companyLogo}
                  onChange={setCompanyLogo}
                  placeholder="https://example.com/logo.png"
                />

                <FormField
                  label="Position Name"
                  value={position}
                  onChange={setPosition}
                  placeholder="e.g. Senior Backend Developer"
                />

                <FormField
                  label="Location"
                  value={location}
                  onChange={setLocation}
                  placeholder="e.g. Ahmedabad, Gujarat, India"
                />

                <FormTextarea
                  label="Description"
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe your responsibilities, achievements, technologies used, and overall impact in this role..."
                  className="md:col-span-2"
                />
              </div>
            </div>
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Duration"
                description="Set your working time period"
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  type="date"
                  label="Start Date"
                  value={startDate}
                  disabled={current}
                  onChange={setStartDate}
                />
                <FormField
                  type="date"
                  label="End Date"
                  value={endDate}
                  disabled={current}
                  onChange={setEndDate}
                />
              </div>
              <FormToggle
                label="Currently Working Here"
                description="Enable if you are still working in this role"
                checked={current}
                onChange={setCurrent}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormChipInput
                title="Responsibilities"
                description="Add key responsibilities of your role"
                value={responsibilities}
                inputValue={responsibilityInput}
                setInputValue={setResponsibilityInput}
                onAdd={addResponsibility}
                onRemove={removeResponsibility}
                placeholder="Worked on backend APIs..."
              />
              <FormChipInput
                title="Technology Stack"
                description="Add technologies used in this experience"
                value={technologies}
                inputValue={techInput}
                setInputValue={setTechInput}
                onAdd={addTech}
                onRemove={removeTech}
                placeholder="React, Node.js..."
              />
            </div>
            <FormFeatureToggle
              title="Featured Entry"
              description="Highlight this DSA profile"
              value={featured}
              onChange={setFeatured}
            />
          </FormCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card className="sticky top-6 rounded-4xl border-border/50 bg-background/70 backdrop-blur-xl">
            <PreviewHeader
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Live Preview"
              description="Real-time Experience preview"
            />
            <CardContent className="space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {company || "Company Name"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {position || "Position Title"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {location || "Location"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-primary/10 text-primary">
                  {current ? "Currently Working" : "Past Experience"}
                </span>
                {featured && (
                  <span className="px-3 py-1 rounded-xl text-xs font-medium bg-yellow-500/10 text-yellow-500">
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 rounded-xl text-xs font-medium bg-muted">
                  {startDate || "Start"} →{" "}
                  {current ? "Present" : endDate || "End"}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm">Completion</span>
                  </div>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-semibold text-sm">
                    {startDate || "Start"} -{" "}
                    {current ? "Present" : endDate || "End"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm">Featured</span>
                  </div>
                  <span className="font-semibold">
                    {featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Tech Stack
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">{technologies.length}</h3>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Responsibilities
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {responsibilities.length}
                  </h3>
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {description || "No description added yet..."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>{companyWebsite || "No website"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>{company || "Company not set"}</span>
                </div>
              </div>
            </CardContent>
            <PreviewFooter
              onClick={handleSubmit}
              loading={loading}
              icon={<Sparkles className="h-4 w-4" />}
              label="Publish Experience"
              loadingLabel="Creating..."
            />
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default CreateExperiance;
