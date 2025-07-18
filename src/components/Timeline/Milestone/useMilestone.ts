import { useEffect, useRef, useState } from "react";

export const useTimeline = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        } else {
          setInView(false);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return {
    ref,
    inView
  }
}