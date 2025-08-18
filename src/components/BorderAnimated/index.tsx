import { ReactNode } from "react";
import style from "./style.module.css";
import { cn } from "@/utils";

export const BorderAnimated = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={style.card}>
      <div className={cn("bg-background p-2", className)}>{children}</div>
    </div>
  );
};
