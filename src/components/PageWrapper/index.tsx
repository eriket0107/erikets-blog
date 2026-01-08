import { cn } from "@/utils";
import { ReactNode } from "react";
import { Sparkles } from "../Sparkles";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface PageWrapperProps {
  className?: string | string[];
  children: ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
}

export const PageWrapper = ({ children, className, hasHeader = true, hasFooter = true }: PageWrapperProps) => {
  return (<>
    {hasHeader && <Header />}
    <div
      className={cn(
        "mb-auto flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-32 md:mx-auto md:w-[1000px] md:pt-24",
        className,
      )}
    >
      <Sparkles />
      {children}
    </div>
    {hasFooter && <Footer />}
  </>
  );
};
