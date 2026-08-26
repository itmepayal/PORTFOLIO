import { Skeleton } from "@/components/ui/skeleton";
import {
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
} from "@/lib/ui";

export const DashboardStats = () => {
  return (
    <div className="relative overflow-hidden border border-border bg-card/40 px-5 py-8 backdrop-blur-sm animate-pulse">
      <span className={dashboardCornerAccentTop} />
      <span className={dashboardCornerAccentBottom} />

      <div className="relative flex items-center justify-between">
        <div>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-9 w-14" />
        </div>

        <div className="flex h-12 w-12 items-center justify-center border border-border bg-background">
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
