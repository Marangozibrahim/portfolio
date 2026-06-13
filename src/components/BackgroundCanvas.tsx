import { useEffect, useRef } from "react";

type Scene = "network" | "rain" | "aurora" | "grid" | "flat";

/**
 * Animated canvas background. Dependency-free; ported from the v2 redesign
 * bundle. Scenes are driven by `<html data-bg>` and stay cohesive with
 * `--accent` (read live from CSS). Respects prefers-reduced-motion and
 * `<html data-motion="off">`: paints one static frame, no rAF loop.
 *
 * `scene` sets `<html data-bg>` on mount; the engine's MutationObserver
 * reacts to later changes to data-bg / data-motion / accent.
 */
export function BackgroundCanvas({ scene = "network" }: { scene?: Scene }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.documentElement.dataset.bg = scene;
  }, [scene]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionOff = () => reduced || root.dataset.motion === "off";

    let W = 0;
    let H = 0;
    let DPR = 1;
    let mode = root.dataset.bg || "network";
    let accent = [108, 182, 255];

    function readAccent() {
      const v = getComputedStyle(root).getPropertyValue("--accent-rgb").trim();
      const parts = v.split(",").map((n) => parseInt(n, 10));
      if (parts.length === 3 && parts.every((n) => !isNaN(n))) accent = parts;
    }
    const rgba = (a: number) => `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${a})`;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.floor(W * DPR);
      canvas!.height = Math.floor(H * DPR);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      initMode();
    }

    /* ---------------- NETWORK (distributed-systems graph) ---------------- */
    type Node = {
      x: number; y: number; vx: number; vy: number;
      r: number; z: number; pulse: number; _x: number; _y: number;
    };
    let nodes: Node[] = [];
    function initNetwork() {
      const count = Math.round(Math.min(110, (W * H) / 16000));
      nodes = Array.from({ length: count }, () => {
        const z = Math.random() * 0.7 + 0.3; // depth: 0.3 (far) .. 1 (near)
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
    function drawNetwork(dt: number) {
      const link = 150;
      const sy = window.scrollY || window.pageYOffset || 0;
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = W + 20;
        else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        else if (n.y > H + 20) n.y = -20;
        n.pulse += 0.02 * dt;
        // depth-based parallax: near nodes shift more than far ones, all slower than the page
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
          const dx = a._x - b._x;
          const dy = a._y - b._y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            const depth = Math.min(a.z, b.z);
            const o = (1 - d / link) * 0.22 * depth;
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
        const glow = (0.3 + Math.sin(n.pulse) * 0.16) * n.z;
        ctx!.fillStyle = rgba(glow);
        ctx!.beginPath();
        ctx!.arc(n._x, n._y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    /* ---------------- DATA RAIN (terminal stream) ---------------- */
    type Column = { y: number; speed: number; len: number };
    let columns: Column[] = [];
    const GLYPHS = "01{}[]()<>/$;=+*#abcdef0123456789";
    const FONT = 16;
    function initRain() {
      const cols = Math.floor(W / FONT);
      columns = Array.from({ length: cols }, () => ({
        y: Math.random() * -H,
        speed: Math.random() * 1.6 + 0.7,
        len: Math.floor(Math.random() * 14 + 6),
      }));
    }
    function drawRain(dt: number) {
      ctx!.font = `${FONT}px "JetBrains Mono", monospace`;
      ctx!.textBaseline = "top";
      for (let i = 0; i < columns.length; i++) {
        const c = columns[i];
        const x = i * FONT;
        for (let k = 0; k < c.len; k++) {
          const yy = c.y - k * FONT;
          if (yy < -FONT || yy > H) continue;
          const ch = GLYPHS[(Math.floor(yy / FONT) + i) % GLYPHS.length];
          if (k === 0) {
            ctx!.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.85)`;
          } else {
            ctx!.fillStyle = rgba(Math.max(0, 0.32 * (1 - k / c.len)));
          }
          ctx!.fillText(ch, x, yy);
        }
        c.y += c.speed * dt;
        if (c.y - c.len * FONT > H) {
          c.y = Math.random() * -120;
          c.speed = Math.random() * 1.6 + 0.7;
          c.len = Math.floor(Math.random() * 14 + 6);
        }
      }
    }

    /* ---------------- AURORA (drifting accent light) ---------------- */
    type Blob = { x: number; y: number; r: number; ph: number; sp: number; hue: number };
    let blobs: Blob[] = [];
    function initAurora() {
      blobs = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 280 + 220,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.0006 + 0.0003,
        hue: i % 2 === 0 ? 1 : 0.55,
      }));
    }
    function drawAurora(t: number) {
      for (const b of blobs) {
        const cx = b.x + Math.cos(t * b.sp + b.ph) * 160;
        const cy = b.y + Math.sin(t * b.sp * 1.3 + b.ph) * 120;
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        g.addColorStop(0, rgba(0.1 * b.hue));
        g.addColorStop(0.5, rgba(0.04 * b.hue));
        g.addColorStop(1, rgba(0));
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    /* ---------------- GRID FLOW (receding perspective grid) ---------------- */
    let gridOff = 0;
    function drawGrid(dt: number) {
      const horizon = H * 0.42;
      const depth = H - horizon;
      const speed = 0.28;
      gridOff = (gridOff + speed * dt) % 1;
      // horizontal lines, exponential spacing toward horizon
      ctx!.lineWidth = 1;
      const lines = 26;
      for (let i = 0; i < lines; i++) {
        const f = (i + gridOff) / lines; // 0..1
        const z = Math.pow(f, 2.2); // perspective ease
        const y = horizon + z * depth;
        const o = Math.min(0.22, f * 0.3);
        ctx!.strokeStyle = rgba(o);
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
      // vertical lines converging to vanishing point
      const cx = W / 2;
      const cols = 24;
      for (let i = -cols; i <= cols; i++) {
        const o = Math.max(0, 0.16 - Math.abs(i) * 0.004);
        if (o <= 0) continue;
        ctx!.strokeStyle = rgba(o);
        ctx!.beginPath();
        ctx!.moveTo(cx + i * 14, horizon);
        ctx!.lineTo(cx + i * (W / cols), H);
        ctx!.stroke();
      }
      // soft horizon glow
      const g = ctx!.createLinearGradient(0, horizon - 60, 0, horizon + 40);
      g.addColorStop(0, rgba(0));
      g.addColorStop(1, rgba(0.1));
      ctx!.fillStyle = g;
      ctx!.fillRect(0, horizon - 60, W, 100);
    }

    /* ---------------- driver ---------------- */
    function initMode() {
      if (mode === "network") initNetwork();
      else if (mode === "rain") initRain();
      else if (mode === "aurora") initAurora();
      // grid + flat need no init
    }

    let last = performance.now();
    let raf: number | null = null;
    function render(dt: number, now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (mode === "network") drawNetwork(dt);
      else if (mode === "rain") drawRain(dt);
      else if (mode === "aurora") drawAurora(now);
      else if (mode === "grid") drawGrid(dt);
    }
    function frame(now: number) {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      render(dt, now);
      if (mode !== "flat" && !motionOff()) raf = requestAnimationFrame(frame);
      else raf = null;
    }

    function start() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      ctx!.clearRect(0, 0, W, H);
      if (mode === "flat") return;
      // paint an immediate first frame so there is never a blank flash
      render(0, performance.now());
      if (motionOff()) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function applyMode() {
      readAccent();
      mode = root.dataset.bg || "network";
      initMode();
      start();
    }

    // react to data-bg / data-motion / accent changes
    const observer = new MutationObserver(applyMode);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-bg", "data-motion", "style"],
    });

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        resize();
        start();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // keep parallax responsive when the loop is paused (reduced motion)
    const onScroll = () => {
      if (raf === null && mode !== "flat") render(0, performance.now());
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
      } else if (mode !== "flat" && !motionOff()) {
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
