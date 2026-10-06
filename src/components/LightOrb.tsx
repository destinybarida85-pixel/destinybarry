"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePointer } from "@/lib/useParallax";

const GRADIENT = "linear-gradient(255deg, rgb(250, 203, 14), rgb(240, 107, 168) 30%, rgb(120, 186, 230) 65%, rgb(255, 255, 255))";

/** Scroll journey measured in viewport-heights: centre → right → left → centre, then repeats. */
const STOPS = [
  { s: 0, x: 0, y: 0, k: 1 },
  { s: 0.9, x: 1, y: 0.06, k: 0.86 },
  { s: 2.0, x: -1, y: -0.05, k: 0.9 },
  { s: 3.2, x: 0, y: 0, k: 1 },
];
const PERIOD = STOPS[STOPS.length - 1].s;
const smooth = (t: number) => t * t * (3 - 2 * t);

function path(scrollY: number, vh: number) {
  const s = (scrollY / vh) % PERIOD;
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i + 1];
    if (s >= a.s && s <= b.s) {
      const t = smooth((s - a.s) / (b.s - a.s));
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, k: a.k + (b.k - a.k) * t };
    }
  }
  return STOPS[0];
}

export function LightOrb() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { x: px, y: py } = usePointer();

  // scroll-driven target, smoothed by springs so the orb "glides"
  const tx = useMotionValue(0), ty = useMotionValue(0), tk = useMotionValue(1);
  const sx = useSpring(tx, { stiffness: 38, damping: 15, mass: 1.2 });
  const sy = useSpring(ty, { stiffness: 38, damping: 15, mass: 1.2 });
  const sk = useSpring(tk, { stiffness: 38, damping: 18, mass: 1.2 });

  // always-on "live" motion (shake, wobble, 3D tumble)
  const jx = useMotionValue(0), jy = useMotionValue(0), jr = useMotionValue(0);
  const jrx = useMotionValue(0), jry = useMotionValue(0), jk = useMotionValue(1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const p = path(scrollY.get(), vh);
      const amp = vw < 700 ? 0.3 : 0.27;
      tx.set(p.x * vw * amp);
      ty.set(p.y * vh);
      tk.set(p.k);
    };
    update();
    const unsub = scrollY.on("change", update);
    window.addEventListener("resize", update);
    return () => { unsub(); window.removeEventListener("resize", update); };
  }, [scrollY, tx, ty, tk]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      const intro = Math.max(0.35, 1.6 - t * 0.25); // a little extra shake right after load
      jx.set((Math.sin(t * 7.1) * 3.2 + Math.sin(t * 13.7) * 1.8 + Math.sin(t * 0.7) * 14) * intro);
      jy.set((Math.cos(t * 6.3) * 3.2 + Math.sin(t * 11.9) * 1.8 + Math.cos(t * 0.55) * 12) * intro);
      jr.set(Math.sin(t * 0.5) * 10 + Math.sin(t * 2.3) * 1.2);
      jrx.set(Math.sin(t * 0.8) * 8 + Math.sin(t * 3.1) * 1.2);
      jry.set(Math.cos(t * 0.65) * 9 + Math.cos(t * 2.7) * 1.2);
      jk.set(1 + Math.sin(t * 1.15) * 0.03 + Math.sin(t * 4.2) * 0.008);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, jx, jy, jr, jrx, jry, jk]);

  const x = useTransform([sx, jx, px], ([a, b, c]: number[]) => a + b + c * 50);
  const y = useTransform([sy, jy, py], ([a, b, c]: number[]) => a + b + c * 40);
  const scale = useTransform([sk, jk], ([a, b]: number[]) => a * b);
  // lean into the direction of travel for a 3D feel
  const lean = useTransform([sx, jry], ([a, b]: number[]) => b + a * 0.035);
  const tilt = useTransform([sy, jrx], ([a, b]: number[]) => b - a * 0.03);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden" style={{ perspective: 1200 }}>
      <motion.div
        style={{ x, y, scale, rotateZ: jr, rotateY: lean, rotateX: tilt, transformStyle: "preserve-3d" }}
        className="relative h-[min(92vw,780px)] w-[min(92vw,780px)] will-change-transform"
      >
        {/* soft glow halo */}
        <div className="absolute -inset-[8%] rounded-full opacity-40 blur-[70px]" style={{ background: GRADIENT }} />
        {/* morphing body */}
        <div className="orb-body absolute inset-0 opacity-[0.92]" style={{ background: GRADIENT, filter: "blur(1.5px)" }} />
        {/* volumetric highlights for depth */}
        <div className="orb-body absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(circle at 30% 24%, rgba(255,255,255,.95), rgba(255,255,255,0) 46%)" }} />
        <div className="orb-body absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(circle at 74% 80%, rgba(80,120,200,.55), rgba(80,120,200,0) 52%)", animationDelay: "-5s" }} />
      </motion.div>
    </div>
  );
}
