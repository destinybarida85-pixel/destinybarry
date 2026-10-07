"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePointer } from "@/lib/useParallax";
import { useMockup } from "./MockupContext";

const LINES = [["Your", "website"], ["should", "bring", "you"], ["customers."]];

/** A mockup that floats in 3D: mouse parallax + scroll parallax + idle bob, scaled by depth. */
function Float({ className, depth, rotate = 0, delay = 0, px, py, children }: {
  className: string; depth: number; rotate?: number; delay?: number; px: MotionValue<number>; py: MotionValue<number>; children: React.ReactNode;
}) {
  const { scrollY } = useScroll();
  const x = useTransform(px, [-0.5, 0.5], [-depth * 44, depth * 44]);
  const my = useTransform(py, [-0.5, 0.5], [-depth * 34, depth * 34]);
  const sy = useTransform(scrollY, [0, 900], [0, -depth * 140]);
  const y = useTransform([my, sy], ([a, b]: number[]) => a + b);
  const rotateY = useTransform(px, [-0.5, 0.5], [depth * 14, -depth * 14]);
  const rotateX = useTransform(py, [-0.5, 0.5], [-depth * 10, depth * 10]);
  return (
    <motion.div
      style={{ x, y, rotateY, rotateX, rotateZ: rotate, transformPerspective: 900 }}
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9 + delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="float-lbl" style={{ animationDuration: `${6 + depth * 2}s`, animationDelay: `${delay}s` }}>{children}</div>
    </motion.div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px]">
    <span className="h-1.5 w-1.5 rounded-full bg-ink" />{children}
  </div>
);

export function Hero() {
  const { openMockup } = useMockup();
  const { x: px, y: py } = usePointer();

  return (
    <section id="top" data-orb="0,0,1" className="relative overflow-hidden">
      {/* floating website mockups, scattered around the light */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <Float className="left-[3%] top-[22%] w-[230px]" depth={1.1} rotate={-4} px={px} py={py}>
          <div className="rounded-[10px] border border-line bg-paper">
            <div className="flex items-center gap-1 border-b border-[#f2f0ed] px-2.5 py-2">{[0, 1, 2].map((d) => <span key={d} className="h-[7px] w-[7px] rounded-full bg-[#e5e1da]" />)}<span className="ml-1.5 flex-1 rounded bg-[#f2f0ed] px-2 py-0.5 font-sans text-[8px] text-[#7e7e7d]">summitroofing.com</span></div>
            <div className="p-3.5"><div className="display text-[17px] leading-[0.95]">Roofing done right.</div><div className="mt-2 h-1 w-3/4 bg-[#f2f0ed]" /><div className="mt-1.5 h-1 w-1/2 bg-[#f2f0ed]" /><div className="mt-3 inline-block rounded-[6px] bg-ink px-2.5 py-1.5 font-sans text-[8px] font-semibold uppercase text-parchment">Get free estimate</div></div>
          </div>
        </Float>
        <Float className="right-[3%] top-[20%] w-[210px]" depth={0.8} rotate={3} delay={0.15} px={px} py={py}>
          <div className="rounded-[10px] border border-line bg-paper p-3.5">
            <div className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Lead inbox</div>
            {["Mike R. · Roof quote", "Anna L. · Booking", "Dev P. · Estimate"].map((l, i) => <div key={l} className="mt-2.5 flex justify-between border-t border-line pt-2.5 font-sans text-[10px]"><span>{l}</span><span className="text-muted">{["now", "2m", "9m"][i]}</span></div>)}
          </div>
        </Float>
        <Float className="bottom-[16%] left-[7%] w-[210px]" depth={1.4} rotate={2} delay={0.3} px={px} py={py}>
          <div className="rounded-[10px] border border-line bg-paper p-3.5">
            <div className="flex items-center gap-2 font-sans text-[9px] font-semibold uppercase tracking-[0.12em]"><span className="h-1.5 w-1.5 rounded-full bg-[#00ca48]" />AI assistant</div>
            <div className="mt-2.5 rounded-[8px] bg-[#f2f0ed] p-2.5 font-sans text-[10px] leading-snug">Hi! Want a free roof inspection this week?</div>
            <div className="mt-2 ml-auto w-fit rounded-[8px] bg-ink px-2.5 py-2 font-sans text-[10px] text-parchment">Yes, Thursday works</div>
          </div>
        </Float>
        <Float className="bottom-[14%] right-[6%] w-[190px]" depth={1.2} rotate={-3} delay={0.45} px={px} py={py}>
          <div className="rounded-[10px] border border-line bg-paper p-3.5">
            <div className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Booked</div>
            <div className="display mt-1 text-[22px]">Thu · 10:30</div>
            <div className="mt-2 grid grid-cols-7 gap-1">{Array.from({ length: 14 }).map((_, i) => <span key={i} className={`h-3 rounded-[3px] ${i === 10 ? "bg-ink" : "bg-[#f2f0ed]"}`} />)}</div>
          </div>
        </Float>
        <Float className="left-[21%] top-[12%]" depth={0.6} delay={0.2} px={px} py={py}><Label>New lead</Label></Float>
        <Float className="right-[22%] top-[14%]" depth={1.5} delay={0.35} px={px} py={py}><Label>Estimate requested</Label></Float>
        <Float className="bottom-[8%] left-[30%]" depth={0.9} delay={0.5} px={px} py={py}><Label>Appointment booked</Label></Float>
        <Float className="bottom-[9%] right-[27%]" depth={0.7} delay={0.65} px={px} py={py}><Label>AI assistant active</Label></Float>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow">
          AI-powered web design &amp; growth · US &amp; Canada
        </motion.div>
        <h1 className="display mt-7 text-[46px] sm:text-[78px] lg:text-[92px] xl:text-[104px] lg:leading-[0.86]" aria-label="Your website should bring you customers.">
          {LINES.map((line, li) => (
            <span key={li} className="block" aria-hidden>
              {line.map((w, i) => (
                <span key={w} className="mr-[0.2em] inline-block overflow-hidden align-bottom last:mr-0">
                  <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + (li * 2 + i) * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-[#474645] sm:text-[18px]">
          We design high-converting websites and AI-powered systems that help local businesses capture more leads, book more appointments and follow up automatically.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-5">
          <button onClick={() => openMockup()} className="btn btn-dark">Get a free homepage mockup →</button>
          <a href="#how" className="link-u">See how it works →</a>
        </motion.div>
      </div>

      {/* services ribbon */}
      <div className="relative z-10 overflow-hidden border-y border-line bg-parchment/60 py-4 backdrop-blur-sm" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {["Website design", "AI chat assistants", "Lead capture", "Booking systems", "Automated follow-up", "AI marketing videos", "United States", "Canada"].map((t) => <span key={t + k}>{t} <span className="ml-12">✦</span></span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
