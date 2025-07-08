import { Home as HomeLayout } from "@/layouts/Home";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataHome" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe & Vanilla Code",
    },
  };
}

const Home = () => {
  return <HomeLayout />;
};

export default Home;
