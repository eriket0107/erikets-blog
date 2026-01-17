"use client";
import Image from "next/image";
import { Timeline } from "@/components/Timeline";
import { ExternalLink, Milestone, Wrench } from "lucide-react";
import {
  Accordion as AccordionDefault,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { STACK_CATEGORIES, getSortedCategoryItems } from "@/constants/Stack";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Typography } from "../Typography";

export const AboutAccordion = () => {
  const t = useTranslations("AboutPage");
  const tStack = useTranslations("stack");
  const accordionRef = useRef<HTMLDivElement>(null);

  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!!accordionValue && accordionRef.current) {
      setTimeout(() => {
        accordionRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [accordionValue]);

  return (
    <AccordionDefault
      type="single"
      collapsible
      className="animate-fade-in-slow text-primary w-full px-4"
      aria-label="Professional information sections"
      value={accordionValue}
      onValueChange={setAccordionValue}
      ref={accordionRef}
    >
      <AccordionItem value="career">
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
          <Timeline />
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
          {Object.entries(STACK_CATEGORIES).map(([category, keys]) => {
            const items = getSortedCategoryItems(keys);
            if (!items.length) return null;

            return (
              <div key={category} className="cursor-default">
                <Typography.H4 className="text-accent-foreground mb-2 text-lg font-bold">
                  {tStack(`category.${category}`)}
                </Typography.H4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge
                      key={item.name}
                      className="dark:bg-background text-accent-foreground border-accent gap-2 border bg-gray-200 px-4 py-2 transition-all hover:scale-95"
                    >
                      <Image
                        src={item.src}
                        width={15}
                        height={15}
                        alt={item.name}
                      />
                      <Typography.Small>{item.name}</Typography.Small>
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
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
