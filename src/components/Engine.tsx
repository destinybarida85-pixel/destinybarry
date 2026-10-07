"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ENGINE } from "@/lib/content";
import { SectionHead, Reveal } from "./Reveal";

const DOT = ["#0090FF", "#9F4FFF", "#00C978", "#FF58AE", "#FFBB26", "#FF3E00", "#00B2FF"];
const FEED = [
  { who: "Mike R.", what: "Roof repair quote", tag: "New", bg: "#64C6FF" },
  { who: "Anna L.", what: "Booked Thu 10:30", tag: "Booked", bg: "#00CA48" },
  { who: "Dev P.", what: "Estimate follow-up", tag: "Pending", bg: "#FFBB26" },
];

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
    <section id="engine" data-orb="-0.3,-0.1,0.75" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="The AI client engine" title="One connected system, from first click to repeat customer." sub="Tap any step to see what it does for your business." />

        <div className="mt-14 grid gap-3 lg:grid-cols-[360px_1fr]">
          {/* dark action card: the one dark surface on the page */}
          <Reveal>
            <div role="tablist" aria-label="Client engine steps" className="rounded-[10px] rounded-l-[24px] bg-black p-1 shadow-[0_0_24px_rgba(0,0,0,0.15)]">
              {ENGINE.map((n, i) => {
                const on = i === sel;
                return (
                  <button key={n.id} role="tab" aria-selected={on} onClick={() => { setAuto(false); setSel(i); }}
                    className={`flex w-full items-center gap-4 rounded-[8px] rounded-l-[22px] px-4 py-3 text-left transition-colors ${on ? "bg-white/10" : "hover:bg-white/5"}`}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[13px] font-semibold" style={{ background: DOT[i], color: i === 4 ? "#121212" : "#fff" }}>{i + 1}</span>
                    <span>
                      <span className="block font-sans text-[16px] font-semibold leading-tight text-white">{n.label}</span>
                      <span className="block font-sans text-[13px] text-white/60">{n.metric}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="grid gap-3">
            <Reveal delay={0.08}>
              <div className="rounded-[10px] border border-line bg-paper p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">Step {sel + 1} of {ENGINE.length}</span>
                  <span className="rounded-full px-3 py-1.5 font-sans text-[12px] font-semibold text-ink" style={{ background: DOT[sel], color: sel === 4 ? "#121212" : "#fff" }}>{cur.metric}</span>
                </div>
                <motion.div key={cur.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
                  <h3 className="display mt-6 text-[34px]">{cur.label}</h3>
                  <p className="mt-4 max-w-[520px] text-[17px] leading-[1.5] text-body">{cur.detail}</p>
                </motion.div>
                <button onClick={() => setAuto((a) => !a)} className="link-u mt-6">{auto ? "Pause" : "Play"} animation</button>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rounded-[12px] bg-parchment p-[14px] pl-6 ring-1 ring-line">
                <div className="eyebrow !normal-case">Live lead feed</div>
                <div className="mt-3 divide-y divide-line">
                  {FEED.map((f) => (
                    <div key={f.who} className="flex items-center justify-between gap-3 py-3 font-sans text-[14px]">
                      <span><strong className="font-semibold text-ink">{f.who}</strong> <span className="text-body">· {f.what}</span></span>
                      <span className="rounded-full px-3 py-1 text-[12px] font-semibold text-ink" style={{ background: f.bg }}>{f.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
