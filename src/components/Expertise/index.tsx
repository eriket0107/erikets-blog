import { MilestoneType } from "@/interfaces/milestone";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";


const listClass = "list-disc pl-4 space-y-1 over"

export const Expertise = (): MilestoneType[] => {
  const t = useTranslations("Milestones");

  const highlightClass = "text-[var(--expertise-highlight)] bg-transparent font-bold px-[2px] rounded";

  return [
    {
      id: 1,
      title: t("multiplan.title"),
      company: t("multiplan.company"),
      startDate: "2022-02-01",
      endDate: new Date().toISOString(),
      description: (
        <ul className={cn(listClass)} >
          <li>{t.rich("multiplan.item1", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item2", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item3", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item4", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item5", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item6", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("multiplan.item7", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
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
          <li>{t.rich("pepsico.item1", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("pepsico.item2", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("pepsico.item3", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
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
          <li>{t.rich("neurogram.item1", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("neurogram.item2", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
          <li>{t.rich("neurogram.item3", { strong: (chunks) => <strong className={highlightClass}>{chunks}</strong> })}</li>
        </ul>
      )
    }
  ];
};