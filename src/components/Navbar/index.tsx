"use client";

import { getRoutesConfig } from "@/constants/Links";
import { Box } from "../Box";
import { usePathname } from "@/hooks/usePathname";
import { useTranslations } from "next-intl";
import { memo, useCallback, useState } from "react";
import { getBasePath } from "@/utils";
import { motion } from "motion/react";
import { Link } from "../Link";
import { cn } from "@/utils";
import { ILink } from "@/interfaces/link";

const PROD_ENV = process.env.NODE_ENV === "production";

export const Navbar = memo(({ children, className }: { children?: React.ReactNode; className?: string }) => {
  const pathname = usePathname();
  const t = useTranslations("Constants");
  const routesConfig = getRoutesConfig(t);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isSelected = useCallback(
    (href: string) => getBasePath({ pathname, href }),
    [pathname],
  );

  return (
    <Box
      as="nav"
      width="auto"
      className={cn("hidden items-center gap-5 font-medium md:flex", className)}
      data-testid="navbar"
      height="none"
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-5">
        {routesConfig.map((link: ILink) => {
          const selected = isSelected(link.href);
          const isHovered = hoveredItem === link.href;

          if (link.href === '/blog' && PROD_ENV) {
            return null;
          }
          return (
            (
              <motion.li
                key={link.href}
                className="relative list-none"
                initial={false}
                animate={{
                  backgroundColor: isHovered
                    ? "hsl(var(--muted))"
                    : "transparent",
                }}
                whileHover={{
                  backgroundColor: isHovered
                    ? "hsl(var(--muted))"
                    : "hsl(var(--muted) / 0.5)",
                }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredItem(link.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-primary relative flex flex-row items-center gap-2 rounded-md px-1 py-0.5 text-base font-normal transition-all duration-200 ease-in-out",
                  )}
                  prefetch
                  aria-label={link.label}
                  aria-current={selected ? "page" : undefined}
                >
                  <span className={cn(selected && "text-blue-500")}>
                    {link.icon}
                  </span>
                  <span className={cn(selected && "text-blue-500")}>
                    {link.title}
                  </span>
                </Link>
                {(isHovered || selected) && (
                  <motion.span
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                    layoutId="navbar-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    role="presentation"
                    aria-hidden="true"
                  />
                )}
              </motion.li>
            ))
        })}
      </ul>
      {children}
    </Box>
  );
});

Navbar.displayName = "Navbar";
