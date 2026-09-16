import React from "react";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface WhoIsThisForProps {
  onBookCall: () => void;
}

export const WhoIsThisFor: React.FC<WhoIsThisForProps> = ({ onBookCall }) => {
  return (
    <section className="py-12 sm:py-28 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-left md:text-center mb-8 sm:mb-18 space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] border border-neutral-800 text-[10px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
            CANDIDATE PROFILE
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            {siteConfig.whoIsThisFor.headline}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base font-light max-w-xl md:mx-auto">
            We look for high-integrity individuals ready to apply themselves. No prior financial licenses required to begin the conversation.
          </p>
        </div>

        {/* 6 Traits Grid: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {siteConfig.whoIsThisFor.traits.map((trait) => (
            <div
              key={trait.title}
              className="p-3 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0C0C0C] border border-neutral-800 hover:border-neutral-700 transition-all text-left flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-center mb-2 sm:mb-4 text-[#FF4D4D]">
                  <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2 tracking-wide leading-tight break-words">
                  {trait.title}
                </h3>
                <p className="text-neutral-400 text-[9.5px] sm:text-sm leading-snug sm:leading-relaxed font-light break-words">
                  {trait.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Realistic Disclaimer Box */}
        <div className="mt-6 sm:mt-10 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#090909] border border-neutral-800/80 flex items-start gap-2.5 sm:gap-3.5 text-left max-w-4xl mx-auto">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-sm text-neutral-400 leading-relaxed font-light">
            <strong className="text-neutral-200 font-semibold">Realistic Career Note: </strong>
            {siteConfig.whoIsThisFor.note}
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="mt-6 sm:mt-10 text-center">
          <button
            onClick={onBookCall}
            className="px-5 sm:px-8 py-2.5 sm:py-4 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg sm:rounded-xl transition-all inline-flex items-center gap-2 glow-red-subtle cursor-pointer min-h-[44px] sm:min-h-[48px]"
            id="who-book-call-btn"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span>SEE IF GENESIS IS THE RIGHT FIT</span>
          </button>
        </div>
      </div>
    </section>
  );
};
