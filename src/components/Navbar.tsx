"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV } from "@/lib/content";
import { useMockup } from "./MockupContext";

export function Navbar() {
  const { openMockup } = useMockup();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [stuck, setStuck] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${stuck || open ? "border-b border-line bg-parchment/85 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-10">
        <a href="#top" className="font-sans text-[14px] font-bold uppercase tracking-[0.2em]" onClick={() => setOpen(false)}>Destiny Barry</a>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="relative font-sans text-[11px] font-semibold uppercase tracking-[0.16em]">
              {n.label}
              {active === n.href.slice(1) && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-0 right-0 h-px bg-ink" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => openMockup()} className="btn btn-dark hidden !px-5 !py-3 !text-[11px] sm:inline-flex">Get a free mockup →</button>
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-ink" />
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-[73px] overflow-y-auto bg-parchment px-5 pb-10 pt-6 xl:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.href} href={n.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="display block border-b border-line py-4 text-[34px]"
              >{n.label}</motion.a>
            ))}
            <button onClick={() => { setOpen(false); openMockup(); }} className="btn btn-dark mt-8 w-full">Get a free homepage mockup →</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
