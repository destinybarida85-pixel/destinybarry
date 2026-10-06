# destinybarry.com

Marketing site for **Destiny Barry**, an AI-powered web design and growth agency for local businesses in the US and Canada.

**Stack:** Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · Framer Motion · TypeScript

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What's interactive

- Sticky nav with scroll-spy, scroll progress bar and mobile menu
- Hero with iridescent sphere, mouse parallax, floating mockups and word-by-word reveal
- Before/After slider (drag or arrow keys) with three industry samples
- Services accordion, scroll-driven How It Works line, Industries tabs
- AI Client Engine diagram (auto-plays, click any step, pause/play)
- Portfolio filter with expandable, count-up results
- Packages that pre-fill the mockup request with the chosen plan
- "Get a free homepage mockup" modal (every CTA), contact form and final CTA form

## Forms

All forms post to `POST /api/contact` (validation, honeypot, basic rate limit). Configure delivery via environment variables (see `.env.example`):

- `CONTACT_WEBHOOK_URL` – forwards JSON to Zapier / Make / n8n / Slack / a CRM
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ `CONTACT_FROM_EMAIL`) – email notification via Resend

With neither set, submissions are written to the server log only. **Set one before launch.**

## Editing content

Copy, prices, case studies and industries live in `src/lib/content.ts`. The contact email there (`hello@destinybarry.com`) and the case-study figures are placeholders.
