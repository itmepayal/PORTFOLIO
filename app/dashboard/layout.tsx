import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { privateAreaMetadata } from "@/lib/seo";

export const metadata: Metadata = privateAreaMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
