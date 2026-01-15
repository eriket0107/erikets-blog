import { cn } from "@/utils";
import { ReactNode } from "react";
import { Sparkles } from "../Sparkles";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { BottomShadow } from "../BottomShadow";

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
        "mb-auto min-h-dvh flex w-full flex-col items-center justify-start gap-4 p-4 pt-32 md:mx-auto md:w-240 md:pt-24",
        className,)}
    >
      <Sparkles />
      {children}
    </div>

    {hasFooter &&
      <>
        <BottomShadow />
        <Footer />
      </>
    }
  </>
  );
};
