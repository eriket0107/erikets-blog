import { Skeleton } from "../ui/skeleton";
import { Box } from "../Box";

export const PostCardSkeleton = ({
  length = 2,
  hasImage = true,
}: {
  length?: number;
  hasImage?: boolean;
}) => {
  return (
    <>
      {Array.from({ length }, (_, index) => (
        <Box
          as="article"
          gap="4"
          width="full"
          height="full"
          justify="center"
          className="m-0 snap-center md:w-[500px]"
          key={index}
        >
          <Box className="flex-col rounded-sm md:flex-row">
            {hasImage && (
              <Box
                height={"200px"}
                className="relative min-w-[300px] overflow-hidden rounded-t-sm md:w-[300px] md:rounded-l-sm md:rounded-r-none"
              >
                <Skeleton className="h-full w-full" />
              </Box>
            )}

            <Box
              direction="col"
              className="mt-1 h-[180px] w-full md:mt-0 md:max-w-[500px] md:items-start md:p-4"
            >
              <Skeleton className="mb-4 h-8 w-3/4" />

              <Box
                direction="col"
                gap="4"
                justify="between"
                className="w-full flex-1"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <Skeleton className="mt-auto h-4 w-24" />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
