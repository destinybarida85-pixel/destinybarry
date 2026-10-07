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

export function SectionHead({ eyebrow, title, sub, align = "center", className = "" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left"; className?: string }) {
  const c = align === "center";
  return (
    <div className={`${c ? "text-center" : ""} ${className}`}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.08}>
        <h2 className={`display mt-5 text-[34px] sm:text-[44px] ${c ? "mx-auto max-w-[820px]" : "max-w-[900px]"}`}>{title}</h2>
      </Reveal>
      {sub && <Reveal delay={0.14}><p className={`mt-5 text-[17px] leading-[1.5] text-body ${c ? "mx-auto max-w-[560px]" : "max-w-[560px]"}`}>{sub}</p></Reveal>}
    </div>
  );
}
