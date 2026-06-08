"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  MessageSquare,
  User,
  Calendar,
  Eye,
  Reply,
  Pencil,
  Trash2,
  Loader2,
  BadgeCheck,
  Clock,
} from "lucide-react";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const isList = view === "list";

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

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete enquiry");
      }

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
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -6,
      }}
      className="h-full"
    >
      <Card
        className="
    group
    h-full
    rounded-3xl
    border
    bg-background
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
  "
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant={enquiry.isRead ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {enquiry.isRead ? "Read" : "Unread"}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    enquiry.replied ? "text-blue-600 border-blue-200" : ""
                  }
                >
                  {enquiry.replied ? "Replied" : "Pending"}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold truncate">{enquiry.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{enquiry.email}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {enquiry.message}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {enquiry.createdAt
                ? new Date(enquiry.createdAt).toLocaleDateString()
                : "-"}
            </div>
            <div
              className={`text-sm font-medium ${
                enquiry.replied ? "text-green-600" : "text-orange-500"
              }`}
            >
              {enquiry.replied ? "Reply Sent" : "Awaiting Response"}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnquiryCard;
