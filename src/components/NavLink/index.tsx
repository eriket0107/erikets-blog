"use client";

import { ILink } from "@/interfaces/link";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";

interface INavLink
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  link: ILink;
  className?: string;
}

export const NavLink = ({ link, className, ...rest }: INavLink) => {
  const { href, icon, label, title } = link;
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "border-b-accent-foreground flex flex-row items-center gap-1 text-base font-normal transition-all duration-100 ease-in-out hover:border-b-1 hover:opacity-85",
        isSelected && "border-b-1",
        className,
      )}
      prefetch
      aria-label={label}
      role="link"
      {...rest}
    >
      {icon}
      {title}
    </Link>
  );
};
