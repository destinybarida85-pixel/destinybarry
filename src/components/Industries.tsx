"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/content";
import { SectionHead, Reveal } from "./Reveal";
import { useMockup } from "./MockupContext";

export function Industries() {
  const { openMockup } = useMockup();
  const [id, setId] = useState<string>(INDUSTRIES[0].id);
  const cur = INDUSTRIES.find((i) => i.id === id)!;
  return (
    <section id="industries" data-orb="0.32,0.05,0.8" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Industries" title="Built for businesses that win on local trust." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[360px_1fr]">
          <Reveal>
            <div role="tablist" aria-label="Industries" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ink lg:pb-0">
              {INDUSTRIES.map((i) => (
                <button key={i.id} role="tab" aria-selected={i.id === id} onClick={() => setId(i.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-left font-sans text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5 lg:text-[15px] ${i.id === id ? "border-ink bg-ink text-parchment lg:bg-transparent lg:text-ink" : "border-line lg:hover:pl-2"}`}>
                  <span className="lg:flex lg:items-center lg:justify-between">{i.name}<span className="hidden lg:inline">{i.id === id ? "●" : "→"}</span></span>
                </button>
              ))}
            </div>
          </Reveal>
          <div className="min-h-[340px] border border-line bg-paper/60 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={cur.id} role="tabpanel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="eyebrow">{cur.examples}</div>
                <h3 className="display mt-5 text-[30px] sm:text-[42px]">{cur.name}</h3>
                <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] text-[#3a3a37]">{cur.win}</p>
                <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                  {cur.flow.map((f, k) => (
                    <li key={f} className="border-t border-ink pt-3 font-sans text-[13px]"><span className="mb-1 block text-[11px] text-muted">0{k + 1}</span>{f}</li>
                  ))}
                </ol>
                <button onClick={() => openMockup()} className="link-u mt-9">Get a {cur.name.toLowerCase()} mockup →</button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
