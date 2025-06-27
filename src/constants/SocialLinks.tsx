import { Github, Linkedin } from "lucide-react";

interface ISocialLinks {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export const socialLinks: ISocialLinks[] = [
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
];
