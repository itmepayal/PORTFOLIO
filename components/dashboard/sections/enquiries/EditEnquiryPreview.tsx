import {
  Activity,
  BadgeCheck,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";
import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";

type EditEnquiryPreviewProps = {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  replied: boolean;
  progress: number;
  loading: boolean;
  onSubmit: () => void;
};

export const EditEnquiryPreview = ({
  name,
  email,
  message,
  isRead,
  replied,
  progress,
  loading,
  onSubmit,
}: EditEnquiryPreviewProps) => (
  <div className="sticky top-6 overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
    <div className="p-6">
      <PreviewHeader
        icon={<LayoutDashboard className="h-5 w-5" />}
        title="Enquiry Overview"
        description="Current enquiry status and details"
      />
    </div>

    <div className="space-y-8 px-6">
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

      <div className="border border-border bg-background/40 p-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-2">
          Message
        </p>
        <p className="text-sm leading-6 text-foreground line-clamp-4">
          {message || "No message added yet..."}
        </p>
      </div>

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
        onClick={onSubmit}
        loading={loading}
        icon={<Sparkles className="h-4 w-4" />}
        label="Update Enquiry"
        loadingLabel="Updating..."
      />
    </div>
  </div>
);
