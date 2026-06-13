import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

/**
 * Inertia smooth-scrolling via Lenis. Anchor links land under the sticky
 * nav via each section's `scroll-margin-top` (which Lenis honors) — no extra
 * anchor offset, or the two stack into a redundant gap. Skipped entirely
 * under prefers-reduced-motion (native scrolling is used instead).
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
