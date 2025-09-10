import { cn } from "@/utils";
import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "text-primary w-auto rounded-md border-1 bg-slate-100 p-1 text-center text-xs font-semibold dark:dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </span>
  );
};
