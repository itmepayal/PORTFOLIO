import React from "react";
import { PageLoader } from "@/components/common/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      fullScreen
      label="Loading your experience..."
      sublabel="PREPARING INTERFACE"
    />
  );
}
