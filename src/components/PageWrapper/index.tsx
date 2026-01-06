import { cn } from "@/utils";
import { ReactNode } from "react";
import { Sparkles } from "../Sparkles";

interface PageWrapperProps {
  className?: string | string[];
  children: ReactNode;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "mb-auto flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-32 md:mx-auto md:w-[700px] md:pt-24",
        className,
      )}
    >
      <Sparkles />
      {children}
    </div>
  );
};
