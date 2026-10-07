import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/content";

const montserrat = localFont({
  src: "../../public/fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});
const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Destiny Barry | AI-Powered Web Design & Growth for Local Businesses",
  description:
    "Websites that bring you customers. Destiny Barry designs high-converting websites with AI chat assistants, lead capture, booking and automated follow-up for local businesses in the US and Canada.",
  openGraph: {
    title: "Your website should bring you customers.",
    description: "AI-powered web design and growth systems for local businesses in the US and Canada.",
    url: SITE.url,
    siteName: "Destiny Barry",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Destiny Barry", description: "Your website should bring you customers." },
};

export const viewport: Viewport = { themeColor: "#FBFAF9", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Destiny Barry",
  url: SITE.url,
  areaServed: ["United States", "Canada"],
  description: "AI-powered web design and growth agency for local businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-serif">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
