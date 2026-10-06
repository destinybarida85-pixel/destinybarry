"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { usePointer } from "@/lib/useParallax";
import { useMockup } from "./MockupContext";

const WORDS = ["Your", "website", "should", "bring", "you", "customers."];

function Chip({ children, className, depth, px, py, delay }: { children: React.ReactNode; className: string; depth: number; px: any; py: any; delay: number }) {
  const x = useTransform(px, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(py, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.6 }}>
      <div className="float-lbl flex items-center gap-2 border border-line bg-paper px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]" style={{ animationDelay: `${delay * 2}s` }}>
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />{children}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { openMockup } = useMockup();
  const { x: px, y: py } = usePointer();
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 700], [0, -90]);

  const sphereX = useTransform(px, [-0.5, 0.5], [-30, 30]);
  const sphereY = useTransform(py, [-0.5, 0.5], [-24, 24]);
  const cardX = useTransform(px, [-0.5, 0.5], [18, -18]);
  const cardY = useTransform(py, [-0.5, 0.5], [14, -14]);
  const backX = useTransform(px, [-0.5, 0.5], [-26, 26]);
  const backY = useTransform(py, [-0.5, 0.5], [-20, 20]);
  const tiltY = useTransform(px, [-0.5, 0.5], [-6, 6]);
  const tiltX = useTransform(py, [-0.5, 0.5], [5, -5]);

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-20 pt-12 sm:px-10 lg:grid-cols-[1fr_560px] lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow">
            AI-powered web design &amp; growth · US &amp; Canada
          </motion.div>
          <h1 className="display mt-7 text-[46px] sm:text-[72px] lg:text-[88px] xl:text-[96px] lg:leading-[0.86]" aria-label="Your website should bring you customers.">
            {WORDS.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom" aria-hidden>
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 max-w-[520px] text-[17px] leading-[1.6] text-[#3a3a37] sm:text-[18px]">
            We design high-converting websites and AI-powered systems that help local businesses capture more leads, book more appointments and follow up automatically.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
            <button onClick={() => openMockup()} className="btn btn-dark">Get a free homepage mockup →</button>
            <a href="#how" className="link-u">See how it works →</a>
          </motion.div>
        </div>

        <motion.div style={{ y: lift }} className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[500px]">
          <div className="pointer-events-none absolute right-[-40px] top-[-60px] hidden h-[560px] w-[560px] rounded-full border border-ink/10 sm:block" />
          <div className="pointer-events-none absolute right-[30px] top-[20px] hidden h-[400px] w-[400px] rounded-full border border-ink/10 sm:block" />

          {/* iridescent sphere */}
          <motion.div style={{ x: sphereX, y: sphereY }} className="absolute left-[8%] top-[4%] h-[250px] w-[250px] sm:h-[330px] sm:w-[330px]" aria-hidden>
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 32% 28%, #fff7c2 0%, #facb0e 18%, #f06ba8 46%, #78bae6 74%, #c9b6f0 100%)", boxShadow: "inset -22px -28px 60px rgba(120,186,230,.55), inset 18px 20px 50px rgba(255,255,255,.55)" }} />
            <div className="absolute inset-0 rounded-full mix-blend-soft-light" style={{ background: "conic-gradient(from 0deg, #facb0e, #f06ba8, #78bae6, #c9b6f0, #facb0e)", animation: "iris 24s linear infinite" }} />
            <div className="absolute left-[16%] top-[12%] h-[34%] w-[42%] rounded-full bg-white/50 blur-xl" />
          </motion.div>

          {/* back card */}
          <motion.div style={{ x: backX, y: backY }} className="absolute left-0 top-[46%] hidden w-[250px] border border-line bg-paper/90 p-4 sm:block">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Lead inbox</div>
            {["Mike R. · Roof repair quote", "Anna L. · Booking request", "Dev P. · Estimate follow-up"].map((l, i) => (
              <div key={l} className="mt-3 flex items-center justify-between border-t border-line pt-3 font-sans text-[11px]">
                <span>{l}</span><span className="text-muted">{["now", "2m", "9m"][i]}</span>
              </div>
            ))}
          </motion.div>

          {/* main website mockup */}
          <motion.div style={{ x: cardX, y: cardY, rotateY: tiltY, rotateX: tiltX, transformPerspective: 1000 }} className="absolute right-0 top-[22%] w-[88%] border border-line bg-paper sm:w-[78%]">
            <div className="flex items-center gap-1.5 border-b border-[#e3e2df] px-3 py-2.5">
              {[0, 1, 2].map((d) => <span key={d} className="h-[9px] w-[9px] rounded-full bg-[#d9d8d4]" />)}
              <span className="ml-2 flex-1 rounded-md bg-[#f1f0ed] px-2.5 py-1 font-sans text-[10px] text-[#8a8984]">summitroofing.com</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[12px] font-bold uppercase tracking-[0.08em]">Summit Roofing</span>
                <span className="rounded-[8px] bg-ink px-2.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.06em] text-parchment">Get a quote</span>
              </div>
              <div className="display mt-5 text-[24px] leading-[0.92] sm:text-[28px]">Roofing done right the first time.</div>
              <p className="mt-3 text-[12px] leading-[1.5] text-[#55544f]">Licensed, insured and trusted by homeowners across the valley.</p>
              <div className="mt-4 flex gap-2 font-sans text-[10px] font-semibold">
                <span className="rounded-[8px] bg-ink px-3 py-2 text-parchment">Get free estimate</span>
                <span className="rounded-[8px] border border-line px-3 py-2">Our work</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#e3e2df] pt-3 font-sans text-[10px] text-[#55544f]">
                <span>★★★★★ 4.9 · 212 reviews</span><span className="text-[#8a8984]">AI assistant online</span>
              </div>
            </div>
          </motion.div>

          <Chip className="left-0 top-0 sm:left-[-10px]" depth={22} px={px} py={py} delay={0.9}>New lead</Chip>
          <Chip className="right-0 top-[6%] hidden sm:block" depth={34} px={px} py={py} delay={1.1}>Estimate requested</Chip>
          <Chip className="bottom-[10%] left-0" depth={28} px={px} py={py} delay={1.3}>Appointment booked</Chip>
          <Chip className="bottom-0 right-[8%]" depth={38} px={px} py={py} delay={1.5}>AI assistant active</Chip>
        </motion.div>
      </div>

      {/* trust marquee */}
      <div className="overflow-hidden border-y border-line py-4" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {["Website design", "AI chat assistants", "Lead capture", "Booking systems", "Automated follow-up", "AI marketing videos", "United States", "Canada"].map((t) => <span key={t + k}>{t} <span className="ml-12">✦</span></span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
