import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "../Box";
import { cn } from "@/utils";

interface IPaginationSkeleton {
  className?: string;
}

export const PaginationSkeleton = ({ className }: IPaginationSkeleton) => {
  return (
    <Box direction="col" align="center" gap="2" className={cn(className)}>
      <Box>
        <div className="mx-auto flex w-full justify-center">
          <ul className="flex flex-row items-center gap-1">
            <Skeleton className="h-10 w-10" />

            <Skeleton className="h-10 w-10" />

            <Skeleton className="h-10 w-10" />
          </ul>
        </div>
      </Box>
      <Skeleton className="h-4 w-12" />
    </Box>
  );
};
