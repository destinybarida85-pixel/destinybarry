import { MockupProvider } from "@/components/MockupContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Industries } from "@/components/Industries";
import { Engine } from "@/components/Engine";
import { Portfolio } from "@/components/Portfolio";
import { Packages } from "@/components/Packages";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FollowLight } from "@/components/FollowLight";

export default function Home() {
  return (
    <MockupProvider>
      <FollowLight />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <BeforeAfter />
        <Services />
        <HowItWorks />
        <Industries />
        <Engine />
        <Portfolio />
        <Packages />
        <About />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </MockupProvider>
  );
}
