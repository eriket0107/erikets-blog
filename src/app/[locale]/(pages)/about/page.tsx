import { getTranslations } from "next-intl/server";
import { About as AboutTemplate } from "@/templates/About";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataAbout" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe & Vanilla Code",
    },
  };
}

const About = () => {
  return <AboutTemplate />;
};

export default About;
