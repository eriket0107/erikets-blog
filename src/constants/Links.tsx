import { ILink } from "@/interfaces/link";
import {
  BookUser,
  Home,
  User,
  Github,
  Linkedin,
  Settings2,
} from "lucide-react";

const homeIcon = <Home size={16} className="text-primary" />;
const blogIcon = <BookUser size={16} className="text-primary" />;
const aboutIcon = <User size={16} className="text-primary" />;
const githubIcon = <Github className="h-[20px] w-[20px]" />;
const linkedinIcon = <Linkedin className="h-[20px] w-[20px]" />;

type routesConfigKeyType = "home" | "about" | "blog";

export const getRoutesConfig = (t: (key: routesConfigKeyType) => string) =>
  [
    {
      href: "/",
      icon: homeIcon,
      title: t("home"),
      label: "Navigate to Home page",
    },
    {
      href: "/blog",
      icon: blogIcon,
      title: t("blog"),
      label: "Navigate to Blog page",
    },
    {
      href: "/about",
      icon: aboutIcon,
      title: t("about"),
      label: "Navigate to About page",
    },
    {
      href: "/setup",
      icon: <Settings2 size={20} className="text-primary" />,
      title: "Setup",
      label: "Navigate to Setup page",
    },
  ] as const;

export const socialLinks: ILink[] = [
  {
    icon: githubIcon,
    title: "Github",
    href: "https://github.com/eriket0107",
  },
  {
    icon: linkedinIcon,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/oliveira-erik/",
  },
] as const;
