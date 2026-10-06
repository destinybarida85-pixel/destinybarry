"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/content";
import { Reveal, SectionHead } from "./Reveal";
import { useMockup } from "./MockupContext";

export function Services() {
  const { openMockup } = useMockup();
  const [open, setOpen] = useState<string>(SERVICES[0].id);
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Services" title="Everything your website needs to win customers." />
        <div className="mt-14 border-t border-ink">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <Reveal key={s.id} delay={i * 0.04}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? "" : s.id)}
                    aria-expanded={isOpen} aria-controls={`svc-${s.id}`}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:gap-10 sm:py-8"
                  >
                    <span className="w-8 font-sans text-[12px] font-semibold text-muted sm:w-14">0{i + 1}</span>
                    <span className="display flex-1 text-[26px] transition-transform duration-300 group-hover:translate-x-2 sm:text-[40px] lg:text-[52px]">{s.title}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink font-sans text-xl">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-${s.id}`}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 pl-12 sm:pl-24 md:grid-cols-2">
                          <p className="max-w-[460px] text-[17px] leading-[1.6] text-[#3a3a37]">{s.blurb}</p>
                          <div>
                            <ul className="space-y-2 font-sans text-[14px]">
                              {s.points.map((p) => <li key={p} className="flex gap-3 border-b border-line pb-2"><span>→</span>{p}</li>)}
                            </ul>
                            <button onClick={() => openMockup()} className="link-u mt-6">Get a free mockup →</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
