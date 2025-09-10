"use client";

import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "@/hooks/usePathname";
import { cn } from "@/utils";
import { Typography } from "@/components/Typography";
import { Emojis } from "@/constants/emojis";

type Props = {
  defaultValue: "en" | "br";
  label: string;
  title: ReactNode;
};

const flags = {
  br: <Emojis.BrazilFlag height={30} width={30} />,
  en: <Emojis.UnitedStatesFlag height={30} width={30} />,
};

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  title,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleFlagClick = () => {
    const nextLocale = defaultValue === "en" ? "br" : "en";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <label
      className={cn(
        "text-foreground hover:border-bottom-gradient relative flex w-full cursor-pointer items-center justify-between gap-10 border-b-1 border-transparent",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <Typography.P className="md:hidden">{title}</Typography.P>
      <Typography.Small
        className="cursor-pointer text-2xl transition-all hover:scale-110"
        onClick={handleFlagClick}
      >
        {flags[defaultValue]}
      </Typography.Small>
      <p className="sr-only">{label}</p>
    </label>
  );
}
