import React from "react";
import PageContainer from "@/components/dashboard/pages/PageContainer";
import { PageLoader } from "@/components/common/PageLoader";

type DashboardResourceLoaderProps = {
  label: string;
};

export const DashboardResourceLoader = ({
  label,
}: DashboardResourceLoaderProps) => (
  <PageContainer>
    <div className="flex min-h-[50vh] items-center justify-center">
      <PageLoader
        fullScreen={false}
        label={label}
        sublabel="SYSTEM RESOURCE"
        showTechOrbit={false}
      />
    </div>
  </PageContainer>
);

export default DashboardResourceLoader;
