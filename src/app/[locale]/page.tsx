import { Layout } from "@/components/Layout";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("Home");
  return <Layout>{t("title")}</Layout>;
};

export default Home;
