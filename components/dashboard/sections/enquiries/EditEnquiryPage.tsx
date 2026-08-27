"use client";

import { getErrorMessage } from "@/lib/utils";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import PageContainer from "@/components/dashboard/pages/PageContainer";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import { EditEnquiryForm } from "./EditEnquiryForm";
import { EditEnquiryPreview } from "./EditEnquiryPreview";

export const EditEnquiryPage = () => {
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

  const fetchEnquiry = useCallback(async () => {
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
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setFetching(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchEnquiry();
  }, [id, fetchEnquiry]);

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
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
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
          <EditEnquiryForm
            name={name}
            email={email}
            message={message}
            isRead={isRead}
            replied={replied}
            onIsReadChange={setIsRead}
            onRepliedChange={setReplied}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <EditEnquiryPreview
            name={name}
            email={email}
            message={message}
            isRead={isRead}
            replied={replied}
            progress={progress}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};
