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
  Loader2,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageContainer from "@/components/dashboard/pages/page";
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch enquiry");
      }
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
    if (id) {
      fetchEnquiry();
    }
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
      const payload = {
        name,
        email,
        message,
        isRead,
        replied,
      };
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update enquiry");
      }
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
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
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
              <FormSectionHeader
                title="Basic Information"
                description="Enter your experience details"
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

              <div className="mt-6">
                <FormField
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  disabled
                />
              </div>
            </div>
            <div className="rounded-3xl border border-border/50 bg-muted/20 p-6 space-y-6">
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
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card className="sticky top-6 rounded-4xl border-border/50 bg-background/70 backdrop-blur-xl">
            <PreviewHeader
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Enquiry Overview"
              description="Current enquiry status and details"
            />
            <CardContent className="space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {name || "Enter Name"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {email || "Email Name"}
                </p>
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
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm">Message Read</span>
                  </div>
                  <span className="font-semibold">{isRead ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm">Message Reply</span>
                  </div>
                  <span className="font-semibold">
                    {replied ? "Yes" : "No"}
                  </span>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {message || "No Message added yet..."}
                  </p>
                </div>
              </div>
            </CardContent>
            <PreviewFooter
              onClick={handleSubmit}
              loading={loading}
              icon={<Sparkles className="h-4 w-4" />}
              label="Publish Enquiry"
              loadingLabel="Editing..."
            />
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default EditEnquiry;
