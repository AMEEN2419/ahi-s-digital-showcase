import { useEffect, useRef } from "react";

/**
 * High-performance interactive network background.
 * - Deep purple bg (#120222) provided by body
 * - White glowing nodes
 * - Translucent purple links (~0.5px) when nodes within 120px
 * - Magnet effect: nodes within 150px of cursor are pulled toward it
 * - Nodes near cursor get a magenta glow
 * Targets 60fps via capped DPR, squared-distance checks, and a single RAF loop.
 */
const Constellation = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    type P = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      r: number;
    };
    let pts: P[] = [];

    const LINK_DIST = 140;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const MAGNET_DIST = 260;
    const MAGNET_DIST_SQ = MAGNET_DIST * MAGNET_DIST;
    const GLOW_DIST_SQ = 130 * 130;
    const CLUSTER_RADIUS = 18;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Higher density so the network is visible across the entire background
      const density = Math.min(180, Math.floor((w * h) / 9000));
      pts = Array.from({ length: density }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.2 + 0.6,
        };
      });
    };

    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Subtle magenta cursor halo
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MAGNET_DIST
        );
        grad.addColorStop(0, "rgba(217, 70, 239, 0.18)");
        grad.addColorStop(1, "rgba(217, 70, 239, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MAGNET_DIST, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update points (drift + strong magnet pull + spring back to origin)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Strong magnet pull — clusters nodes tightly around cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAGNET_DIST_SQ && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            // Pull node toward a point CLUSTER_RADIUS away from cursor
            // (so they don't all collapse onto one pixel)
            const target = Math.max(d - CLUSTER_RADIUS, 0);
            const t = target / d;
            const tx = p.x + dx * t;
            const ty = p.y + dy * t;
            // Strength falls off with distance, but stays strong inside radius
            const falloff = 1 - d / MAGNET_DIST;
            const k = 0.18 * falloff;
            p.vx += (tx - p.x) * k;
            p.vy += (ty - p.y) * k;
          }
        }

        // Spring back toward origin so network reforms when cursor leaves
        p.vx += (p.ox - p.x) * 0.012;
        p.vy += (p.oy - p.y) * 0.012;

        // Damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Links — translucent purple, ultra-thin
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.35;
            // translucent purple
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes — white glow, magenta near cursor
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        let near = false;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          near = dx * dx + dy * dy < GLOW_DIST_SQ;
        }

        if (near) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(217, 70, 239, 0.9)";
          ctx.fillStyle = "rgba(255, 220, 255, 1)";
        } else {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default Constellation;
