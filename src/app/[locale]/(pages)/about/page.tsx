import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataAbout" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe and Vanilla Code",
    },
  };
}

const About = () => {
  return <>About</>;
};

export default About;
