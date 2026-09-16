import React, { useState } from "react";
import { X, Calendar, Clock, ArrowRight, CheckCircle2, Shield, ExternalLink, HelpCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GenesisLogo } from "./GenesisLogo";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasCustomUrl, setHasCustomUrl] = useState<string>(siteConfig.calendlyUrl);
  const [showConfigHelper, setShowConfigHelper] = useState<boolean>(false);

  if (!isOpen) return null;

  const isCalendlyConfigured = Boolean(hasCustomUrl && hasCustomUrl.trim().length > 0);

  const handleOpenCalendly = () => {
    if (isCalendlyConfigured) {
      window.open(hasCustomUrl, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      id="booking-modal-overlay"
    >
      <div
        className="relative w-full max-w-xl bg-[#101010] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
        id="booking-modal-content"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close dialog"
          id="close-booking-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <GenesisLogo variant="mark" size="sm" />
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF4D4D] uppercase">Direct Schedule</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Book a Career Conversation</h3>
          </div>
        </div>

        {/* Dynamic Branch: When Calendly URL is configured vs. awaiting client link */}
        {isCalendlyConfigured ? (
          <div className="space-y-6">
            <p className="text-sm text-neutral-300 leading-relaxed">
              Connect directly with a Genesis Financial recruitment director. Select an available time slot that fits your schedule.
            </p>

            <div className="bg-[#050505] border border-neutral-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Clock className="w-4 h-4 text-[#B00000]" />
                <span>15–20 Minute Introductory Overview</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Calendar className="w-4 h-4 text-[#B00000]" />
                <span>Live One-on-One via Phone or Video</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Shield className="w-4 h-4 text-[#B00000]" />
                <span>Confidential Career Assessment</span>
              </div>
            </div>

            <button
              onClick={handleOpenCalendly}
              className="w-full py-4 px-6 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 glow-red-subtle cursor-pointer"
              id="open-configured-calendly-btn"
            >
              <span>Continue to Calendly Scheduler</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="bg-[#151515] border border-neutral-800 rounded-xl p-4.5 text-sm text-neutral-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Clock className="w-4 h-4 text-[#FF4D4D]" />
                <span>Schedule a 1-on-1 Recruitment Call</span>
              </div>
              <p className="text-xs text-neutral-400">
                Interested in learning more about the Genesis Financial agent opportunity? Speak directly with our team to review licensing, compensation structure, and training.
              </p>
            </div>

            {/* Direct Quick Action: Phone & Email */}
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                className="w-full py-3.5 px-5 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all glow-red-subtle cursor-pointer text-sm"
                id="modal-call-direct-btn"
              >
                <span>Call Recruitment Team ({siteConfig.contact.phone})</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}?subject=Career%20Opportunity%20Inquiry%20-%20Genesis%20Financial`}
                className="w-full py-3 px-5 bg-[#1A1A1A] hover:bg-neutral-800 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors border border-neutral-700 text-xs"
                id="modal-email-direct-btn"
              >
                <span>Email {siteConfig.contact.email}</span>
              </a>

              <button
                onClick={() => setShowConfigHelper(!showConfigHelper)}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-neutral-800/60 text-xs text-neutral-400 hover:text-neutral-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-dashed border-neutral-800"
                id="toggle-calendly-helper-btn"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showConfigHelper ? "Hide Calendly Link Setup" : "Client Setup: How to connect your Calendly link"}</span>
              </button>
            </div>

            {/* Helper panel explaining where client pastes their Calendly URL */}
            {showConfigHelper && (
              <div className="p-4 bg-[#050505] border border-neutral-800 rounded-xl text-xs space-y-3 animate-fadeIn">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D4D]" />
                  <span>Calendly Integration Instructions:</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  To connect your real Calendly scheduler, open <code className="text-[#FF4D4D] bg-neutral-900 px-1 py-0.5 rounded font-mono">/lib/site-config.ts</code> and set:
                </p>
                <pre className="p-2.5 bg-neutral-900 rounded font-mono text-[11px] text-neutral-200 overflow-x-auto">
calendlyUrl: "https://calendly.com/your-genesis-account/intro-call"
                </pre>
                <p className="text-neutral-400">
                  Or test preview your link live here:
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://calendly.com/..."
                    value={hasCustomUrl}
                    onChange={(e) => setHasCustomUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#B00000]"
                  />
                  {hasCustomUrl && (
                    <button
                      onClick={handleOpenCalendly}
                      className="px-3 py-1.5 bg-[#B00000] text-white rounded text-xs font-semibold hover:bg-red-700"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
