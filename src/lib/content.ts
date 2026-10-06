export const SITE = {
  name: "Destiny Barry",
  domain: "destinybarry.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://destinybarry.com",
  email: "hello@destinybarry.com",
  region: "United States & Canada",
};

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "How it works", href: "#how" },
  { label: "Industries", href: "#industries" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    id: "design",
    title: "Website Design",
    blurb: "Fast, conversion-first websites built around one goal: turning visitors into customers.",
    points: ["Custom design, never a template", "Mobile-first and fast-loading", "Local SEO foundations built in", "Clear calls to action on every screen"],
  },
  {
    id: "chat",
    title: "AI Chat Assistants",
    blurb: "A trained assistant answers questions, qualifies visitors and books jobs, day or night.",
    points: ["Trained on your services and pricing", "Answers in seconds, 24/7", "Hands off hot leads to you instantly", "Speaks in your brand voice"],
  },
  {
    id: "leads",
    title: "Lead Capture",
    blurb: "Quote forms, click-to-call and smart popups that make it effortless to say yes.",
    points: ["Short, high-converting forms", "Instant SMS and email alerts", "Lead source tracking", "CRM and spreadsheet sync"],
  },
  {
    id: "booking",
    title: "Booking Systems",
    blurb: "Let customers pick a time that works, with reminders that cut no-shows.",
    points: ["Live calendar availability", "Deposits and intake questions", "Automatic reminders", "Reschedule links built in"],
  },
  {
    id: "followup",
    title: "Automated Follow-Up",
    blurb: "Every lead gets a fast reply and a polite nudge until they book or say no.",
    points: ["Missed-call text back", "Email and SMS sequences", "Review requests after each job", "Win-back campaigns for old leads"],
  },
  {
    id: "video",
    title: "AI Marketing Videos",
    blurb: "Short, scroll-stopping videos for your site and socials, produced without a film crew.",
    points: ["Hero and ad videos", "Vertical cuts for Reels and Shorts", "Captions and voiceover", "Monthly refresh options"],
  },
] as const;

export const STEPS = [
  { n: "01", title: "Free homepage mockup", text: "Send us your site or business name. Within days you receive a custom homepage mockup, free and with no obligation." },
  { n: "02", title: "Strategy & design", text: "We map the customer journey, from first click to booked job, then design every page around it." },
  { n: "03", title: "Build & connect", text: "We build the site and wire in your AI assistant, lead capture, booking and follow-up, then test the whole flow." },
  { n: "04", title: "Launch & grow", text: "We launch, watch the numbers and keep improving so your site keeps bringing in customers." },
];

export const INDUSTRIES = [
  { id: "home", name: "Home Services", examples: "Roofing, HVAC, plumbing, landscaping, cleaning", win: "Capture urgent quote requests and answer after-hours calls before a competitor does.", flow: ["Instant quote form", "AI answers pricing questions", "Inspection booked on the calendar"] },
  { id: "health", name: "Dental & Health", examples: "Dentists, chiropractors, physio, med spas", win: "Fill the schedule with new-patient bookings and cut no-shows with reminders.", flow: ["New-patient booking page", "AI triages common questions", "Reminder and recall sequences"] },
  { id: "beauty", name: "Salons & Beauty", examples: "Salons, barbers, lash, nails, spas", win: "Turn Instagram traffic into booked chairs with a clean, mobile-first booking flow.", flow: ["Service menu with pricing", "Deposit-secured bookings", "Rebooking nudges"] },
  { id: "legal", name: "Legal & Finance", examples: "Law firms, accountants, brokers, insurance", win: "Present authority, qualify enquiries and route the right clients to the right person.", flow: ["Case intake form", "AI pre-qualification", "Consultation scheduling"] },
  { id: "auto", name: "Auto & Trades", examples: "Detailing, repair shops, towing, tint", win: "Show your work, quote fast and book the bay before the customer shops around.", flow: ["Before/after gallery", "Instant estimate request", "Appointment confirmation"] },
  { id: "food", name: "Restaurants & Events", examples: "Restaurants, caterers, venues, photographers", win: "Take reservations and enquiries directly instead of paying marketplace fees.", flow: ["Menu and gallery", "Reservation or enquiry form", "Auto-reply and follow-up"] },
] as const;

export const ENGINE = [
  { id: "visitor", label: "Visitor", detail: "Someone searches, taps an ad or follows a link and lands on your site.", metric: "Traffic" },
  { id: "site", label: "Website", detail: "A fast, focused page makes the offer clear in seconds and puts the next step in front of them.", metric: "Clarity" },
  { id: "ai", label: "AI Assistant", detail: "Questions get instant answers. The assistant qualifies the visitor and suggests the next step.", metric: "Instant reply" },
  { id: "capture", label: "Lead Capture", detail: "Contact details land in your inbox, phone and CRM the moment they are submitted.", metric: "Leads" },
  { id: "book", label: "Booking", detail: "The lead picks a time on your live calendar. No phone tag, no back and forth.", metric: "Appointments" },
  { id: "follow", label: "Follow-Up", detail: "Reminders, nudges and review requests run automatically so nothing slips through.", metric: "Retention" },
  { id: "customer", label: "Customer", detail: "A booked job, a five-star review and a customer who comes back and refers friends.", metric: "Revenue" },
] as const;

export const CASES = [
  {
    id: "roofing", client: "Summit Roofing", industry: "Home Services", region: "Colorado, USA",
    summary: "A dated brochure site rebuilt around a one-step estimate request and an after-hours AI assistant.",
    tags: ["Website Design", "AI Chat Assistants", "Lead Capture"],
    stats: [{ v: 3.2, s: "x", l: "more quote requests" }, { v: 41, s: "%", l: "after-hours leads" }, { v: 9, s: "s", l: "avg. first response" }],
    tone: "from-[#facb0e]/40 via-[#f06ba8]/30 to-[#78bae6]/40",
  },
  {
    id: "dental", client: "Lakeshore Dental", industry: "Dental & Health", region: "Ontario, Canada",
    summary: "New-patient booking flow with deposits, reminders and automatic recall messages.",
    tags: ["Booking Systems", "Automated Follow-Up"],
    stats: [{ v: 58, s: "%", l: "fewer no-shows" }, { v: 2.4, s: "x", l: "online bookings" }, { v: 120, s: "+", l: "reviews in 90 days" }],
    tone: "from-[#78bae6]/50 via-[#c9b6f0]/30 to-[#facb0e]/30",
  },
  {
    id: "salon", client: "Atelier Hair Studio", industry: "Salons & Beauty", region: "California, USA",
    summary: "Mobile-first booking site plus AI-made short videos that turned social views into chairs filled.",
    tags: ["Website Design", "AI Marketing Videos", "Booking Systems"],
    stats: [{ v: 74, s: "%", l: "bookings from mobile" }, { v: 3, s: "x", l: "video engagement" }, { v: 28, s: "%", l: "more rebookings" }],
    tone: "from-[#f06ba8]/40 via-[#facb0e]/30 to-[#c9b6f0]/40",
  },
  {
    id: "law", client: "Harbor & Pike Law", industry: "Legal & Finance", region: "British Columbia, Canada",
    summary: "Authority-led site with an AI intake assistant that pre-qualifies cases before a consult is booked.",
    tags: ["Website Design", "AI Chat Assistants", "Lead Capture"],
    stats: [{ v: 63, s: "%", l: "better-qualified leads" }, { v: 5, s: "hrs", l: "saved per week" }, { v: 2.1, s: "x", l: "consult bookings" }],
    tone: "from-[#c9b6f0]/40 via-[#78bae6]/30 to-[#f06ba8]/30",
  },
] as const;

export const PACKAGES = [
  {
    id: "launch", name: "Launch", price: "$1,800", note: "one-time", tagline: "A sharp, conversion-focused site to get you online properly.",
    features: ["Up to 5 custom pages", "Mobile-first responsive build", "Lead capture form + alerts", "Local SEO basics", "Free homepage mockup first", "14 days of post-launch support"],
  },
  {
    id: "growth", name: "Growth", price: "$3,900", note: "one-time + optional care plan", tagline: "The full client engine: site, AI assistant, booking and follow-up.",
    features: ["Everything in Launch", "AI chat assistant trained on your business", "Online booking system", "Automated email & SMS follow-up", "Review request automation", "30 days of optimisation"], featured: true,
  },
  {
    id: "scale", name: "Scale", price: "Custom", note: "tailored to your business", tagline: "For multi-location or high-volume businesses ready to dominate locally.",
    features: ["Everything in Growth", "AI marketing videos each month", "Multi-location pages", "CRM and tool integrations", "Monthly strategy and reporting", "Priority support"],
  },
] as const;

export const BUSINESS_TYPES = ["Home services", "Dental / health", "Salon / beauty", "Legal / finance", "Auto / trades", "Restaurant / events", "Other"];

export const CLIENTS = [
  { name: "NorthPeak Roofing", file: "northpeak" }, { name: "Summit HVAC", file: "summit" }, { name: "Everline Plumbing", file: "everline" },
  { name: "Oakridge Dental", file: "oakridge" }, { name: "Apex Exteriors", file: "apex" }, { name: "BlueStone Roofing", file: "bluestone" },
  { name: "Haven Med Spa", file: "haven-medspa" }, { name: "PrimeFlow HVAC", file: "primeflow" }, { name: "Westbrook Landscaping", file: "westbrook" },
  { name: "ClearPath Dental", file: "clearpath" }, { name: "Ridgeway Roofing", file: "ridgeway" }, { name: "UrbanCraft Remodeling", file: "urbancraft" },
  { name: "NorthStar Exteriors", file: "northstar" }, { name: "Elevate Roofing Co.", file: "elevate" }, { name: "Beacon Home Services", file: "beacon" },
  { name: "TrueLine Plumbing", file: "trueline" }, { name: "Sterling HVAC", file: "sterling" }, { name: "Greenfield Landscapes", file: "greenfield" },
  { name: "Atlas Roofing Group", file: "atlas" }, { name: "Horizon Dental", file: "horizon" }, { name: "PeakPoint Construction", file: "peakpoint" },
  { name: "BrightHouse Exteriors", file: "brighthouse" }, { name: "ProShield Roofing", file: "proshield" }, { name: "Nova Home Services", file: "nova" },
  { name: "CedarStone Remodeling", file: "cedarstone" }, { name: "ClearView Roofing", file: "clearview" }, { name: "MetroFlow Plumbing", file: "metroflow" },
  { name: "SummitEdge Construction", file: "summitedge" }, { name: "PrimeRoof Solutions", file: "primeroof" }, { name: "Evergreen Home Co.", file: "evergreen" },
  { name: "Crestline HVAC", file: "crestline" }, { name: "Oak & Stone Landscaping", file: "oak-stone" }, { name: "Vertex Exteriors", file: "vertex" },
  { name: "Haven Home Services", file: "haven-home" }, { name: "IronPeak Roofing", file: "ironpeak" },
] as const;
