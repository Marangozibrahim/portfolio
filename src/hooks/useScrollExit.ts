import { useEffect, useRef } from "react";

/**
 * Fades and slides the referenced element up as the user scrolls
 * through the first ~70% of the viewport. Mutates style directly
 * (no re-renders). No-op under prefers-reduced-motion.
 */
export function useScrollExit<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
      el.style.opacity = String(1 - p * 0.95);
      el.style.transform = `translateY(${-p * 60}px) scale(${1 - p * 0.05})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
