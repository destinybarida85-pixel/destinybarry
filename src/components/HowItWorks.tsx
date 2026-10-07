"use client";
import { STEPS } from "@/lib/content";
import { Reveal, SectionHead } from "./Reveal";
import { useMockup } from "./MockupContext";

const DOT = ["#0090FF", "#9F4FFF", "#00C978", "#FF58AE"];

export function HowItWorks() {
  const { openMockup } = useMockup();
  return (
    <section id="how" data-orb="0.3,-0.2,0.7" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="How it works" title="From free mockup to a website that works for you." sub="Four simple steps. You see your design before you commit." />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-[10px] border border-line bg-paper p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full font-sans text-[13px] font-semibold text-white" style={{ background: DOT[i] }}>{s.n}</span>
                <h3 className="mt-6 text-[23px] font-medium leading-[1.1] tracking-[-0.019em] text-ink">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] text-body">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><button onClick={() => openMockup()} className="link-u">Start with a free mockup</button></Reveal>
      </div>
    </section>
  );
}
