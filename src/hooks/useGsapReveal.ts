import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface RevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  target?: React.RefObject<HTMLElement | null>;
}

export function useGsapReveal<T extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    stagger = 0.12,
    duration = 0.9,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    once = true,
    target,
  } = options;

  const ref = target ?? { current: null as T | null };

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = el.querySelectorAll("[data-reveal]").length
        ? el.querySelectorAll("[data-reveal]")
        : el;

      gsap.fromTo(
        targets,
        { y, x, opacity, scale },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
