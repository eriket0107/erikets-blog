import { Link as LinkI18N } from "@/i18n/navigation";
import { ComponentProps } from "react";

export const Link = ({
  children,
  ...props
}: ComponentProps<typeof LinkI18N>) => {
  return <LinkI18N {...props}>{children}</LinkI18N>;
};
