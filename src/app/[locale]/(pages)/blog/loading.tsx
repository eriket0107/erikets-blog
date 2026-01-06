import { PageWrapper } from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingBlog = () => {
  return (
    <PageWrapper>
      <Skeleton className="h-12 w-64 mb-4 animate-fade-in-fast" />
      <div className="sticky top-20 z-40 backdrop-blur-md bg-background/80 pt-4 pb-2 mb-4">
        <Skeleton className="h-12 w-full max-w-2xl mx-auto animate-fade-in-slow" />
      </div>
      <div className="space-y-4 animate-fade-in-slow">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full max-w-2xl mx-auto" />
        ))}
      </div>
    </PageWrapper>
  );
};

export default LoadingBlog;
