import { PageWrapper } from "@/components/PageWrapper";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";

const LoadingBlog = () => {
  return (
    <PageWrapper>
      <PaginationSkeleton className="animate-fade-in-slow flex" />
      <PostCardSkeleton length={3} hasImage={false} />
    </PageWrapper>
  );
};

export default LoadingBlog;
