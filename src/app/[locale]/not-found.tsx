import { ArrowRight, RouteOff } from "lucide-react";
import { Box } from "../../components/Box";
import { Layout } from "../../components/Layout";
import { Typography } from "../../components/Typography";
import { Link } from "../../components/Link";
import { useTranslations } from "next-intl";

const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");
  return (
    <Layout>
      <Box
        direction="col"
        justify="center"
        align="center"
        className="m-auto"
        gap="8"
      >
        <Box direction="col" justify="center" align="center">
          <Typography.H1 className="text-accent-foreground flex items-center gap-2">
            <RouteOff size={32} className="text-accent-foreground" />
            404
          </Typography.H1>
          <Typography.H2 className="text-accent-foreground text-center">
            {t("title")}
          </Typography.H2>
        </Box>

        <Link
          href={"/"}
          className="text-accent-foreground hover:border-muted-foreground flex items-center gap-0.5 border-b-1 border-transparent hover:opacity-70"
        >
          {t("goBackBtn")}
          <ArrowRight size={16} />
        </Link>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
