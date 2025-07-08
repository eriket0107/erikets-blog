import { redirect } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: string };
// }) {
//   // Redirect to page 1 for metadata as well
//   return {};
// }

const Blog = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  // Redirect to new route structure
  redirect(`/blog/${currentPage}`);
};

export default Blog;
