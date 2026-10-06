"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHead, Reveal } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <section id="about" data-orb="0.05,0.2,0.85" className="border-t border-line">
      <div ref={ref} className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[420px_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -right-4 -top-4 h-full w-full border border-ink" />
            <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden border border-line bg-paper">
              <Image src="/images/founder.jpg" alt="Destiny Barry, founder" fill sizes="(max-width: 1024px) 90vw, 420px" className="object-cover grayscale" />
            </motion.div>
          </div>
        </Reveal>
        <div>
          <SectionHead eyebrow="About" title="A web designer who cares whether the phone rings." />
          <Reveal delay={0.15}>
            <div className="mt-8 max-w-[640px] space-y-5 text-[18px] leading-[1.65] text-[#3a3a37]">
              <p>I&apos;m Destiny Barry. I build websites and AI systems for local businesses across the US and Canada, with one measure of success: does it bring you customers?</p>
              <p>Most small business sites look fine but don&apos;t convert. They load slowly, hide the next step and go silent after a visitor leaves. I fix the whole journey, from the first click to the booked appointment and the follow-up after.</p>
              <p className="italic text-ink">Direct communication, clear scope and work you can see before you commit. That&apos;s why every project starts with a free mockup.</p>
            </div>
            <div className="mt-10 grid max-w-[640px] grid-cols-3 gap-4 border-t border-ink pt-6 font-sans">
              {[["US + CA", "Local focus"], ["Free", "Homepage mockup"], ["1:1", "Direct with the founder"]].map(([a, b]) => (
                <div key={a}><div className="display text-[24px] sm:text-[30px]">{a}</div><div className="mt-1 text-[11px] text-muted">{b}</div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
