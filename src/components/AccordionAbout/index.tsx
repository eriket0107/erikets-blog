import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timeline } from "@/components/Timeline";
import { ExternalLink, MapPin, Milestone, Wrench } from "lucide-react";
import {
  Accordion as AccordionDefault,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stack } from "@/constants/Stack";
import { Typography } from "../Typography";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { milestones } from "@/constants/milestones";
import { AnimatedNumber } from "../AnimatedNumber";

const DISPLAYED_STACK_ITEMS = Object.values(Stack)
  .filter((value) => value.display)
  .sort((a, b) => a.name.localeCompare(b.name));

const SORTED_MILESTONES = [...milestones].sort((a, b) => {
  const dateA = a.endDate || "";
  const dateB = b.endDate || "";
  if (dateB > dateA) return 1;
  else return -1;
});

export const AccordionAbout = async () => {
  const t = await getTranslations("AboutPage");

  return (
    <AccordionDefault
      type="single"
      collapsible
      className="animate-fade-in-slow text-primary w-full px-4"
      aria-label="Professional information sections"
    >
      <AccordionItem value="now">
        <AccordionTrigger
          className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
          id="career"
          aria-describedby="career-description"
        >
          <div className="flex gap-2">
            <MapPin aria-hidden="true" />
            {t("now")}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex flex-col gap-4 text-balance"
          id="career-description"
          role="region"
          aria-label="Current position and work"
        >
          <Typography.P>
            {t.rich("experience", {
              dau: () => (
                <Tooltip>
                  <TooltipContent>70k</TooltipContent>
                  <TooltipTrigger>
                    <AnimatedNumber value={70000} />
                  </TooltipTrigger>
                </Tooltip>
              ),
              lpr: () => (
                <Tooltip>
                  <TooltipContent>1m</TooltipContent>
                  <TooltipTrigger>
                    <AnimatedNumber value={1_000_000} />
                  </TooltipTrigger>
                </Tooltip>
              ),
            })}
          </Typography.P>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="career">
        <AccordionTrigger
          className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
          id="milestones"
          aria-describedby="milestones-description"
        >
          <div className="flex gap-2">
            <Milestone aria-hidden="true" />
            {t("career")}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex h-full flex-col gap-4 overflow-y-scroll text-balance"
          id="milestones-description"
          role="region"
          aria-label="Career milestones and achievements"
        >
          <Suspense>
            <Timeline milestones={SORTED_MILESTONES} />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="toolset">
        <AccordionTrigger
          className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
          id="toolset"
          aria-describedby="toolset-description"
        >
          <div className="flex gap-2">
            <Wrench aria-hidden="true" />
            {t("tools")}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex flex-col gap-4 text-balance"
          id="stack-description"
          role="region"
          aria-label="Technical skills and tools"
        >
          <div
            className="flex flex-row gap-2"
            role="list"
            aria-label="Technologies and tools Erik uses"
          >
            {DISPLAYED_STACK_ITEMS.map((value) => (
              <Tooltip key={value.name}>
                <TooltipContent>{value.name}</TooltipContent>
                <TooltipTrigger>
                  <Image
                    className="hover:scale-95"
                    src={value.src}
                    width={25}
                    height={25}
                    alt={`${value.name} technology logo`}
                    role="listitem"
                    aria-label={`${value.name} - technology used by Erik`}
                  />
                </TooltipTrigger>
              </Tooltip>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="resume">
        <AccordionTrigger
          className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
          hasChevron={false}
          id="resume"
          aria-label="Download Erik's resume"
        >
          <a
            href="/erik_oliveira_resume.pdf"
            target="_blank"
            className="flex gap-2"
            aria-label="Download Erik Oliveira's CV/Resume as PDF"
          >
            <ExternalLink aria-hidden="true" />
            Resume
          </a>
        </AccordionTrigger>
      </AccordionItem>
    </AccordionDefault>
  );
};
