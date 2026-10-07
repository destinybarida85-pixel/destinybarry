"use client";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";

export function FinalCTA() {
  return (
    <section id="cta" data-orb="0,0,1" className="relative overflow-hidden border-t border-ink bg-ink text-parchment">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle at 40% 40%, #facb0e, #f06ba8 45%, #78bae6 80%, transparent 100%)" }} />
      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_560px] lg:py-28">
        <Reveal>
          <div className="font-sans text-[11px] font-semibold uppercase tracking-widest2 text-parchment/60">Free · No obligation</div>
          <h2 className="display mt-6 text-[44px] sm:text-[68px] lg:text-[84px]">Get a free homepage mockup.</h2>
          <p className="mt-6 max-w-[480px] text-[18px] leading-[1.6] text-parchment/80">See what your website could look like before you spend a dollar. Tell us about your business and we&apos;ll design your homepage.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border border-parchment/20 bg-parchment p-6 text-ink sm:p-8"><LeadForm variant="mockup" /></div>
        </Reveal>
      </div>
    </section>
  );
}
