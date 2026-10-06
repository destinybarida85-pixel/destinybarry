"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CLIENTS } from "@/lib/content";
import { usePointer } from "@/lib/useParallax";
import { Reveal } from "./Reveal";

/** deterministic pseudo-random so server and client agree */
const rnd = (i: number, salt: number) => { const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453; return x - Math.floor(x); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Logo({ c, size }: { c: (typeof CLIENTS)[number]; size: number }) {
  return <Image src={`/clients/${c.file}.webp`} alt={c.name} width={205} height={191} style={{ width: size, height: "auto" }} draggable={false} className="select-none" />;
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

type Spec = { sx: number; sy: number; sz: number; rx: number; ry: number; rz: number; depth: number; x: number; y: number; size: number; bob: number; dur: number };

function Tile({ c, s, e, q, wide }: { c: (typeof CLIENTS)[number]; s: Spec; e: MotionValue<number>; q: MotionValue<number>; wide: number }) {
  const x = useTransform(e, (v) => lerp(s.sx, 0, v));
  const y = useTransform([e, q], ([v, p]: number[]) => lerp(s.sy, 0, v) + (0.5 - p) * s.depth * 90);
  const z = useTransform(e, (v) => lerp(s.sz, s.depth * 40 - 20, v));
  const rotateX = useTransform(e, (v) => lerp(s.rx, 0, v));
  const rotateY = useTransform(e, (v) => lerp(s.ry, 0, v));
  const rotateZ = useTransform(e, (v) => lerp(s.rz, (rnd(s.x + s.y, 4) - 0.5) * 8, v));
  const opacity = useTransform(e, [0, 0.35], [0, 1]);
  return (
    <motion.div style={{ position: "absolute", left: s.x, top: s.y, width: s.size, x, y, z, rotateX, rotateY, rotateZ, opacity, marginLeft: -s.size / 2, marginTop: -s.size * 0.46 }}>
      <motion.div
        animate={{ y: [0, -s.bob, 0] }} transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: rnd(s.x, 9) * 2 }}
        whileHover={{ scale: 1.14, zIndex: 5 }}
        className="flex items-center justify-center rounded-[10px] border border-line bg-paper/80 p-2 backdrop-blur-[2px] transition-colors hover:border-ink sm:p-3"
        title={c.name}
      >
        <Logo c={c} size={s.size - (wide < 640 ? 16 : 24)} />
      </motion.div>
    </motion.div>
  );
}

function Field() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1200);
  const { x: px, y: py } = usePointer();

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: assemble } = useScroll({ target: ref, offset: ["start 95%", "start 25%"] });
  const { scrollYProgress: drift } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const e = useTransform(assemble, [0, 1], [reduce ? 1 : 0, 1]);

  const cols = w < 560 ? 4 : w < 900 ? 5 : 7;
  const cell = w / cols;
  const rows = Math.ceil(CLIENTS.length / cols);
  const height = rows * cell * 0.9 + cell * 0.4;

  const specs = useMemo<Spec[]>(() => CLIENTS.map((_, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const depth = 0.4 + rnd(i, 1) * 1.2;
    const size = cell * (0.66 + rnd(i, 2) * 0.24);
    const x = (col + 0.5) * cell + (rnd(i, 3) - 0.5) * cell * 0.22;
    const y = row * cell * 0.9 + cell * 0.55 + (rnd(i, 4) - 0.5) * cell * 0.22;
    const dx = x - w / 2, dy = y - height / 2;
    return {
      x, y, size, depth,
      sx: dx * 1.6 + (rnd(i, 5) - 0.5) * w * 0.5, sy: dy * 1.6 + (rnd(i, 6) - 0.2) * 360,
      sz: -500 - rnd(i, 7) * 500, rx: (rnd(i, 8) - 0.5) * 120, ry: (rnd(i, 9) - 0.5) * 140, rz: (rnd(i, 10) - 0.5) * 100,
      bob: 4 + rnd(i, 11) * 8, dur: 4 + rnd(i, 12) * 4,
    };
  }), [cols, cell, w, height]);

  const rotY = useTransform(px, [-0.5, 0.5], [-7, 7]);
  const rotX = useTransform(py, [-0.5, 0.5], [5, -5]);

  return (
    <div ref={ref} className="relative mx-auto mt-10 w-full max-w-[1400px]" style={{ height, perspective: 1100 }}>
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="absolute inset-0">
        {CLIENTS.map((c, i) => <Tile key={c.file} c={c} s={specs[i]} e={e} q={drift} wide={w} />)}
      </motion.div>
    </div>
  );
}

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section id="clients" className="relative z-[1] border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-10 lg:pt-28">
        <Reveal><div className="eyebrow">Trusted by</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-6 text-[40px] sm:text-[56px] lg:text-[72px]"><Count to={35} />+ brands</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[620px] text-[18px] italic leading-[1.55] text-[#3a3a37]">Helping service businesses build better digital experiences and turn more visitors into customers.</p>
        </Reveal>
      </div>

      {/* the scroll show */}
      <div className="group relative mt-12 overflow-hidden border-y border-line bg-paper/40 py-6" aria-label="Client logos">
        <div className="marquee flex w-max items-center gap-6 [animation-duration:70s] group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <div key={c.file + i} className="flex h-[96px] w-[150px] shrink-0 items-center justify-center"><Logo c={c} size={130} /></div>
          ))}
        </div>
      </div>

      {/* ...then they scatter into 3D as you scroll */}
      <div className="px-5 pb-20 sm:px-10 lg:pb-28"><Field /></div>
    </section>
  );
}
