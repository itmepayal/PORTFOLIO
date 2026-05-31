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

      const response = await fetch(`/api/enquiry/${enquiry._id}`, {
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
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-border/50
          bg-background/80
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-primary/30
          hover:shadow-2xl
          hover:shadow-primary/10
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-linear-to-br
              from-primary/5
              via-transparent
              to-primary/5
            "
          />

          <div
            className="
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-primary/10
              blur-3xl
            "
          />
        </div>

        <CardContent
          className={`
            relative
            z-10
            p-6
            md:p-7

            ${
              isList
                ? "flex flex-col gap-8 xl:flex-row"
                : "flex h-full flex-col"
            }
          `}
        >
          <div className="flex flex-1 flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge
                    className={`
                      h-8
                      rounded-full
                      px-3

                      ${
                        enquiry.isRead
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-orange-500/10 text-orange-500"
                      }
                    `}
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" />

                    {enquiry.isRead ? "Read" : "Unread"}
                  </Badge>

                  <Badge
                    className={`
                      h-8
                      rounded-full
                      px-3

                      ${
                        enquiry.replied
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    <Reply className="mr-1.5 h-3.5 w-3.5" />

                    {enquiry.replied ? "Replied" : "Pending"}
                  </Badge>
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    md:text-3xl
                  "
                >
                  {enquiry.name}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {enquiry.email}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleEdit}
                  className="h-10 w-10 rounded-2xl"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="h-10 w-10 rounded-2xl"
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* BODY */}

            <div
              className={`
                mt-8

                ${isList ? "grid lg:grid-cols-3 gap-6" : "space-y-6 flex-1"}
              `}
            >
              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">Sender</span>
                </div>

                <h3 className="text-xl font-bold">{enquiry.name}</h3>
              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">
                    Received
                  </span>
                </div>

                <h3 className="text-lg font-bold">
                  {enquiry.createdAt
                    ? new Date(enquiry.createdAt).toLocaleDateString()
                    : "-"}
                </h3>
              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">
                    Reply Date
                  </span>
                </div>

                <h3 className="text-lg font-bold">
                  {enquiry.repliedAt
                    ? new Date(enquiry.repliedAt).toLocaleDateString()
                    : "Not Replied"}
                </h3>
              </div>

              <div
                className="
                  lg:col-span-3
                  rounded-3xl
                  border
                  border-border/50
                  bg-muted/20
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />

                  <span className="text-sm text-muted-foreground">Message</span>
                </div>

                <p
                  className="
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-muted-foreground
                  "
                >
                  {enquiry.message}
                </p>
              </div>
            </div>

            {/* FOOTER */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-border/50
                pt-6
              "
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                Contact Enquiry
              </div>

              <div className="flex items-center gap-2">
                <Reply
                  className={`
                    h-4
                    w-4

                    ${
                      enquiry.replied
                        ? "text-blue-500"
                        : "text-muted-foreground"
                    }
                  `}
                />

                <span className="text-sm font-medium">
                  {enquiry.replied ? "Reply Sent" : "Awaiting Response"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnquiryCard;
