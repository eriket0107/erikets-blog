"use client";
import { useScroll, useSpring, motion } from "motion/react";
import { useEffect, useRef } from "react";

export const ScrollProgress = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Find the scrollable container (the Layout component)
    const scrollContainer = document.querySelector(".screen-layout");
    if (scrollContainer) {
      ref.current = scrollContainer as HTMLElement;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 7,
        originX: 0,
        zIndex: 1000,
      }}
      className="bg-linear-to-r from-blue-500 to-cyan-500"
    />
  );
};
