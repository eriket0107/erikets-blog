"use client";

import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "@/hooks/usePathname";
import { cn } from "@/utils";
import { Typography } from "@/components/Typography";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Emojis } from "@/constants/emojis";

type Props = {
  defaultValue: "en" | "br";
  label: string;
  title: ReactNode;
};

const flags = {
  en: <Emojis.BrazilFlag height={30} width={30} />,
  br: <Emojis.UnitedStatesFlag height={30} width={30} />,
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
        "text-foreground relative flex min-h-4 w-fit min-w-4 cursor-pointer items-center justify-between gap-10 border-b border-transparent",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <Typography.P className="text-md hidden cursor-help">
        {title}
      </Typography.P>
      <Tooltip>
        <TooltipTrigger asChild>
          <Typography.Small
            className="cursor-pointer text-2xl transition-all hover:scale-110"
            onClick={handleFlagClick}
          >
            {flags[defaultValue]}
          </Typography.Small>
        </TooltipTrigger>
        <TooltipContent className="z-100">{title}</TooltipContent>
      </Tooltip>

      <p className="sr-only">{label}</p>
    </label>
  );
}
