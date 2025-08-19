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
        "text-primary bg-accent w-auto rounded-md p-1 text-center text-xs font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
};
