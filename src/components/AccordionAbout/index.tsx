import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timeline } from "@/components/Timeline";
import { ExternalLink, Milestone, Wrench } from "lucide-react";
import {
  Accordion as AccordionDefault,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stack } from "@/constants/Stack";


import { milestones } from "@/constants/milestones";
import { getTranslations } from "next-intl/server";

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
      <AccordionItem value="career" >
        <AccordionTrigger
          className="transform-all cursor-pointer text-2xl transition-discrete hover:scale-98"
          id="milestones"
          aria-describedby="milestones-description"
        >
          <div className="flex gap-2">
            <Milestone aria-hidden="true" size={30} />
            {t("career")}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex h-full flex-col gap-4 overflow-y-scroll text-balance"
          id="milestones-description"
          role="region"
          aria-label="Career milestones and achievements"
        >
          <Timeline milestones={SORTED_MILESTONES} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="toolset">
        <AccordionTrigger
          className="transform-all cursor-pointer text-2xl transition-discrete hover:scale-98"
          id="technologies"
          aria-describedby="toolset-description"
        >
          <div className="flex gap-2">
            <Wrench aria-hidden="true" size={30} />
            {t("technologies")}
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
                <TooltipContent className="text-lg">{value.name}</TooltipContent>
                <TooltipTrigger>
                  <Image
                    className="hover:scale-95"
                    src={value.src}
                    width={40}
                    height={40}
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
          className="transform-all cursor-pointer text-2xl transition-discrete hover:scale-98"
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
            <ExternalLink aria-hidden="true" size={30} />
            Resume
          </a>
        </AccordionTrigger>
      </AccordionItem>
    </AccordionDefault>
  );
};
