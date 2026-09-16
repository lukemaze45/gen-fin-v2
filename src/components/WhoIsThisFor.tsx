import React from "react";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

interface WhoIsThisForProps {
  onBookCall: () => void;
}

export const WhoIsThisFor: React.FC<WhoIsThisForProps> = ({ onBookCall }) => {
  return (
    <section className="py-14 sm:py-28 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-left md:text-center mb-8 sm:mb-18 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] border border-neutral-800 text-[11px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
            CANDIDATE PROFILE
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            {siteConfig.whoIsThisFor.headline}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl md:mx-auto">
            We look for high-integrity individuals ready to apply themselves. No prior financial licenses required to begin the conversation.
          </p>
        </motion.div>

        {/* 6 Traits Grid: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {siteConfig.whoIsThisFor.traits.map((trait, idx) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0C0C0C] border border-neutral-800 hover:border-neutral-700 transition-all text-left flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-center mb-2.5 sm:mb-4 text-[#FF4D4D]">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-sm min-[380px]:text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 tracking-wide leading-tight break-words">
                  {trait.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light break-words">
                  {trait.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Realistic Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#090909] border border-neutral-800/80 flex items-start gap-2.5 sm:gap-3.5 text-left max-w-4xl mx-auto"
        >
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            <strong className="text-neutral-200 font-semibold">Realistic Career Note: </strong>
            {siteConfig.whoIsThisFor.note}
          </p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 sm:mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookCall}
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all inline-flex items-center gap-2 glow-red-subtle cursor-pointer min-h-[48px]"
            id="who-book-call-btn"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>SEE IF GENESIS IS THE RIGHT FIT</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
