import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
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

  const handleBookCall = () => {
    // If client has provided their Calendly link, directly navigate or open in modal
    if (siteConfig.calendlyUrl && siteConfig.calendlyUrl.trim().length > 0) {
      window.open(siteConfig.calendlyUrl, "_blank", "noopener,noreferrer");
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleLearnMore = () => {
    const el = document.getElementById("opportunity");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E8E8] flex flex-col selection:bg-[#B00000] selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar onBookCall={handleBookCall} />

      {/* Main Single-Page Recruitment Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onBookCall={handleBookCall} onLearnMore={handleLearnMore} />

        {/* 2. Opportunity Introduction ("More Than A Job") */}
        <OpportunitySection onBookCall={handleBookCall} onLearnMore={handleLearnMore} />

        {/* 3. Why Genesis / 6 Benefit Cards */}
        <Benefits onBookCall={handleBookCall} />

        {/* 4. The Genesis Journey / 4-Step Process */}
        <Journey onBookCall={handleBookCall} />

        {/* 5. Who Is This For? / Candidate Profile */}
        <WhoIsThisFor onBookCall={handleBookCall} />

        {/* 6. Testimonials ("Hear From Our Agents") */}
        <Testimonials />

        {/* 7. About Genesis / Leadership Profile */}
        <About />

        {/* 8. Book a Call / Primary Conversion Section */}
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
