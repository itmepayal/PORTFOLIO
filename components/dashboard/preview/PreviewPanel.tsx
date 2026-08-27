import PreviewFooter from "@/components/dashboard/preview/PreviewFooter";
import PreviewHeader from "@/components/dashboard/preview/PreviewHeader";
import type { LucideIcon } from "lucide-react";

type PreviewPanelProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: () => void;
  loading: boolean;
  submitLabel: string;
  submitLoadingLabel: string;
  submitIcon: LucideIcon;
};

export const PreviewPanel = ({
  icon,
  title,
  description,
  children,
  onSubmit,
  loading,
  submitLabel,
  submitLoadingLabel,
  submitIcon: SubmitIcon,
}: PreviewPanelProps) => (
  <div className="sticky top-6 overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
    <div className="p-6">
      <PreviewHeader icon={icon} title={title} description={description} />
    </div>
    <div className="space-y-8 px-6">{children}</div>
    <div className="px-6 pb-6 pt-2">
      <PreviewFooter
        onClick={onSubmit}
        loading={loading}
        icon={<SubmitIcon className="h-4 w-4" />}
        label={submitLabel}
        loadingLabel={submitLoadingLabel}
      />
    </div>
  </div>
);
