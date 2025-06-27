import { BookUser, Home, User } from "lucide-react";

interface IRoutes {
  title: string;
  icon: React.ReactNode;
  href: string;
  label: string;
}

export const routesConfig: IRoutes[] = [
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
