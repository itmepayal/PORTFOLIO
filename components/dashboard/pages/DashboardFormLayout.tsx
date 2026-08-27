import { motion } from "framer-motion";
import PageHeader from "@/components/dashboard/pages/PageHeader";
import PageContainer from "@/components/dashboard/pages/PageContainer";

type DashboardFormLayoutProps = {
  header: {
    title: string;
    description: string;
    icon: React.ReactNode;
    backHref: string;
    progress: number;
  };
  form: React.ReactNode;
  preview: React.ReactNode;
};

export const DashboardFormLayout = ({
  header,
  form,
  preview,
}: DashboardFormLayoutProps) => (
  <PageContainer>
    <PageHeader
      title={header.title}
      description={header.description}
      icon={header.icon}
      backHref={header.backHref}
      progress={header.progress}
    />
    <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {form}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {preview}
      </motion.div>
    </div>
  </PageContainer>
);
