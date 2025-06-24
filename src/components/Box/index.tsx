import { cn } from "@/utils";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  display?: "flex" | "grid";
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: string;
  p?: string;
  m?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
}

export const Box = ({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "start",
  gap = "0",
  p = "0",
  m = "0",
  border = "none",
  borderRadius = "0",
  width = "full",
  height = "full",
}: BoxProps) => {
  const heightClass = height === "full" ? "h-full" : `h-[${height}]`;
  const widthClass = width === "full" ? "w-full" : `w-[${width}]`;
  const paddingClass = p === "0" ? "p-0" : `p-[${p}]`;
  const marginClass = m === "0" ? "m-0" : `m-[${m}]`;

  return (
    <div
      className={cn(
        ` ${widthClass} ${heightClass} flex flex-${direction} justify-${justify} items-${align} gap-${gap} ${paddingClass} ${marginClass} border-${border} rounded-${borderRadius}`,
        className
      )}
    >
      {children}
    </div>
  );
};
