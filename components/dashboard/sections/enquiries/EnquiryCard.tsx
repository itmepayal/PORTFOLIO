"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  Pencil,
  Trash2,
  Loader2,
  BadgeCheck,
  Clock,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface EnquiryCardProps {
  enquiry: {
    _id?: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    replied: boolean;
    repliedAt?: string | null;
    createdAt?: string;
  };
  view?: "grid" | "list";
  onDelete?: (id: string) => void;
}

const EnquiryCard = ({
  enquiry,
  view = "grid",
  onDelete,
}: EnquiryCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!enquiry._id) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?",
    );
    if (!confirmDelete) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/enquiries/${enquiry._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete enquiry");
      toast.success("Enquiry deleted successfully");
      onDelete?.(enquiry._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!enquiry._id) return;
    router.push(`/dashboard/enquiries/edit/${enquiry._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative h-full overflow-hidden border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60"
    >
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70 z-10" />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-1 flex h-full flex-col gap-6 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest ${
                enquiry.isRead
                  ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-500"
              }`}
            >
              {enquiry.isRead ? (
                <BadgeCheck className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {enquiry.isRead ? "Read" : "Unread"}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest ${
                enquiry.replied
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              {enquiry.replied ? "Replied" : "Pending"}
            </span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleEdit}
              className="flex h-9 w-9 items-center justify-center border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              disabled={deleting}
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center border border-red-500/30 bg-red-500/10 text-red-500 transition-colors hover:border-red-500/60 hover:bg-red-500/20 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary md:text-3xl">
            {enquiry.name}
          </h2>
          <div className="mt-2 flex items-center gap-2 font-mono text-[0.75rem] text-muted-foreground">
            <Mail className="h-3.5 w-3.5 text-primary" />
            {enquiry.email}
          </div>
          <p className="mt-3 text-sm font-light leading-7 text-muted-foreground line-clamp-3">
            {enquiry.message}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {enquiry.createdAt
              ? new Date(enquiry.createdAt).toLocaleDateString()
              : "—"}
          </div>
          <span
            className={`font-mono text-[0.62rem] uppercase tracking-widest ${
              enquiry.replied ? "text-chart-3" : "text-amber-500"
            }`}
          >
            {enquiry.replied ? "Reply Sent" : "Awaiting Response"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EnquiryCard;
