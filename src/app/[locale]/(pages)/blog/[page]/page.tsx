import { Blog as BlogLayout } from "@/layouts/Blog";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataBlog" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe & Vanilla Code",
    },
  };
}

const Blog = async ({ params }: { params?: Promise<{ page?: string }> }) => {
  const resolvedSearchParams = await params;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  return <BlogLayout currentPage={currentPage} />;
};

export default Blog;
