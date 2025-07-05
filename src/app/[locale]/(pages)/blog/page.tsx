import { Blog as BlogTemplate } from "@/pages/Blog";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
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

const Blog = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  return <BlogTemplate currentPage={currentPage} />;
};

export default Blog;
