import { NAV, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-ink bg-ink text-parchment">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 border-t border-parchment/15 px-5 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="font-sans text-[14px] font-bold uppercase tracking-[0.2em]">Destiny Barry</div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/70">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-parchment">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-6 font-sans text-[11px] text-parchment/60">
          <span>© {new Date().getFullYear()} {SITE.domain}</span>
          <a href="#top" className="font-semibold uppercase tracking-[0.14em] text-parchment hover:opacity-70">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
