"use client";

import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "@/hooks/usePathname";
import { cn } from "@/utils";
import { Typography } from "@/components/Typography";

type Props = {
  children: ReactNode;
  defaultValue: "en" | "br";
  label: string;
  title: ReactNode;
};

const flags = {
  br: "🇧🇷",
  en: "🇺🇸",
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  title,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <label
      className={cn(
        "text-foreground hover:border-foreground relative flex cursor-pointer items-center gap-10 border-b-1 border-transparent",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <Typography.P className="md:hidden">{title}</Typography.P>
      {flags[defaultValue]}
      <p className="sr-only">{label}</p>
      <select
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
