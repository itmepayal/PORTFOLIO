import { Layers3 } from "lucide-react";
import FormSectionHeader from "@/components/form/FormSectionHeader";
import FormCard from "@/components/form/FormCard";
import FormField from "@/components/form/FormField";
import FormToggle from "@/components/form/FormToggle";

type EditEnquiryFormProps = {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  replied: boolean;
  onIsReadChange: (value: boolean) => void;
  onRepliedChange: (value: boolean) => void;
};

export const EditEnquiryForm = ({
  name,
  email,
  message,
  isRead,
  replied,
  onIsReadChange,
  onRepliedChange,
}: EditEnquiryFormProps) => (
  <FormCard
    title="Enquiry Details"
    description="View and manage customer enquiry information"
    icon={<Layers3 className="h-5 w-5" />}
  >
    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Basic Information"
        description="Customer contact details"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Name" value={name} onChange={() => {}} disabled />
        <FormField label="Email" value={email} onChange={() => {}} disabled />
      </div>
      <FormField
        label="Message"
        value={message}
        onChange={() => {}}
        disabled
      />
    </div>

    <div className="border border-border bg-card/30 p-6 space-y-6">
      <FormSectionHeader
        title="Enquiry Status"
        description="Manage enquiry read and reply status"
      />
      <FormToggle
        label="Mark as Read"
        description="Indicates that the enquiry has been reviewed"
        checked={isRead}
        onChange={onIsReadChange}
      />
      <FormToggle
        label="Mark as Replied"
        description="Indicates that a response has been sent"
        checked={replied}
        onChange={onRepliedChange}
      />
    </div>
  </FormCard>
);
