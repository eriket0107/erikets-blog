import { redirect } from "next/navigation";

const Blog = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  redirect(`/blog/${currentPage}`);
};

export default Blog;
