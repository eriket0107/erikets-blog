import { cn } from "@/utils";
import { ReactNode } from "react";

interface PageWrapperProps {
  className?: string | string[];
  children: ReactNode;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto mb-auto flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-30 md:pt-24",
        className,
      )}
    >
      {children}
    </div>
  );
};
