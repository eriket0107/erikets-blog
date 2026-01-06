import { ArrowRight, RouteOff } from "lucide-react";
import { Box } from "../../components/Box";
import { Layout } from "../../components/Layout";
import { Typography } from "../../components/Typography";
import { Link } from "../../components/Link";
import { useTranslations } from "next-intl";
import { Spotlight } from "@/components/ui/spotlight-new";

const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");
  return (
    <Layout>
      <Box
        direction="col"
        justify="center"
        align="center"
        className="m-auto relative"
        gap="8"
      >
        <Spotlight xOffset={100} translateY={100} />
        <Box direction="row" justify="center" align="center" gap="8" >
          <RouteOff size={90} className="text-accent-foreground" />

          <Typography.H1 className="text-accent-foreground flex items-center gap-4 text-8xl">
            404
          </Typography.H1>
        </Box>

        <Link
          href={"/"}
          className="text-accent-foreground hover:border-muted-foreground flex items-center gap-0.5 border-b border-transparent hover:opacity-70"
        >
          {t("goBackBtn")}
          <ArrowRight size={16} />
        </Link>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
