import { Avatar } from "@/components/Avatar";
import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { socialLinks } from "@/constants/Links";
import { Download, MapPin, Milestone, Wrench } from "lucide-react";
import ProfileImage from "@/assets/profile-erik.webp";
import { Stack } from "@/constants/Stack";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DISPLAYED_STACK_ITEMS = Object.values(Stack)
  .filter((value) => value.display)
  .sort((a, b) => a.name.localeCompare(b.name));

export const About = () => {
  return (
    <Box
      as="main"
      justify="center"
      direction="col"
      align="center"
      padding="4"
      role="main"
      aria-label="About Erik Oliveira"
    >
      <Box
        as="article"
        direction="col"
        className="w-[320px] md:w-[600px]"
        justify="start"
        align="start"
        gap="8"
      >
        <Box
          as="section"
          direction="col"
          gap="4"
          align="start"
          height="auto"
          justify="start"
          className="animate-fade-in-fast"
          aria-labelledby="profile-heading"
        >
          <Box
            as="header"
            direction="row"
            justify="none"
            width="auto"
            align="center"
            gap="2"
          >
            <Avatar
              alt="Erik Oliveira's profile picture"
              imgSrc={ProfileImage.src}
              fallback="EO"
            />
            <Typography.H1 id="profile-heading">Erik Oliveira</Typography.H1>
          </Box>

          <Box
            as="section"
            direction="col"
            gap="6"
            aria-label="Professional summary"
          >
            <div>
              <Typography.P>
                +3 years of professional experience with Software Engineering,
                Fullstack developer focused on Front-end using TypeScript,
                React, and NextJS, developing web and mobile solutions. I work
                on a project with thousands of daily accesses Multi | Multiplan
                and also act on projects as a freelancer for companies Latop and
                Neurogram.
              </Typography.P>
            </div>

            <Box
              as="section"
              direction="col"
              gap="1"
              aria-label="Social media links"
            >
              <Typography.P>
                Você também pode me encontrar através das minhas redes sociais!
              </Typography.P>
              <Box
                as="nav"
                gap="3"
                direction="row"
                role="navigation"
                aria-label="Social media navigation"
              >
                {socialLinks.map((social) => (
                  <NavLink
                    className="hover:border-b-accent-foreground border-1 border-transparent"
                    key={social.title}
                    link={social}
                    aria-label={`Visit Erik's ${social.title} profile`}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Accordion
          type="single"
          collapsible
          className="animate-fade-in-slow w-full"
          aria-label="Professional information sections"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
              id="career"
              aria-describedby="career-description"
            >
              <div className="flex gap-2">
                <MapPin aria-hidden="true" />
                Where I'm right now
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="flex flex-col gap-4 text-balance"
              id="career-description"
              role="region"
              aria-label="Current position and work"
            >
              <Typography.P>
                Working at Multiplan, so far I've developed a parking lot
                application that has more then +70k daily users accesses. Which
                made the company led an innovation parking lot system throghout
                the country. At the moment we count more than +1M license plates
                registered in the system.
              </Typography.P>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
              id="stack"
              aria-describedby="stack-description"
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
          <AccordionItem value="item-3">
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
              <div className="animate-progress h-4 w-full bg-green-600" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger
              className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
              hasChevron={false}
              id="resume"
              aria-label="Download Erik's resume"
            >
              <Link
                href="/assets/erik-oliveira-resume.pdf"
                download="erik-oliveira-resume.pdf"
                className="flex gap-2"
                aria-label="Download Erik Oliveira's CV/Resume as PDF"
              >
                <Download aria-hidden="true" />
                CV / Resume
              </Link>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
