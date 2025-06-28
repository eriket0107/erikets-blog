import { ILink } from "@/interfaces/link";
import { BookUser, Home, User, Github, Linkedin } from "lucide-react";

export const routesConfig: ILink[] = [
  {
    href: "/",
    icon: <Home size={16} className="text-primary" />,
    title: "Home",
    label: "Navigate to Home page",
  },
  {
    href: "/blog",
    icon: <BookUser size={16} className="text-primary" />,
    title: "Blog",
    label: "Navigate to Blog page",
  },
  {
    href: "/about",
    icon: <User size={16} className="text-primary" />,
    title: "About me",
    label: "Navigate to About page",
  },
  // {
  //   href: "/setup",
  //   icon: <Settings2 size={20} className="text-primary" />,
  //   title: "Setup",
  //   label: "Navigate to Setup page",
  // },
] as const;

export const socialLinks: ILink[] = [
  {
    icon: <Github className="h-[20px] w-[20px]" />,
    title: "Github",
    href: "https://github.com/eriket0107",
  },
  {
    icon: <Linkedin className="h-[20px] w-[18px]" />,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/oliveira-erik/",
  },
] as const;
