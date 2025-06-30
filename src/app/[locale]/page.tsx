import { Layout } from "@/components/Layout";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataHome" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe and Vanilla Code",
    },
  };
}

const Home = () => {
  const t = useTranslations("HomePage");
  return <Layout>{t("title")}</Layout>;
};

export default Home;
