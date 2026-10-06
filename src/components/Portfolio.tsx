"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, animate } from "framer-motion";
import { CASES } from "@/lib/content";
import { SectionHead, Reveal } from "./Reveal";
import { useMockup } from "./MockupContext";

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const dec = Number.isInteger(to) ? 0 : 1;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => (el.textContent = v.toFixed(dec) + suffix) });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function Portfolio() {
  const { openMockup } = useMockup();
  const filters = ["All", ...Array.from(new Set(CASES.map((c) => c.industry)))];
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = CASES.filter((c) => f === "All" || c.industry === f);
  return (
    <section id="work" data-orb="-0.32,-0.05,0.75" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Portfolio & case studies" title="Websites that earn their keep." />
        <Reveal className="mt-10 flex flex-wrap gap-2" delay={0.1}>
          {filters.map((x) => (
            <button key={x} onClick={() => { setF(x); setOpen(null); }} aria-pressed={f === x}
              className={`rounded-full border px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${f === x ? "border-ink bg-ink text-parchment" : "border-line hover:border-ink"}`}>{x}</button>
          ))}
        </Reveal>
        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((c) => {
              const isOpen = open === c.id;
              return (
                <motion.article layout key={c.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}
                  className="group flex flex-col border border-line bg-paper/60 transition-colors hover:border-ink">
                  <div className={`relative h-[220px] overflow-hidden border-b border-line bg-gradient-to-br ${c.tone}`}>
                    <motion.div whileHover={{ y: -8, rotate: -1 }} className="absolute inset-x-8 top-8 border border-line bg-paper">
                      <div className="flex items-center gap-1.5 border-b border-[#e3e2df] px-3 py-2">
                        {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 rounded-full bg-[#d9d8d4]" />)}
                        <span className="ml-2 font-sans text-[9px] text-[#8a8984]">{c.client.toLowerCase().replace(/[^a-z]/g, "")}.com</span>
                      </div>
                      <div className="p-4"><div className="display text-[20px]">{c.client}</div><div className="mt-3 h-1.5 w-2/3 bg-[#e3e2df]" /><div className="mt-2 h-1.5 w-1/2 bg-[#e3e2df]" /><div className="mt-4 inline-block rounded-[6px] bg-ink px-3 py-1.5 font-sans text-[9px] font-semibold uppercase text-parchment">Book now</div></div>
                    </motion.div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="eyebrow">{c.industry} · {c.region}</div>
                    <h3 className="display mt-3 text-[28px]">{c.client}</h3>
                    <p className="mt-3 text-[16px] leading-[1.55] text-[#3a3a37]">{c.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{c.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.1em]">{t}</span>)}</div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink pt-5">
                            {c.stats.map((s) => (
                              <div key={s.l}><div className="display text-[28px] sm:text-[36px]"><Count to={s.v} suffix={s.s} /></div><div className="mt-1 font-sans text-[11px] leading-snug text-muted">{s.l}</div></div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <button onClick={() => setOpen(isOpen ? null : c.id)} aria-expanded={isOpen} className="link-u">{isOpen ? "Hide results" : "View results"} →</button>
                      <button onClick={() => openMockup()} className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted hover:text-ink">Get similar →</button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <p className="mt-6 font-sans text-[11px] text-muted">Showcased projects are illustrative concept case studies. Results shown are sample figures for demonstration.</p>
      </div>
    </section>
  );
}
