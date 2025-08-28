import { Box } from "@/components/Box";
import { PageWrapper } from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Ellipsis } from "lucide-react";

const PostSkeleton = async () => {
  return (
    <PageWrapper>
      <Box>
        <Skeleton className="mb-2 h-6 w-20" />
      </Box>
      <Box
        className="animate-fade-in-fast w-full"
        direction="col"
        justify="center"
        align="center"
      >
        <Skeleton className="mb-2 h-12 w-full" />

        <Ellipsis size={48} />

        <Skeleton className="h-[250px] w-full rounded-t-sm md:h-[400px] md:w-[600px]" />
      </Box>

      <Box
        className="animate-fade-in-slow w-full px-4 pt-4 md:max-w-[600px] md:px-0"
        direction="col"
        gap="2"
        justify="center"
        align="center"
      >
        <Skeleton className="mb-2 h-4 w-20" />
        <Skeleton className="mb-4 h-4 w-full md:mb-6 md:h-5" />
        <Skeleton className="mb-3 h-5 w-full md:mb-4 md:h-6" />
        <Skeleton className="mb-3 h-5 w-full md:mb-4 md:h-6" />
        <Skeleton className="h-5 w-4/5 md:h-6 md:w-3/4" />
      </Box>
    </PageWrapper>
  );
};

export default PostSkeleton;
