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
import { Download, Laptop, Milestone, Wrench } from "lucide-react";

export const About = () => (
  <Box justify="center" direction="col" align="center" padding="4">
    <Box
      direction="col"
      className="w-[320px] md:w-[600px]"
      justify="start"
      align="start"
      gap="8"
    >
      <Box direction="col" gap="4" align="start" height="auto" justify="start">
        <Box direction="row" justify="none" width="auto" align="center" gap="2">
          <Avatar
            alt="eriket0107"
            imgSrc="https://github.com/eriket0107.png"
            fallback="EO"
          />
          <Typography.H3>Erik Oliveira</Typography.H3>
        </Box>

        <Box direction="col" gap="6">
          <div>
            <Typography.P>
              +4 years of professional experience with Software Engineering,
              Fullstack developer focused on Front-end using TypeScript, React,
              and NextJS, developing web and mobile solutions. I work on a
              project with thousands of daily accesses Multi | Multiplan and
              also act on projects as a freelancer for companies Latop and
              Neurogram.
            </Typography.P>
          </div>

          <Box direction="col" gap="1">
            <Typography.P>
              Você também pode me encontrar através das minhas redes sociais!
            </Typography.P>
            <Box gap="3" direction="row">
              {socialLinks.map((social) => (
                <NavLink
                  className="hover:border-b-accent-foreground border-1 border-transparent"
                  key={social.title}
                  link={social}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
            id="career"
          >
            <div className="flex gap-2">
              <Laptop />
              Carreira
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <Typography.P>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </Typography.P>
            <Typography.P>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </Typography.P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger
            className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
            id="stack"
          >
            <div className="flex gap-2">
              <Wrench />
              Stack
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger
            className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
            id="milestones"
          >
            <div className="flex gap-2">
              <Milestone />
              Milestones
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger
            className="transform-all cursor-pointer text-xl transition-discrete hover:scale-98"
            hasChevron={false}
            id="resume"
          >
            <Link
              href="/assets/erik-oliveira-resume.pdf"
              download="erik-oliveira-resume.pdf"
              className="flex gap-2"
            >
              <Download />
              CV / Resume
            </Link>
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </Box>
  </Box>
);
