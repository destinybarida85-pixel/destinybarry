"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePointer } from "@/lib/useParallax";
import { useMockup } from "./MockupContext";
import { Confetti as K, Mascots as M } from "./Illustrations";

const LINES = [["Your", "website"], ["should", "bring", "you"], ["customers."]];

/** An illustration that floats: mouse + scroll parallax, scaled by depth, with a slow idle bob. */
function Float({ className, depth, rotate = 0, delay = 0, px, py, children }: {
  className: string; depth: number; rotate?: number; delay?: number; px: MotionValue<number>; py: MotionValue<number>; children: React.ReactNode;
}) {
  const { scrollY } = useScroll();
  const x = useTransform(px, [-0.5, 0.5], [-depth * 34, depth * 34]);
  const my = useTransform(py, [-0.5, 0.5], [-depth * 26, depth * 26]);
  const sy = useTransform(scrollY, [0, 900], [0, -depth * 110]);
  const y = useTransform([my, sy], ([a, b]: number[]) => a + b);
  return (
    <motion.div
      style={{ x, y, rotate }}
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="float-lbl" style={{ animationDuration: `${6 + depth * 2}s`, animationDelay: `${delay}s` }}>{children}</div>
    </motion.div>
  );
}

export function Hero() {
  const { openMockup } = useMockup();
  const { x: px, y: py } = usePointer();
  const f = { px, py };

  return (
    <section id="top" data-orb="0,0,1" className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] items-center justify-center px-5 pb-16 pt-28 sm:px-10">
        {/* left illustration cluster */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[25%] lg:block" aria-hidden>
          <Float className="left-[2%] top-[14%] w-[62%]" depth={1.1} rotate={-6} {...f}><M.Flower className="w-full" /></Float>
          <Float className="bottom-[10%] left-[22%] w-[52%]" depth={1.4} rotate={4} delay={0.2} {...f}><M.Blob className="w-full" /></Float>
          <Float className="left-[0%] top-[58%] w-[18%]" depth={0.7} rotate={-12} delay={0.1} {...f}><K.Star className="w-full" /></Float>
          <Float className="right-[8%] top-[20%] w-[16%]" depth={0.9} delay={0.3} {...f}><K.Coin className="w-full" /></Float>
          <Float className="bottom-[34%] right-[0%] w-[18%]" depth={0.6} rotate={20} delay={0.4} {...f}><K.Leaf className="w-full" /></Float>
          <Float className="left-[40%] top-[6%] w-[12%]" depth={0.5} delay={0.5} {...f}><K.Spark className="w-full" /></Float>
        </div>
        {/* right illustration cluster */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[25%] lg:block" aria-hidden>
          <Float className="right-[4%] top-[12%] w-[58%]" depth={1.2} rotate={5} delay={0.15} {...f}><M.Cat className="w-full" /></Float>
          <Float className="bottom-[6%] right-[8%] w-[50%]" depth={1.5} rotate={-4} delay={0.35} {...f}><M.Triangle className="w-full" /></Float>
          <Float className="left-[34%] top-[40%] w-[40%]" depth={0.9} rotate={-3} delay={0.25} {...f}><M.Cloud className="w-full" /></Float>
          <Float className="left-[6%] top-[12%] w-[15%]" depth={0.7} rotate={-10} delay={0.45} {...f}><K.Heart className="w-full" /></Float>
          <Float className="bottom-[40%] right-[2%] w-[16%]" depth={0.6} rotate={14} delay={0.55} {...f}><K.Gear className="w-full" /></Float>
          <Float className="bottom-[6%] left-[4%] w-[15%]" depth={1.0} rotate={8} delay={0.3} {...f}><K.Lock className="w-full" /></Float>
          <Float className="left-[40%] bottom-[30%] w-[14%]" depth={0.8} rotate={-8} delay={0.6} {...f}><K.Qr className="w-full" /></Float>
        </div>

        <div className="relative z-10 max-w-[560px] text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow">
            AI-powered web design &amp; growth · US &amp; Canada
          </motion.div>
          <h1 className="display mt-6 text-[44px] sm:text-[56px] lg:text-[68px]" aria-label="Your website should bring you customers.">
            {LINES.map((line, li) => (
              <span key={li} className="block" aria-hidden>
                {line.map((w) => (
                  <span key={w} className="mr-[0.2em] inline-block overflow-hidden align-bottom last:mr-0">
                    <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + (li * 2 + line.indexOf(w)) * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mx-auto mt-7 max-w-[500px] text-[17px] leading-[1.5] text-body sm:text-[19px]">
            We design high-converting websites and AI-powered systems that help local businesses capture more leads, book more appointments and follow up automatically.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => openMockup()} className="btn btn-dark">Get a free homepage mockup →</button>
            <a href="#how" className="btn btn-line">See how it works</a>
          </motion.div>
          {/* small screens: the mascots sit under the buttons instead of flanking the text */}
          <div className="mx-auto mt-10 flex max-w-[360px] items-end justify-center gap-3 lg:hidden" aria-hidden>
            <M.Flower className="w-[22%]" /><M.Cat className="w-[22%]" /><M.Triangle className="w-[22%]" /><M.Blob className="w-[22%]" />
          </div>
        </div>
      </div>

      {/* services ribbon */}
      <div className="relative z-10 overflow-hidden border-y border-line bg-parchment/70 py-4 backdrop-blur-sm" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-sans text-[13px] font-medium text-muted">
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
