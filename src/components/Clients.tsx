"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CLIENTS } from "@/lib/content";
import { usePointer } from "@/lib/useParallax";
import { Reveal } from "./Reveal";

/** deterministic pseudo-random so server and client agree */
const rnd = (i: number, salt: number) => { const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453; return x - Math.floor(x); };
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Logo({ c, w, h }: { c: (typeof CLIENTS)[number]; w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <Image src={`/clients/${c.file}.webp`} alt={c.name} fill sizes="200px" className="select-none object-contain" draggable={false} />
    </div>
  );
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => (el.textContent = String(Math.round(v))) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>0</span>;
}

/** Scroll phases (p = progress of the tall section, 0..1). The stage pins at PIN. */
const PIN = 0.4;        // before this the logos drift in from below, scattered in 3D
const BUILD = [0.46, 0.86]; // logos fly into their grid slots, staggered

type Layout = { w: number; h: number; cols: number; tile: number; gap: number; x0: number; y0: number };

function Tile({ c, i, L, p, px, py, reduce }: { c: (typeof CLIENTS)[number]; i: number; L: Layout; p: MotionValue<number>; px: MotionValue<number>; py: MotionValue<number>; reduce: boolean }) {
  const col = i % L.cols, row = Math.floor(i / L.cols);
  const gx = L.x0 + col * (L.tile + L.gap) + L.tile / 2;
  const gy = L.y0 + row * (L.tile + L.gap) + L.tile / 2;
  const depth = 0.3 + rnd(i, 1) * 1.1;
  // scattered start: anywhere around the stage, at varying depth
  const sx = (rnd(i, 2) * 1.2 - 0.1) * L.w, sy = (rnd(i, 3) * 1.1 - 0.05) * L.h;
  const sz = -420 + rnd(i, 4) * 620;
  const rx = (rnd(i, 5) - 0.5) * 90, ry = (rnd(i, 6) - 0.5) * 110, rz = (rnd(i, 7) - 0.5) * 70;
  const stagger = ((row + col) / (L.cols + Math.ceil(35 / L.cols))) * 0.45 + rnd(i, 8) * 0.12;

  const e = useTransform(p, (v) => (reduce ? 1 : ease(clamp((v - BUILD[0] - stagger * (BUILD[1] - BUILD[0])) / ((BUILD[1] - BUILD[0]) * 0.55)))));
  const enter = useTransform(p, (v) => (reduce ? 1 : clamp(v / PIN)));
  const x = useTransform(e, (v) => lerp(sx, gx, v));
  const y = useTransform([e, enter, p], ([v, en, pp]: number[]) => lerp(sy, gy, v) + (1 - en) * (L.h * 0.9) * (0.5 + depth * 0.5) + (1 - v) * (0.5 - pp) * depth * 160);
  const z = useTransform(e, (v) => lerp(sz, 0, v));
  const rotateX = useTransform(e, (v) => lerp(rx, 0, v));
  const rotateY = useTransform(e, (v) => lerp(ry, 0, v));
  const rotateZ = useTransform(e, (v) => lerp(rz, 0, v));
  const scale = useTransform(e, (v) => lerp(0.75 + depth * 0.3, 1, v));
  const opacity = useTransform(enter, [0.05, 0.4], [0, 1]);

  return (
    <motion.div style={{ position: "absolute", left: 0, top: 0, width: L.tile, height: L.tile, marginLeft: -L.tile / 2, marginTop: -L.tile / 2, x, y, z, rotateX, rotateY, rotateZ, scale, opacity }}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -3 - depth * 3, 0] }}
        transition={{ duration: 4 + rnd(i, 9) * 3, repeat: Infinity, ease: "easeInOut", delay: rnd(i, 10) * 2 }}
        whileHover={{ scale: 1.12, zIndex: 5 }}
        title={c.name}
        className="flex h-full w-full items-center justify-center rounded-[12px] border border-line bg-paper/85 transition-colors hover:border-ink"
      >
        <Logo c={c} w={L.tile * 0.76} h={L.tile * 0.6} />
      </motion.div>
    </motion.div>
  );
}

function Field() {
  const reduce = !!useReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 640 });
  const { x: px, y: py } = usePointer();

  useEffect(() => {
    const el = stage.current; if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el); setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: p } = useScroll({ target: outer, offset: ["start end", "end end"] });

  // fit a tidy grid inside the stage: pick the column count, then the largest tile that fits
  const L = useMemo<Layout>(() => {
    const { w, h } = size;
    const cols = w < 520 ? 5 : w < 900 ? 6 : 7;
    const rows = Math.ceil(CLIENTS.length / cols);
    const gap = w < 520 ? 6 : 12;
    const tile = Math.min((w - gap * (cols - 1)) / cols, (h - gap * (rows - 1)) / rows, 170);
    const gw = cols * tile + (cols - 1) * gap, gh = rows * tile + (rows - 1) * gap;
    return { w, h, cols, tile, gap, x0: (w - gw) / 2, y0: (h - gh) / 2 };
  }, [size]);

  const rotY = useTransform(px, [-0.5, 0.5], [-5, 5]);
  const rotX = useTransform(py, [-0.5, 0.5], [3.5, -3.5]);

  return (
    <div ref={outer} className="relative" style={{ height: reduce ? "auto" : "250svh" }}>
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center px-5 py-6 sm:px-10">
        <div ref={stage} className="relative mx-auto h-full w-full max-w-[1200px]" style={{ perspective: 1100 }}>
          <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="absolute inset-0">
            {CLIENTS.map((c, i) => <Tile key={c.file} c={c} i={i} L={L} p={p} px={px} py={py} reduce={reduce} />)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section id="clients" data-orb="0.3,-0.12,0.75" className="relative z-[1] border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 pt-20 sm:px-10 lg:pt-28">
        <Reveal><div className="eyebrow text-center">Trusted by</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-5 text-center text-[34px] sm:text-[44px]"><Count to={35} />+ brands</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-[560px] text-center text-[17px] leading-[1.5] text-body">Helping service businesses build better digital experiences and turn more visitors into customers.</p>
        </Reveal>
      </div>

      {/* the scroll show */}
      <div className="group relative mt-12 overflow-hidden border-y border-line bg-paper/40 py-6" aria-label="Client logos">
        <div className="marquee flex w-max items-center gap-6 [animation-duration:70s] group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <div key={c.file + i} className="flex h-[96px] w-[150px] shrink-0 items-center justify-center"><Logo c={c} w={130} h={80} /></div>
          ))}
        </div>
      </div>

      {/* ...then they scatter into 3D as you scroll */}
      <Field />
    </section>
  );
}
