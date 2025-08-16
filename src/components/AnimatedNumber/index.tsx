"use client";

import { CSSProperties, useEffect, useRef } from "react";
import styles from "./style.module.css";
import { cn } from "@/utils";

interface AnimatedNumberStyle extends CSSProperties {
  "--value"?: number;
  "--timer"?: string;
}

interface AnimatedNumberProps {
  value: number;
  timer?: string;
  style?: AnimatedNumberStyle;
  className?: string;
}

export const AnimatedNumber = ({
  value,
  timer = "1s",
  style,
  className,
}: AnimatedNumberProps) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (element) {
      element.style.setProperty("--value", value.toString());
      element.style.setProperty("--timer", timer);
    }
  }, [value, timer]);

  return (
    <span
      ref={numberRef}
      style={style}
      className={cn(
        styles.animatedNumber,
        "text-gradient text-xl font-bold",
        className,
      )}
    />
  );
};
