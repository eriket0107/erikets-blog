import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./components/LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as "en" | "br";

  return (
    <LocaleSwitcherSelect
      title={t("title")}
      defaultValue={locale}
      label={t("label")}
    />
  );
}
