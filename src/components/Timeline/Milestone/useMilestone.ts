import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useId, useRef, useState } from "react";

export const useTimeline = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refModal = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const id = useId();

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const toggleActive = () => {
    setActive(prev => !prev);
  };

  useOutsideClick(refModal, () => setActive(false));

  return {
    ref,
    refModal,
    inView,
    active,
    toggleActive,
    setActive,
    id,
  };
}