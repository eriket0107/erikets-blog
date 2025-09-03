"use client";

import { paginationCookie } from "@/constants/cookies";
import { Button } from "../ui/button";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "@/hooks/useRouter";
import { memo, useEffect, useState } from "react";

interface SeeAllPostsButtonProps {
  initialValue: boolean;
}

export const SeeAllPostsButton = memo(
  ({ initialValue }: SeeAllPostsButtonProps) => {
    const route = useRouter();
    const [cookiePaginationValue, setCookiePaginationValue] =
      useState(initialValue);

    const handleCookiePagination = () => {
      const cookies = parseCookies();
      const hasCookiePagination = cookies[paginationCookie];

      if (!hasCookiePagination || hasCookiePagination === undefined) {
        setCookie(null, paginationCookie, "true");
        setCookiePaginationValue(true);
        route.refresh();
        return;
      }

      const newValue = hasCookiePagination === "true" ? "false" : "true";
      setCookie(null, paginationCookie, newValue);
      setCookiePaginationValue(newValue === "true");
      route.refresh();
    };

    useEffect(() => {
      setCookiePaginationValue(initialValue);
    }, [setCookiePaginationValue, initialValue]);

    return (
      <Button
        variant={"link"}
        className="animate-fade-in-fast absolute left-0 flex h-[30px] cursor-pointer !p-0 transition-all transition-discrete hover:scale-95 hover:opacity-85"
        onClick={handleCookiePagination}
        aria-label={
          cookiePaginationValue
            ? "Switch to paginated view of blog posts"
            : "Switch to show all blog posts"
        }
        role="switch"
        type="button"
      >
        <span aria-hidden="true">
          {cookiePaginationValue ? "See all" : "See pages"}
        </span>
        <span className="sr-only">
          {cookiePaginationValue
            ? "Currently showing paginated posts. Click to see all posts."
            : "Currently showing all posts. Click to see paginated view."}
        </span>
      </Button>
    );
  },
);

SeeAllPostsButton.displayName = "SeeAllPostsButton";
