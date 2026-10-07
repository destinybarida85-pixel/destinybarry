"use client";
import { PACKAGES } from "@/lib/content";
import { SectionHead, Reveal } from "./Reveal";
import { useMockup } from "./MockupContext";

export function Packages() {
  const { openMockup } = useMockup();
  return (
    <section id="packages" data-orb="0.33,-0.25,0.7" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:py-28">
        <SectionHead eyebrow="Packages" title="Simple packages. Clear outcomes." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const feat = "featured" in p && p.featured;
            return (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className={`flex h-full flex-col rounded-[10px] border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${feat ? "border-ink bg-ink text-parchment" : "border-line bg-paper"}`}>
                  <div className="flex items-center justify-between">
                    <div className={`eyebrow ${feat ? "!text-parchment/70" : ""}`}>{p.name}</div>
                    {feat && <span className="rounded-full border border-parchment/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em]">Most popular</span>}
                  </div>
                  <div className="display mt-6 text-[52px]">{p.price}</div>
                  <div className={`mt-1 font-sans text-[12px] ${feat ? "text-parchment/70" : "text-muted"}`}>{p.note}</div>
                  <p className="mt-6 text-[16px] leading-[1.55]">{p.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-3 font-sans text-[13px]">
                    {p.features.map((f) => <li key={f} className={`flex gap-3 border-t pt-3 ${feat ? "border-parchment/20" : "border-line"}`}><span>✓</span>{f}</li>)}
                  </ul>
                  <button onClick={() => openMockup(p.name)} className={`btn mt-8 w-full ${feat ? "bg-parchment text-ink hover:bg-white" : "btn-line"}`}>
                    {p.price === "Custom" ? "Talk to us" : "Start with a free mockup"} →
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 font-sans text-[11px] text-muted">Prices in USD. Every project starts with a free homepage mockup. Optional monthly care plans available.</p>
      </div>
    </section>
  );
}
