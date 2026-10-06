"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS_TYPES } from "@/lib/content";

type Variant = "mockup" | "contact" | "compact";
type Errors = Record<string, string>;

function Field({ name, label, type = "text", required, placeholder, autoComplete, error }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}{required && " *"}</span>
      <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} className="field" aria-invalid={!!error} />
      <AnimatePresence>{error && <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 block font-sans text-[12px] text-[#a1261b]" role="alert">{error}</motion.span>}</AnimatePresence>
    </label>
  );
}

export function LeadForm({ variant, plan, onDone }: { variant: Variant; plan?: string; onDone?: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const isContact = variant === "contact";
  const type = isContact ? "contact" : "mockup";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const local: Errors = {};
    if ((fd.name ?? "").trim().length < 2) local.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((fd.email ?? "").trim())) local.email = "Please enter a valid email.";
    if (isContact && (fd.message ?? "").trim().length < 5) local.message = "Tell us a little about what you need.";
    setErrors(local);
    if (Object.keys(local).length) return;

    setStatus("sending"); setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fd, type, plan }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("done");
      onDone?.();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-ink bg-paper p-7" role="status">
        <div className="font-sans text-[11px] font-semibold uppercase tracking-widest2">Received ✓</div>
        <p className="display mt-3 text-[26px]">Thank you. We&apos;ll be in touch within one business day.</p>
        <button onClick={() => setStatus("idle")} className="link-u mt-5">Send another →</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className={variant === "compact" ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <Field name="name" label="Your name" required autoComplete="name" placeholder="Jane Smith" error={errors.name} />
        <Field name="email" label="Email" type="email" required autoComplete="email" placeholder="jane@business.com" error={errors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="business" label="Business name" placeholder="Summit Roofing" />
        <label className="block">
          <span className="mb-1.5 block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Business type</span>
          <select name="businessType" className="field" defaultValue="">
            <option value="" disabled>Select…</option>
            {BUSINESS_TYPES.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>
      {isContact ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
            <Field name="website" label="Current website" placeholder="yourbusiness.com" />
          </div>
          <label className="block">
            <span className="mb-1.5 block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">How can we help? *</span>
            <textarea name="message" rows={5} className="field resize-y" placeholder="Tell us about your business and goals." aria-invalid={!!errors.message} />
            {errors.message && <span className="mt-1 block font-sans text-[12px] text-[#a1261b]" role="alert">{errors.message}</span>}
          </label>
        </>
      ) : (
        <Field name="website" label="Current website (if any)" placeholder="yourbusiness.com" />
      )}
      {plan && <div className="font-sans text-[12px] text-muted">Interested in: <strong className="text-ink">{plan}</strong></div>}
      {serverError && <div className="border border-[#a1261b] p-3 font-sans text-[13px] text-[#a1261b]" role="alert">{serverError}</div>}
      <button type="submit" disabled={status === "sending"} className="btn btn-dark w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending…" : isContact ? "Send message →" : "Get my free mockup →"}
      </button>
      <p className="font-sans text-[11px] text-muted">No spam. We only use your details to reply to this request.</p>
    </form>
  );
}
