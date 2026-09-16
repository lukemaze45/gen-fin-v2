import React from "react";
import { PhoneCall, Calendar, Clock, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { GenesisLogo } from "./GenesisLogo";
import { siteConfig } from "@/lib/site-config";

interface BookCallProps {
  onBookCall: () => void;
}

export const BookCall: React.FC<BookCallProps> = ({ onBookCall }) => {
  return (
    <section id="book-call" className="py-16 sm:py-28 bg-[#080808] border-t border-neutral-900 relative overflow-hidden">
      {/* Red ambient radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#B00000]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <GenesisLogo variant="mark" size="md" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif font-black text-3xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-3 sm:mb-6"
        >
          LET'S TALK<br />ABOUT YOUR FUTURE.
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-10"
        >
          Interested in learning more about Genesis Financial? Book a conversation with our team and we'll walk you through the opportunity.
        </motion.p>

        {/* Direct Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#101010]/90 border border-neutral-800 shadow-2xl max-w-3xl mx-auto backdrop-blur-sm"
        >
          {/* 3 Columns preserved on mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-5 sm:mb-8 text-left border-b border-neutral-800/80 pb-4 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">Duration</h4>
                <p className="text-xs min-[380px]:text-sm sm:text-base font-semibold text-white">15–20 Min</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">Format</h4>
                <p className="text-xs min-[380px]:text-sm sm:text-base font-semibold text-white">Phone / Zoom</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">Approach</h4>
                <p className="text-xs min-[380px]:text-sm sm:text-base font-semibold text-white">Zero Pressure</p>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookCall}
              className="w-full sm:w-auto px-6 sm:px-12 py-3.5 sm:py-4 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 glow-red-subtle cursor-pointer hover:shadow-[0_0_35px_rgba(176,0,0,0.55)] min-h-[48px] sm:min-h-[52px]"
              id="cta-book-call-main-btn"
            >
              <PhoneCall className="w-4 h-4 text-white shrink-0" />
              <span className="whitespace-nowrap">BOOK A CONVERSATION</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </motion.button>
          </div>

          {/* Direct phone / email links */}
          <div className="mt-5 pt-5 border-t border-neutral-800/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-400">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF4D4D]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#FF4D4D]" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
