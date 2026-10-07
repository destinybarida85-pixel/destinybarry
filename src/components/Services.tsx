"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/content";
import { Reveal, SectionHead } from "./Reveal";
import { useMockup } from "./MockupContext";

const STYLE: Record<string, { bg: string; dark?: boolean; d: string }> = {
  design: { bg: "#0090FF", d: "M5 5h14v14H5zM5 10h14M10 10v9" },
  chat: { bg: "#9F4FFF", d: "M5 6h14v9H11l-4 3v-3H5z" },
  leads: { bg: "#00C978", d: "M4 6h16l-6 7v5l-4 2v-7z" },
  booking: { bg: "#FF58AE", d: "M5 7h14v12H5zM5 11h14M9 4v4M15 4v4" },
  followup: { bg: "#FFBB26", dark: true, d: "M5 12a7 7 0 0112-5l2-2v6h-6l2-2a4 4 0 10 1 6" },
  video: { bg: "#FF3E00", d: "M7 5l12 7-12 7z" },
};

export function Services() {
  const { openMockup } = useMockup();
  const [open, setOpen] = useState<string>("");
  return (
    <section id="services" data-orb="0.3,-0.05,0.75" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Services" title="Everything your website needs to win customers." sub="Six connected services, built around one goal: turning visitors into customers." />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.id; const st = STYLE[s.id];
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[10px] border border-line bg-paper p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: st.bg }}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={st.dark ? "#121212" : "#fff"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={st.d} /></svg>
                  </span>
                  <h3 className="mt-6 text-[23px] font-medium leading-[1.1] tracking-[-0.019em] text-ink">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-body">{s.blurb}</p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`svc-${s.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <ul className="mt-5 space-y-2 text-[15px] text-body">
                          {s.points.map((p) => <li key={p} className="flex gap-2 border-t border-line pt-2"><span className="text-muted">→</span>{p}</li>)}
                        </ul>
                        <button onClick={() => openMockup()} className="link-u mt-5">Get a free mockup</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={() => setOpen(isOpen ? "" : s.id)} aria-expanded={isOpen} aria-controls={`svc-${s.id}`} className="link-u mt-5 block">
                    {isOpen ? "Hide details" : "See what's included"}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
