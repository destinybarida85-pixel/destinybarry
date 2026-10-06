"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LeadForm } from "./LeadForm";

type Ctx = { openMockup: (plan?: string) => void };
const MockupCtx = createContext<Ctx>({ openMockup: () => {} });
export const useMockup = () => useContext(MockupCtx);

export function MockupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<string | undefined>();
  const openMockup = useCallback((p?: string) => { setPlan(p); setOpen(true); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <MockupCtx.Provider value={{ openMockup }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Get a free homepage mockup"
              className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto border border-line bg-parchment p-6 sm:rounded-[14px] sm:p-9"
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="eyebrow">Free · No obligation</div>
                  <h3 className="display mt-3 text-[32px] sm:text-[38px]">Get a free homepage mockup</h3>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="-mr-2 -mt-2 p-2 font-sans text-2xl leading-none transition-opacity hover:opacity-50">×</button>
              </div>
              <p className="mt-4 text-[16px] leading-relaxed text-[#3a3a37]">Tell us about your business and we&apos;ll send a custom homepage design within a few business days.</p>
              <div className="mt-6"><LeadForm variant="mockup" plan={plan} onDone={() => {}} /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MockupCtx.Provider>
  );
}
