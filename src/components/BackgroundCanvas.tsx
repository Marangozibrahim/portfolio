import { useEffect, useRef } from "react";

/**
 * Animated canvas background — network scene.
 * Nodes drift and connect when close; depth-based parallax on scroll.
 * Accent color read live from --accent-rgb. Respects prefers-reduced-motion.
 */
export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionOff = () => reduced || root.dataset.motion === "off";

    let W = 0, H = 0, DPR = 1;
    let accent = [108, 182, 255];

    function readAccent() {
      const v = getComputedStyle(root).getPropertyValue("--accent-rgb").trim();
      const parts = v.split(",").map((n) => parseInt(n, 10));
      if (parts.length === 3 && parts.every((n) => !isNaN(n))) accent = parts;
    }
    const rgba = (a: number) => `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${a})`;

    type Node = {
      x: number; y: number; vx: number; vy: number;
      r: number; z: number; pulse: number; _x: number; _y: number;
    };
    let nodes: Node[] = [];

    function initNodes() {
      const count = Math.round(Math.min(110, (W * H) / 16000));
      nodes = Array.from({ length: count }, () => {
        const z = Math.random() * 0.7 + 0.3;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28 * z,
          vy: (Math.random() - 0.5) * 0.28 * z,
          r: (Math.random() * 1.4 + 0.7) * z,
          z,
          pulse: Math.random() * Math.PI * 2,
          _x: 0,
          _y: 0,
        };
      });
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, W, H);
      const link = 150;
      const sy = window.scrollY || 0;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
        n.pulse += 0.02 * dt;
        // depth-based parallax: near nodes shift more than far ones
        const par = 0.05 + 0.3 * n.z;
        let dy = (n.y - sy * par) % H;
        if (dy < 0) dy += H;
        n._x = n.x;
        n._y = dy;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a._x - b._x, a._y - b._y);
          if (d < link) {
            const o = (1 - d / link) * 0.22 * Math.min(a.z, b.z);
            ctx!.strokeStyle = rgba(o);
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a._x, a._y);
            ctx!.lineTo(b._x, b._y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = rgba((0.3 + Math.sin(n.pulse) * 0.16) * n.z);
        ctx!.beginPath();
        ctx!.arc(n._x, n._y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.floor(W * DPR);
      canvas!.height = Math.floor(H * DPR);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      initNodes();
    }

    let last = performance.now();
    let raf: number | null = null;

    function frame(now: number) {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      draw(dt);
      if (!motionOff()) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf !== null) cancelAnimationFrame(raf);
      draw(0);
      if (motionOff()) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    // re-read accent when CSS variable changes
    const observer = new MutationObserver(() => { readAccent(); });
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => { resize(); start(); }, 120);
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      if (raf === null) draw(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      } else if (!motionOff()) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    readAccent();
    resize();
    start();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeT);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}
