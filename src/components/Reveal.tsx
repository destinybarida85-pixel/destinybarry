"use client";
import { motion } from "framer-motion";

export function Reveal({
  children, delay = 0, y = 28, className, as = "div",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "span" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function SectionHead({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mt-6 max-w-[1000px] text-[40px] sm:text-[52px] lg:text-[64px]">{title}</h2>
      </Reveal>
    </div>
  );
}
