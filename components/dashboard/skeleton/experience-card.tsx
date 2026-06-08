import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ExperienceCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-3xl border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <Skeleton className="h-16 w-16 rounded-xl shrink-0" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-40" />

              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        <div className="mt-5">
          <Skeleton className="mb-3 h-5 w-32" />

          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Skeleton className="mb-3 h-5 w-28" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCardSkeleton;
