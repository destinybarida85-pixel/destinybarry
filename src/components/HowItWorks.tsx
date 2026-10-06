"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { STEPS } from "@/lib/content";
import { Reveal, SectionHead } from "./Reveal";
import { useMockup } from "./MockupContext";

export function HowItWorks() {
  const { openMockup } = useMockup();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="How it works" title="From free mockup to a website that works for you." />
        <div ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="absolute left-0 top-[18px] hidden h-px w-full bg-line lg:block" />
          <motion.div style={{ scaleX: h }} className="absolute left-0 top-[18px] hidden h-px w-full origin-left bg-ink lg:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative">
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink bg-parchment font-sans text-[11px] font-bold">{s.n}</div>
                <h3 className="display mt-6 text-[26px]">{s.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#3a3a37]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14"><button onClick={() => openMockup()} className="btn btn-dark">Start with a free mockup →</button></Reveal>
      </div>
    </section>
  );
}
