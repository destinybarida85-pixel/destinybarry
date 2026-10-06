import { NextResponse } from "next/server";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clip(body.company_site, 200)) return NextResponse.json({ ok: true });

  const data = {
    type: clip(body.type, 20) === "mockup" ? "mockup" : "contact",
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    business: clip(body.business, 160),
    businessType: clip(body.businessType, 60),
    website: clip(body.website, 300),
    plan: clip(body.plan, 40),
    message: clip(body.message, 3000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.type === "contact" && data.message.length < 5) errors.message = "Tell us a little about what you need.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const lines = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  const subject = data.type === "mockup" ? `Free mockup request: ${data.business || data.name}` : `New enquiry: ${data.name}`;

  const tasks: Promise<Response>[] = [];
  if (process.env.CONTACT_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...data, receivedAt: new Date().toISOString() }),
      }),
    );
  }
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: data.email,
          subject,
          text: lines.join("\n"),
        }),
      }),
    );
  }

  if (tasks.length) {
    const results = await Promise.allSettled(tasks);
    const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
    if (!delivered) {
      console.error("[contact] delivery failed", subject);
      return NextResponse.json({ ok: false, error: "We couldn't send that right now. Please try again." }, { status: 502 });
    }
  } else {
    // No delivery provider configured: keep the lead in the server log.
    console.log(`[contact] ${subject}\n${lines.join("\n")}`);
  }

  return NextResponse.json({ ok: true });
}
