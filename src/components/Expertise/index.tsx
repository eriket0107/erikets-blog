import { MilestoneType } from "@/interfaces/milestone";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";


const listClass = "list-disc pl-4 space-y-1 over"

export const Expertise = (): MilestoneType[] => {
  const t = useTranslations("Milestones");

  return [
    {
      id: 1,
      title: t("multiplan.title"),
      company: t("multiplan.company"),
      startDate: "2022-02-01",
      endDate: new Date().toISOString(),
      description: (
        <ul className={cn(listClass)} >
          <li>{t("multiplan.item1")}</li>
          <li>{t("multiplan.item2")}</li>
          <li>{t("multiplan.item3")}</li>
          <li>{t("multiplan.item4")}</li>
          <li>{t("multiplan.item5")}</li>
          <li>{t("multiplan.item6")}</li>
          <li>{t("multiplan.item7")}</li>
        </ul>
      )
    },
    {
      id: 2,
      title: t("pepsico.title"),
      company: t("pepsico.company"),
      startDate: "2024-07-01",
      endDate: "2025-09-30",
      description: (
        <ul className={listClass} >
          <li>{t("pepsico.item1")}</li>
          <li>{t("pepsico.item2")}</li>
          <li>{t("pepsico.item3")}</li>
        </ul>
      )
    },
    {
      id: 3,
      title: t("neurogram.title"),
      company: t("neurogram.company"),
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      description: (
        <ul className={listClass} >
          <li>{t("neurogram.item1")}</li>
          <li>{t("neurogram.item2")}</li>
          <li>{t("neurogram.item3")}</li>
        </ul>
      )
    }
  ];
};