import { ReactNode } from "react";
import { cn } from "@/utils";
import { ShineBorder } from "../ui/shine-border";
import { BorderBeam } from "../ui/border-beam";

export const BorderAnimated = ({
  className,
  children,
  classAnimation = 'animate-fade-in-fast',
}: {
  className?: string;
  children: ReactNode;
  classAnimation?: string;
}) => {
  return (
    <div className={cn("p-3 relative rounded-sm w-full overflow-hidden", classAnimation)}>
      <BorderBeam colorFrom={"#3b82f6"} colorTo={"#039bb6"} duration={7} borderWidth={3} size={200} />
      <div className={cn("p-2", className)}>{children}</div>
    </div>
  );
};
