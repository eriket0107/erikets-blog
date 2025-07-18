import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timeline } from "@/components/Timeline";
import { Download, MapPin, Milestone, Wrench } from "lucide-react";
import {
  Accordion as AccordionDefault,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stack } from "@/constants/Stack";
import { Typography } from "../Typography";
import { Suspense } from "react";

const DISPLAYED_STACK_ITEMS = Object.values(Stack)
  .filter((value) => value.display)
  .sort((a, b) => a.name.localeCompare(b.name));

export const AccordionAbout = () => {
  return (
    <AccordionDefault
      type="single"
      collapsible
      className="animate-fade-in-slow w-full"
      aria-label="Professional information sections"
      defaultValue="now"
    >
      <AccordionItem value="now">
        <AccordionTrigger
          className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
          id="career"
          aria-describedby="career-description"
        >
          <div className="flex gap-2">
            <MapPin aria-hidden="true" />
            {`Where I'm right now`}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex flex-col gap-4 text-balance"
          id="career-description"
          role="region"
          aria-label="Current position and work"
        >
          <Typography.P>
            Working at Multiplan, so far I&apos;ve developed a parking lot
            application that has more then +70k daily users accesses. Which made
            the company led an innovation parking lot system throghout the
            country. At the moment is counted more than +1M license plates
            registered in the system. My recent achivement was the rollout of Ev
            Charger station for electric cars, I was responsible for integrating
            third party partners with our API, focused primaly on frontend but
            also developed backend.
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
            Career
          </div>
        </AccordionTrigger>
        <AccordionContent
          className="flex flex-col gap-4 text-balance"
          id="milestones-description"
          role="region"
          aria-label="Career milestones and achievements"
        >
          <Suspense>
            <Timeline />
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
            Toolset
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
            href="/assets/_EN-CV-ERIK-OLIVEIRA-vDD.pdf"
            download
            className="flex gap-2"
            aria-label="Download Erik Oliveira's CV/Resume as PDF"
          >
            <Download aria-hidden="true" />
            CV / Resume
          </a>
        </AccordionTrigger>
      </AccordionItem>
    </AccordionDefault>
  );
};
