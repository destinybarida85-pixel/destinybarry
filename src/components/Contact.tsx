"use client";
import { SectionHead, Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";
import { SITE } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" data-orb="-0.3,0,0.8" className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_620px] lg:gap-20 lg:py-28">
        <div>
          <SectionHead eyebrow="Contact" title="Let's talk about your business." />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[460px] text-[18px] leading-[1.6] text-[#474645]">Questions about packages, timelines or what&apos;s possible? Send a message and you&apos;ll hear back within one business day.</p>
            <dl className="mt-10 max-w-[460px] border-t border-ink font-sans text-[14px]">
              {[["Email", <a key="e" className="link-u !border-0 !text-[14px] !normal-case !tracking-normal" href={`mailto:${SITE.email}`}>{SITE.email}</a>], ["Serving", SITE.region], ["Response", "Within 1 business day"]].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between border-b border-line py-4"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1}><div className="rounded-[10px] border border-line bg-paper p-6 sm:p-9"><LeadForm variant="contact" /></div></Reveal>
      </div>
    </section>
  );
}
