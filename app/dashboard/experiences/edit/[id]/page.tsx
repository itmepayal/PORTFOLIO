"use client";
import { toast } from "sonner";
import { useMemo, useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import FormField from "@/components/form/FormField";
import FormTextarea from "@/components/form/FormTextarea";
import FormToggle from "@/components/form/FormToggle";
import FormChipInput from "@/components/form/FormChipInput";
import FormFeatureToggle from "@/components/form/FormFeatureToggle";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/PageContainer";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";

const EditExperiance = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/experiences/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        const experience = data.experience;
        setCompany(experience.company);
        setPosition(experience.position);
        setLocation(experience.location);
        setStartDate(experience.startDate);
        setEndDate(experience.endDate);
        setCurrent(experience.current);
        setDescription(experience.description);
        setResponsibilities(experience.responsibilities || []);
        setTechnologies(experience.technologies || []);
        setCompanyLogo(experience.companyLogo || "");
        setCompanyWebsite(experience.companyWebsite || "");
        setFeatured(experience.featured);
        setOrder(experience.order);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchExperience();
  }, [id]);

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
    if (technologies.some((t) => t.toLowerCase() === value.toLowerCase())) {
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
    if (responsibilities.some((r) => r.toLowerCase() === value.toLowerCase())) {
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

      const response = await fetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Experience updated successfully");
      router.push("/dashboard/experiences");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <PageContainer>
        <div className="flex min-h-100 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin border-2 border-border border-t-primary" />
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Loading Experience...
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit Experience"
        description="Update your professional experience information"
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
            {/* Basic Information */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
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

            {/* Duration */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
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

            {/* Chips */}
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
              description="Highlight this experience"
              value={featured}
              onChange={setFeatured}
            />
          </FormCard>
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="sticky top-6 overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
            <div className="p-6">
              <PreviewHeader
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="Live Preview"
                description="Real-time Experience preview"
              />
            </div>

            <div className="space-y-8 px-6">
              {/* Company header with clip-path accent */}
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                    {company || "Company Name"}
                  </h2>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                    {position || "Position Title"}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-primary">
                  {current ? "Currently Working" : "Past Experience"}
                </span>
                <span className="border border-border bg-muted px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-muted-foreground">
                  {startDate || "Start"} →{" "}
                  {current ? "Present" : endDate || "End"}
                </span>
                {featured && (
                  <span className="border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-yellow-500">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border border-border bg-background/40 p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm leading-6 text-foreground line-clamp-4">
                  {description || "No description added yet..."}
                </p>
              </div>

              {/* Stat rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Completion
                    </span>
                  </div>
                  <span className="bg-linear-to-br from-primary to-chart-3 bg-clip-text font-bold text-transparent">
                    {progress}%
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Duration
                    </span>
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {startDate || "Start"} —{" "}
                    {current ? "Present" : endDate || "End"}
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Featured
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Tech Stack
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {technologies.length}
                  </h3>
                </div>

                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Responsibilities
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-2xl font-bold text-transparent">
                    {responsibilities.length}
                  </h3>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-3 border border-border bg-background/40 p-4">
                <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
                  <Globe className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">
                    {companyWebsite || "No website added"}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">
                    {company || "Company not set"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <PreviewFooter
                onClick={handleSubmit}
                loading={loading}
                icon={<Sparkles className="h-4 w-4" />}
                label="Update Experience"
                loadingLabel="Updating..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditExperiance;
