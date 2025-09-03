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
          height="216px"
          justify="center"
          className="animate-fade-in-fast m-0 w-full snap-center md:w-[700px]"
          key={index}
        >
          <Box className="flex-col rounded-sm md:flex-row">
            {hasImage && (
              <Box
                height={"216px"}
                className="relative min-w-[300px] overflow-hidden rounded-t-sm md:w-[300px] md:rounded-l-sm md:rounded-r-none"
              >
                <Skeleton className="h-full w-full" />
              </Box>
            )}

            <Box
              direction="col"
              className="mt-1 h-[216px] w-full md:mt-0 md:max-w-[700px] md:items-start md:p-4"
              gap="2"
            >
              <Skeleton className="h-4 w-3/4" />
              <Box gap="2" height="auto">
                {Array.from({ length }, (_, index) => (
                  <Skeleton
                    key={index}
                    className={
                      "bg-accent h-[24px] w-[60px] rounded-md p-1 text-center text-xs font-semibold"
                    }
                  />
                ))}
              </Box>
              <Box
                direction="col"
                gap="4"
                justify="between"
                className="w-full flex-1"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <Skeleton className="mt-0 h-4 w-24" />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
