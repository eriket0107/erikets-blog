import { BlogPage } from "@/templates/Blog";
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

const Blog = async ({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const initialQuery = resolvedSearchParams?.q || '';

  return (
    <BlogPage initialQuery={initialQuery} />
  )
};

export default Blog;
