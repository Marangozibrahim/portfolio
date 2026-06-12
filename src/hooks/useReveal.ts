import { useEffect, useRef } from "react";

/**
 * Toggles `is-visible` on the element as it enters/leaves the viewport,
 * so reveal animations replay on every pass (scrolling down or up).
 * The class is only removed once the element is fully offscreen,
 * which prevents mid-view flicker.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          el.classList.add("is-visible");
        } else if (!entry.isIntersecting) {
          el.classList.remove("is-visible");
        }
      },
      { threshold: [0, 0.15] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
