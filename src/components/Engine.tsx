"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ENGINE } from "@/lib/content";
import { SectionHead, Reveal } from "./Reveal";

export function Engine() {
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setSel((s) => (s + 1) % ENGINE.length), 2800);
    return () => clearInterval(t);
  }, [auto]);

  const cur = ENGINE[sel];
  return (
    <section id="engine" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="The AI client engine" title="One connected system, from first click to repeat customer." />

        <Reveal className="mt-14" delay={0.1}>
          <div className="relative">
            {/* connector line */}
            <div className="absolute left-[18px] top-0 h-full w-px bg-line lg:left-0 lg:top-[26px] lg:h-px lg:w-full" />
            <ol className="relative grid gap-3 lg:grid-cols-7 lg:gap-2">
              {ENGINE.map((n, i) => {
                const on = i === sel; const done = i < sel;
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => { setAuto(false); setSel(i); }}
                      aria-pressed={on}
                      className="group flex w-full items-center gap-4 text-left lg:flex-col lg:items-start lg:gap-5"
                    >
                      <span className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-ink bg-parchment font-sans text-[11px] font-bold lg:h-[52px] lg:w-[52px]">
                        <motion.span className="absolute inset-0 rounded-full bg-ink" initial={false} animate={{ scale: on || done ? 1 : 0 }} transition={{ duration: 0.35 }} />
                        <span className={`relative transition-colors ${on || done ? "text-parchment" : ""}`}>{i + 1}</span>
                        {on && <motion.span layoutId="pulse" className="absolute -inset-2 rounded-full border border-ink/30" animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} />}
                      </span>
                      <span>
                        <span className={`display block text-[20px] transition-opacity lg:text-[22px] ${on ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>{n.label}</span>
                        <span className="mt-1 hidden font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-muted lg:block">{n.metric}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-ink pt-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="eyebrow">Step {sel + 1} of {ENGINE.length} · {cur.metric}</div>
          <motion.p key={cur.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="display min-h-[96px] text-[26px] sm:text-[34px] !normal-case !leading-[1.1]" aria-live="polite">
            {cur.detail}
          </motion.p>
        </div>
        <div className="mt-8 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
          <button onClick={() => setAuto((a) => !a)} className="link-u !text-[11px]">{auto ? "Pause" : "Play"} animation</button>
        </div>
      </div>
    </section>
  );
}
