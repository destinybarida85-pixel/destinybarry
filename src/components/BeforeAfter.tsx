"use client";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Reveal } from "./Reveal";
import { useMockup } from "./MockupContext";

const SAMPLES = [
  {
    id: "roofing", tab: "Roofing", name: "Summit Roofing", headline: "Roofing done right, the first time.", sub: "Licensed, insured specialists. Free inspections and honest quotes, booked online in minutes.", cta: "Get free estimate",
    old: ["Welcome to our website!", "We do roofs. Family owned since 1998. Call for a free estimate. Best prices in town."],
    fixes: ["Clear headline and one primary action", "Instant estimate form and AI assistant", "Mobile-first layout with click-to-call"],
  },
  {
    id: "dental", tab: "Dental", name: "Lakeshore Dental", headline: "A calmer visit. Book in 60 seconds.", sub: "Gentle, modern dental care for the whole family. Choose a time that suits you, online.", cta: "Book appointment",
    old: ["Welcome to Lakeshore Dental!", "We are a dental office. Call us to make an appointment. Open Mon-Fri."],
    fixes: ["Online booking with live availability", "Insurance and FAQ answered by AI", "Reminders that cut no-shows"],
  },
  {
    id: "salon", tab: "Salon", name: "Atelier Hair", headline: "Hair you'll love. Chair booked.", sub: "Cuts, colour and styling by artists. See the work, pick a stylist, reserve your slot.", cta: "Reserve a chair",
    old: ["Atelier Hair Salon", "Walk-ins welcome. Call for prices. Follow us on social media."],
    fixes: ["Gallery that sells the result", "Deposit-secured bookings", "Rebooking nudges by SMS"],
  },
];

export function BeforeAfter() {
  const { openMockup } = useMockup();
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const s = SAMPLES[idx];

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="work-preview" data-orb="0.33,-0.2,0.7" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Before / After" title="Don't just redesign the website. Redesign the customer journey." />
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          {SAMPLES.map((x, i) => (
            <button key={x.id} onClick={() => { setIdx(i); setPos(50); }} aria-pressed={i === idx}
              className={`rounded-full border px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${i === idx ? "border-ink bg-ink text-parchment" : "border-line hover:border-ink"}`}>{x.tab}</button>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div
            ref={box}
            className="relative h-[460px] touch-pan-y select-none overflow-hidden rounded-[10px] border border-line bg-paper sm:h-[500px]"
            onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setFromX(e.clientX); }}
            onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* AFTER (base layer) */}
            <AnimatePresence mode="wait">
              <motion.div key={s.id + "a"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-paper">
                <div className="flex items-center justify-between border-b border-[#f2f0ed] px-5 py-4">
                  <span className="font-sans text-[13px] font-bold uppercase tracking-[0.08em]">{s.name}</span>
                  <div className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.06em] text-[#474645]">
                    <span className="hidden sm:inline">Services</span><span className="hidden sm:inline">Reviews</span>
                    <span className="rounded-[8px] bg-ink px-3 py-1.5 text-parchment">{s.cta}</span>
                  </div>
                </div>
                <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_200px]">
                  <div>
                    <div className="display text-[28px] sm:text-[40px]">{s.headline}</div>
                    <p className="mt-4 max-w-[420px] text-[14px] leading-[1.55] text-[#474645]">{s.sub}</p>
                    <div className="mt-5 flex gap-2 font-sans text-[11px] font-semibold"><span className="rounded-[10px] bg-ink px-4 py-2.5 text-parchment">{s.cta}</span><span className="rounded-[10px] border border-line px-4 py-2.5">Call now</span></div>
                  </div>
                  <div className="hidden h-[170px] rounded-full bg-gradient-to-br from-[#facb0e]/60 via-[#f06ba8]/50 to-[#78bae6]/60 md:block" />
                </div>
                <div className="absolute bottom-4 right-4 rounded-full border border-line bg-paper px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em]">● AI assistant online</div>
              </motion.div>
            </AnimatePresence>

            {/* BEFORE (clipped overlay) */}
            <div className="absolute inset-0 overflow-hidden bg-[#eceae4]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <div className="flex justify-between bg-[#9a9a96] px-3 py-2 font-[Times_New_Roman,serif] text-[13px] font-bold text-[#2a2a28]">
                <span className="whitespace-nowrap">{s.name.toUpperCase()} CO.</span>
                <span className="hidden text-[10px] font-normal sm:inline">Home · About · Services · Gallery · Contact · Blog · FAQ</span>
              </div>
              <div className="p-5 font-[Times_New_Roman,serif] text-[#3a342c] sm:p-8">
                <div className="text-[20px] font-bold text-[#1a1aaa] underline">{s.old[0]}</div>
                <div className="my-4 flex h-[140px] items-center justify-center text-[12px] text-[#7d786c]" style={{ background: "repeating-linear-gradient(45deg,#d7d4cb,#d7d4cb 9px,#cbc8bd 9px,#cbc8bd 18px)" }}>[ clipart photo ]</div>
                <p className="max-w-[360px] text-[14px] leading-[1.4]">{s.old[1]}</p>
                <div className="mt-4 inline-block border-2 border-[#b4b0a4] bg-[#d8d5cc] px-3 py-1 text-[12px]">click here</div>
              </div>
            </div>

            <div className="pointer-events-none absolute left-3 top-14 bg-ink px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-parchment">Before</div>
            <div className="pointer-events-none absolute right-3 top-16 bg-ink px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-parchment">After</div>

            {/* handle */}
            <div className="pointer-events-none absolute inset-y-0 w-px bg-ink" style={{ left: `${pos}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-parchment font-sans text-[12px]">⟷</div>
            </div>
            <input
              type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)}
              aria-label="Compare before and after website"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-start">
          <div className="flex flex-col gap-2 font-sans text-[12px] text-muted">
            <span className="eyebrow !text-[10px]">Before</span>
            <span>— Small headline, weak call to action</span><span>— Cluttered navigation, no quote form</span><span>— No AI assistant, poor mobile layout</span>
          </div>
          <div className="flex flex-col gap-2 font-sans text-[12px]">
            <span className="eyebrow !text-[10px] !text-ink">After</span>
            {s.fixes.map((f) => <span key={f}>+ {f}</span>)}
          </div>
          <button onClick={() => openMockup()} className="btn btn-dark">Get my own mockup →</button>
        </div>
        <p className="mt-6 font-sans text-[11px] text-muted">Drag the divider, or tab to the slider and use the arrow keys. Samples are illustrative concepts.</p>
      </div>
    </section>
  );
}
