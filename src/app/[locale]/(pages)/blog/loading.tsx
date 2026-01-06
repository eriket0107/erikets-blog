import { PageWrapper } from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingBlog = () => {
  return (
    <PageWrapper>

      {/* Title Skeleton */}
      <Skeleton className="h-12 w-[200px] max-w-full mb-8 animate-fade-in-fast mx-auto" />

      {/* SearchInput Skeleton */}
      <Skeleton className="h-12 w-full max-w-[400px] mb-8 animate-fade-in-fast mx-auto" />

      {/* Results count Skeleton (conditionally rendered in BlogPage) */}
      <Skeleton className="h-200 w-full mx-auto mb-6 animate-fade-in-fast" />

      {/* VirtualizedPostFeed Skeletons */}
      <div className="space-y-6 animate-fade-in-slow">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-1000 w-full max-w-3xl mx-auto" />
        ))}
      </div>
    </PageWrapper>
  );
};

export default LoadingBlog;
