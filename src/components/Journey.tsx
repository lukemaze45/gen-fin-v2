import React from "react";
import { siteConfig, JourneyStep } from "@/lib/site-config";
import { PhoneCall } from "lucide-react";

interface JourneyProps {
  onBookCall: () => void;
}

export const Journey: React.FC<JourneyProps> = ({ onBookCall }) => {
  return (
    <section className="py-12 sm:py-28 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left md:text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-neutral-800 text-[10px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
            THE 4-STEP ONBOARDING PATH
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            YOUR JOURNEY<br />STARTS HERE.
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base font-light max-w-lg md:mx-auto">
            From initial exploratory conversation to independent career development, our onboarding process is transparent and structured.
          </p>
        </div>

        {/* 4-Step Process Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 relative">
          {siteConfig.journeySteps.map((step: JourneyStep, idx: number) => (
            <div
              key={step.step}
              className="relative p-3 sm:p-7 rounded-xl sm:rounded-2xl bg-[#101010] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 text-left flex flex-col justify-between group overflow-hidden"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-6">
                  <span className="font-serif text-2xl sm:text-4xl font-black text-neutral-600 group-hover:text-[#FF4D4D] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-neutral-800 group-hover:bg-[#B00000] transition-colors" />
                </div>

                <h3 className="font-serif text-xs sm:text-xl font-bold text-white mb-1 sm:mb-2.5 tracking-wide leading-tight break-words">
                  {step.title}
                </h3>

                <p className="text-neutral-400 text-[9.5px] sm:text-sm leading-snug sm:leading-relaxed font-light break-words">
                  {step.description}
                </p>
              </div>

              {/* Progress connection accent */}
              <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-neutral-900/80 flex items-center justify-between text-[9px] sm:text-[10px]">
                <span className="font-mono uppercase tracking-widest text-neutral-500">
                  Phase 0{idx + 1}
                </span>
                {idx === 1 && (
                  <span className="font-semibold text-[#FF4D4D] bg-[#B00000]/10 px-1.5 py-0.5 rounded text-[8px] sm:text-[10px]">
                    Current
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick call to action trigger */}
        <div className="mt-8 sm:mt-14 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0D0D0D] border border-neutral-800 flex flex-row items-center justify-between gap-3 sm:gap-6 text-left">
          <div className="space-y-0.5 sm:space-y-1">
            <h4 className="font-serif text-xs sm:text-xl font-bold text-white">
              Ready for Step 02?
            </h4>
            <p className="text-neutral-400 text-[10px] sm:text-sm">
              Speak directly with our leadership team in a no-pressure call.
            </p>
          </div>
          <button
            onClick={onBookCall}
            className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-[11px] sm:text-sm tracking-wider uppercase rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 glow-red-subtle cursor-pointer shrink-0 min-h-[40px] sm:min-h-[48px] whitespace-nowrap"
            id="journey-book-call-btn"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>CONNECT</span>
          </button>
        </div>
      </div>
    </section>
  );
};
