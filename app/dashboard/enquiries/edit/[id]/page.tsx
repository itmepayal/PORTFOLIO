"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Layers3,
  LayoutDashboard,
  Activity,
  Sparkles,
  Star,
  Mail,
  BadgeCheck,
  MessageSquare,
} from "lucide-react";
import PageContainer from "@/components/dashboard/pages/PageContainer";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormField from "@/components/form/FormField";
import FormToggle from "@/components/form/FormToggle";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";

const EditEnquiry = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [replied, setReplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchEnquiry = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/enquiries/${id}`);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch enquiry");
      const enquiry = data.enquiry;
      setName(enquiry.name || "");
      setEmail(enquiry.email || "");
      setMessage(enquiry.message || "");
      setIsRead(enquiry.isRead || false);
      setReplied(enquiry.replied || false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) fetchEnquiry();
  }, [id]);

  const progress = useMemo(() => {
    let done = 0;
    if (name) done++;
    if (email) done++;
    if (message) done++;
    if (isRead) done++;
    if (replied) done++;
    return Math.round((done / 5) * 100);
  }, [name, email, message, isRead, replied]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { name, email, message, isRead, replied };
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update enquiry");
      toast.success("Enquiry updated successfully");
      router.push("/dashboard/enquiries");
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
              Loading Enquiry...
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit Enquiry"
        description="Manage and update customer enquiry details"
        icon={<Mail className="h-8 w-8" />}
        backHref="/dashboard/enquiries"
        progress={progress}
      />
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FormCard
            title="Enquiry Details"
            description="View and manage customer enquiry information"
            icon={<Layers3 className="h-5 w-5" />}
          >
            {/* Basic Information */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Customer contact details"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  value={name}
                  onChange={setName}
                  disabled
                />
                <FormField
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  disabled
                />
              </div>
              <FormField
                label="Message"
                value={message}
                onChange={setMessage}
                disabled
              />
            </div>

            {/* Status Section */}
            <div className="border border-border bg-card/30 p-6 space-y-6">
              <FormSectionHeader
                title="Enquiry Status"
                description="Manage enquiry read and reply status"
              />
              <FormToggle
                label="Mark as Read"
                description="Indicates that the enquiry has been reviewed"
                checked={isRead}
                onChange={setIsRead}
              />
              <FormToggle
                label="Mark as Replied"
                description="Indicates that a response has been sent"
                checked={replied}
                onChange={setReplied}
              />
            </div>
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
                title="Enquiry Overview"
                description="Current enquiry status and details"
              />
            </div>

            <div className="space-y-8 px-6">
              {/* Sender header with clip-path accent */}
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                    {name || "Sender Name"}
                  </h2>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                    {email || "sender@email.com"}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest ${
                    isRead
                      ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isRead ? "Read" : "Unread"}
                </span>
                <span
                  className={`border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-widest ${
                    replied
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {replied ? "Replied" : "Pending"}
                </span>
              </div>

              {/* Message block */}
              <div className="border border-border bg-background/40 p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
                  Message
                </p>
                <p className="text-sm leading-6 text-foreground line-clamp-4">
                  {message || "No message added yet..."}
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
                      Message Read
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {isRead ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">
                      Replied
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {replied ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Status
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-lg font-bold text-transparent">
                    {isRead ? "Read" : "Unread"}
                  </h3>
                </div>

                <div className="group relative overflow-hidden border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-primary/50">
                  <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                  <div className="mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      Reply
                    </span>
                  </div>
                  <h3 className="bg-linear-to-br from-primary to-chart-3 bg-clip-text text-lg font-bold text-transparent">
                    {replied ? "Sent" : "Pending"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <PreviewFooter
                onClick={handleSubmit}
                loading={loading}
                icon={<Sparkles className="h-4 w-4" />}
                label="Update Enquiry"
                loadingLabel="Updating..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditEnquiry;
