import { ILink } from "@/interfaces/link";
import { cn } from "@/utils";
import { AnchorHTMLAttributes, memo } from "react";
import { Link } from "../Link";

interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  link: ILink;
  className?: string;
  isFooter?: boolean;
  isSelected?: boolean;
}

export const NavLink = memo(
  ({
    link,
    className,
    isFooter = false,
    isSelected = false,
    ...rest
  }: NavLinkProps) => {
    const { href, icon, label, title } = link;

    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "text-primary border-b-accent-foreground flex flex-row items-center gap-1 text-base font-normal transition-discrete duration-100 ease-in-out hover:scale-95 hover:border-b-1 hover:opacity-85",
          isSelected && "border-b-1",
          className,
        )}
        prefetch
        aria-label={label}
        {...rest}
      >
        {icon}
        <span className={cn(isFooter && "hidden md:flex")}>{title}</span>
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";
