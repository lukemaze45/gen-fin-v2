import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsSection } from "./components/StatsSection";
import { OpportunitySection } from "./components/OpportunitySection";
import { Benefits } from "./components/Benefits";
import { Journey } from "./components/Journey";
import { WhoIsThisFor } from "./components/WhoIsThisFor";
import { Testimonials } from "./components/Testimonials";
import { About } from "./components/About";
import { BookCall } from "./components/BookCall";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { DisclosuresModal, LegalDocType } from "./components/DisclosuresModal";
import { siteConfig } from "@/lib/site-config";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);

  // Smooth scroll progress bar at the top of the screen
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleBookCall = () => {
    // If client has provided their Calendly link, directly navigate or open in modal
    if (siteConfig.calendlyUrl && siteConfig.calendlyUrl.trim().length > 0) {
      window.open(siteConfig.calendlyUrl, "_blank", "noopener,noreferrer");
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleLearnMore = () => {
    const el = document.getElementById("stats-preview") || document.getElementById("opportunity");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E8E8] flex flex-col selection:bg-[#B00000] selection:text-white relative">
      {/* Laser-sleek Crimson Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B00000] via-[#FF4D4D] to-[#B00000] z-50 origin-left shadow-[0_0_12px_rgba(255,77,77,0.7)] pointer-events-none"
      />

      {/* Sticky Header Navigation */}
      <Navbar onBookCall={handleBookCall} />

      {/* Main Single-Page Recruitment Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onBookCall={handleBookCall} onLearnMore={handleLearnMore} />

        {/* 2. Flashy Stats & %s Showcase (Gen Z appeal, high-impact metrics) */}
        <div id="stats-preview">
          <StatsSection onBookCall={handleBookCall} />
        </div>

        {/* 3. Opportunity Introduction ("More Than A Job") */}
        <OpportunitySection onBookCall={handleBookCall} onLearnMore={handleLearnMore} />

        {/* 4. Why Genesis / 6 Benefit Cards */}
        <Benefits onBookCall={handleBookCall} />

        {/* 5. The Genesis Journey / 4-Step Process */}
        <Journey onBookCall={handleBookCall} />

        {/* 6. Who Is This For? / Candidate Profile */}
        <WhoIsThisFor onBookCall={handleBookCall} />

        {/* 7. Testimonials ("Hear From Our Agents") */}
        <Testimonials />

        {/* 8. About Genesis / Leadership Profile */}
        <About />

        {/* 9. Book a Call / Primary Conversion Section */}
        <BookCall onBookCall={handleBookCall} />
      </main>

      {/* Footer */}
      <Footer
        onBookCall={handleBookCall}
        onOpenLegal={(type: LegalDocType) => setLegalDoc(type)}
      />

      {/* Calendly & Appointment Scheduling Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Legal & Compliance Disclosures Modal */}
      <DisclosuresModal
        isOpen={legalDoc !== null}
        docType={legalDoc || "disclosures"}
        onClose={() => setLegalDoc(null)}
      />
    </div>
  );
}
