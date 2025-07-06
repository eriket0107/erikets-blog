"use client";
import { useScroll, useSpring, motion } from "motion/react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
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
        top: 70,
        left: 0,
        right: 0,
        height: 7,
        originX: 0,
        zIndex: 2,
      }}
      className="bg-accent-foreground"
    />
  );
};
