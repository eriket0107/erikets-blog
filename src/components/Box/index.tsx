import { cn } from "@/utils";
import { ElementType, HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  display?: "flex" | "grid";
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  justify?:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly"
    | "none";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  gap?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

const displayClasses = {
  flex: "flex",
  grid: "grid",
};

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  none: "",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const widthClasses = {
  full: "w-full",
  auto: "w-auto",
  fit: "w-fit",
  min: "w-min",
  max: "w-max",
};

const heightClasses = {
  full: "h-full",
  auto: "h-auto",
  fit: "h-fit",
  min: "h-min",
  max: "h-max",
};

const gapClasses = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
};

const borderClasses = {
  none: "",
  default: "border",
  "1": "border",
  "2": "border-2",
  "4": "border-4",
  "8": "border-8",
};

const borderRadiusClasses = {
  "0": "rounded-none",
  sm: "rounded-sm",
  default: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const paddingClasses = {
  "0": "p-0",
  "1": "p-1",
  "2": "p-2",
  "3": "p-3",
  "4": "p-4",
  "5": "p-5",
  "6": "p-6",
  "8": "p-8",
  "10": "p-10",
  "12": "p-12",
  "16": "p-16",
  "20": "p-20",
  "24": "p-24",
};

const marginClasses = {
  "0": "m-0",
  "1": "m-1",
  "2": "m-2",
  "3": "m-3",
  "4": "m-4",
  "5": "m-5",
  "6": "m-6",
  "8": "m-8",
  "10": "m-10",
  "12": "m-12",
  "16": "m-16",
  "20": "m-20",
  "24": "m-24",
};

export const Box = ({
  as: Component = "div",
  children,
  className,
  display = "flex",
  direction = "row",
  justify = "start",
  align = "start",
  gap = "0",
  border = "none",
  borderRadius = "0",
  width = "full",
  height = "full",
  padding = "0",
  margin = "0",
  ...rest
}: BoxProps) => {
  const classes = [
    displayClasses[display],
    display === "flex" && directionClasses[direction],
    justifyClasses[justify],
    alignClasses[align],
    gapClasses[gap as keyof typeof gapClasses] || `gap-[${gap}]`,
    borderClasses[border as keyof typeof borderClasses] || `border-[${border}]`,
    borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] ||
      `rounded-[${borderRadius}]`,
    widthClasses[width as keyof typeof widthClasses] || `w-[${width}]`,
    heightClasses[height as keyof typeof heightClasses] || `h-[${height}]`,
    paddingClasses[padding as keyof typeof paddingClasses] || `p-[${padding}]`,
    marginClasses[margin as keyof typeof marginClasses] || `m-[${margin}]`,
  ].filter(Boolean);

  return (
    <Component className={cn(classes, className)} {...rest}>
      {children}
    </Component>
  );
};
