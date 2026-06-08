import { Skeleton } from "@/components/ui/skeleton";

const PaginationSkeleton = () => {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-4
        pt-6
      "
    >
      <Skeleton className="h-10 w-24 rounded-2xl" />
      <Skeleton className="h-10 w-36 rounded-2xl" />
      <Skeleton className="h-10 w-24 rounded-2xl" />
    </div>
  );
};

export default PaginationSkeleton;
