import React from "react";
import { PageLoader } from "@/components/common/PageLoader";

export default function DashboardLoading() {
  return (
    <PageLoader
      fullScreen
      label="Loading workspace metrics..."
      sublabel="INITIALIZING DASHBOARD"
    />
  );
}
