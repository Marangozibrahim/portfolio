import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll via position check.
 * Marks the element visible whenever its top crosses 88% of the viewport,
 * and resets once it scrolls fully out — so the animation replays on every pass.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const check = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const inBand = r.top < window.innerHeight * 0.88 && r.bottom > 0;
      const fullyOut = r.bottom <= 0 || r.top >= window.innerHeight;
      // Enter band → reveal. Leave viewport entirely → reset so it replays.
      if (inBand) setVisible(true);
      else if (fullyOut) setVisible(false);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    // catch elements already in view once layout/fonts settle
    const t1 = setTimeout(check, 300);
    const t2 = setTimeout(check, 1200);

    return () => {
      window.removeEventListener("scroll", check);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return { ref, visible };
}
