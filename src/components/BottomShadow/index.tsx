import { cn } from "@/utils";

export const BottomShadow = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "to-background/100 from-background/0 fixed bottom-0 z-50 hidden h-[50px] w-full bg-gradient-to-b md:block",
        className,
      )}
    />
  );
};
